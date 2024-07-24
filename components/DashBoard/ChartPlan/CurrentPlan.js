import React, { useState } from "react";
import styles from "./currentplan.module.scss";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@/components/Icons";

const CurrentPlan = ({ updatedDietPlanList }) => {
  const [showDetails, setShowDetails] = useState(true);
  const { isDarkTheme } = useSelector((state) => state.auth);

  const handleOpenTab = (item) => {
    setShowDetails({
      ...showDetails,
      [item?._id]: showDetails[item?._id] ? false : true,
    });
  };

  return (
    <div
      className={`${styles["currentplan_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightcurrentplan__wrapper"] : null
      }`}
    >
      {updatedDietPlanList?.map((item, key) => (
        <div className={styles.currentplan_item} key={key}>
          <div
            className={styles.plan_header}
            onClick={() => handleOpenTab(item)}
          >
            <span>{item.select_day}</span>
            <ChevronDownIcon />
          </div>
          {showDetails[item?._id] ? (
            <div className={styles.plan_details}>
              <div className={styles.plan_details_item}>
                <p>
                  early morning meds: <span>{item.early_morning_meds}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  breakfast: <span>{item.breakfast}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  snack: <span>{item.snack}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  lunch: <span>{item.lunch}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  after lunch meds: <span>{item.after_lunch_meds}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  evening: <span>{item.evening}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  before dinner meds: <span>{item.before_dinner_meds}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  dinner: <span>{item.dinner}</span>
                </p>
              </div>
              <div className={styles.plan_details_item}>
                <p>
                  after meal meds: <span>{item.after_meal_meds}</span>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CurrentPlan;
