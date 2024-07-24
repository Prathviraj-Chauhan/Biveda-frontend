import React, { useEffect, useState } from "react";
import styles from "./subscription.module.scss";
import { useSelector } from "react-redux";
import {
  ChevronArrowDownIcon,
  ChevronArrowTopIcon,
  SubscriptionCheckIcon,
} from "@/components/Icons";

const SubscriptionPlan = ({ handleChangeTab }) => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const [subscriptionDetails, setSubscriptionDetails] = useState({});

  const subscriptionList = [
    {
      id: 1,
      title: "Basic Free Plan",
      status: true,
      price: "35.00",
      subscription_details: [
        "35$ per diagnostic test report by ai",
        "Access to free plan.",
        "They have access to any YogaGPT or other GPT for half an hour per day only.",
        "No Zoom meeting weekly with Ayurveda Doctor Online",
      ],
    },
    {
      id: 2,
      title: "Starter Plan",
      status: false,
      price: "50.00",
      subscription_details: [
        "35$ per diagnostic test report by ai",
        "Access to free plan.",
        "They have access to any YogaGPT or other GPT for half an hour per day only.",
        "No Zoom meeting weekly with Ayurveda Doctor Online",
      ],
    },
    {
      id: 3,
      title: "Premium Plan",
      status: false,
      price: "62.00",
      subscription_details: [
        "35$ per diagnostic test report by ai",
        "Access to free plan.",
        "They have access to any YogaGPT or other GPT for half an hour per day only.",
        "No Zoom meeting weekly with Ayurveda Doctor Online",
      ],
    },
  ];

  useEffect(() => {
    if (subscriptionList) {
      for (let i = 0; i < subscriptionList.length; i++) {
        if (subscriptionList[i]?.status) {
          setSubscriptionDetails(subscriptionList[i]);
        }
      }
    }
  }, []);

  return (
    <div
      className={`${styles["subscription_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightsubscription_wrapper"] : null
      }`}
    >
      <h4 onClick={() => handleChangeTab("my-orders")}>
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
        Subscription Plan
      </h4>
      <div className={styles.subscription_list}>
        {subscriptionList?.map((data, key) => (
          <div className={styles.subscription_item} key={key}>
            <div
              className={styles.subscription_head}
              onClick={() => setSubscriptionDetails(data)}
            >
              <div className={styles.subscription_left}>
                <input type="radio" />
                <h6 className={styles.subscription_title}>{data.title}</h6>
                {data.status ? (
                  <button className={styles.active_btn}>Active</button>
                ) : null}
              </div>
              <div className={styles.subscription_right}>
                <h6>₹{data.price}</h6>
                {data.id === subscriptionDetails?.id ? (
                  <ChevronArrowTopIcon />
                ) : (
                  <ChevronArrowDownIcon />
                )}
              </div>
            </div>
            {data.id === subscriptionDetails?.id ? (
              <>
                <ul>
                  {data?.subscription_details?.map((item, key) => (
                    <li key={key}>
                      <SubscriptionCheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {data.status ? (
                  <button className={styles.cancel_btn}>Cancel Plan</button>
                ) : (
                  <button className={styles.upgrade_btn}>Upgrade Plan</button>
                )}
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
