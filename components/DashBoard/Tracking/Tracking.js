"use client";

import React, { useState } from "react";
import styles from "./tracking.module.scss";
import ActiveOrder from "./ActiveOrder/ActiveOrder";
import { useSelector } from "react-redux";
import { TotalPatientIcon } from "@/components/Icons";

const Tracking = ({ handleChangeTab }) => {
  const [trackingTab, setTrackingTab] = useState("active");
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);

  const cancelledOrderList = orderList?.filter(
    (data) => data.order_status === "cancelled"
  );
  const allOrderList = orderList?.filter(
    (data) =>
      data.order_status !== "cancelled" && data.order_status !== "delivered"
  );
  const completeOrderList = orderList?.filter(
    (data) => data.order_status === "delivered"
  );

  return (
    <>
      <div
        className={`${styles["tracking_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div className={styles.total_values_wrapper}>
          <div className={styles.total_values_div}>
            <div className={styles.left_side}>
              <h3>Diet Plan</h3>
              <span>Current Plan</span>
            </div>
            <div className={styles.right_side}>
              <TotalPatientIcon />
            </div>
          </div>
          <div className={styles.total_values_div}>
            <div className={styles.left_side}>
              <h3>Fever</h3>
              <span>Disease</span>
            </div>
            <div className={styles.right_side}>
              <TotalPatientIcon />
            </div>
          </div>
          <div className={styles.total_values_div}>
            <div className={styles.left_side}>
              <h3>Dr Jacky</h3>
              <span>Assign Doctor</span>
            </div>
            <div className={styles.right_side}>
              <TotalPatientIcon />
            </div>
          </div>
        </div>

        <h4>My Orders</h4>
        <div className={styles.tracking_tabs}>
          <p
            className={
              trackingTab === "active"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("active")}
          >
            Active
          </p>
          <p
            className={
              trackingTab === "cancel"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("cancel")}
          >
            Cancelled
          </p>
          <p
            className={
              trackingTab === "complete"
                ? styles.trackingTabActive
                : styles.tracking
            }
            onClick={() => setTrackingTab("complete")}
          >
            Completed
          </p>
        </div>
        <hr />
        <div className={styles.allcards}>
          {trackingTab === "active" ? (
            <ActiveOrder
              handleChangeTab={handleChangeTab}
              orderList={allOrderList}
            />
          ) : trackingTab === "cancel" ? (
            <ActiveOrder
              handleChangeTab={handleChangeTab}
              orderList={cancelledOrderList}
            />
          ) : trackingTab === "complete" ? (
            <ActiveOrder
              handleChangeTab={handleChangeTab}
              orderList={completeOrderList}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Tracking;
