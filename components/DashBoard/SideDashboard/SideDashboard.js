import React from "react";
import styles from "./sidedashboard.module.scss";
import { useSelector } from "react-redux";
import {
  ChartPlanIcon,
  DashboardLine,
  DashboardWishIcon,
  ExpertIcon,
  MyInfoIcon,
  MyOrderIcon,
  MyPatientIcon,
  PatientInfoIcon,
  SignoutIcon,
} from "@/components/Icons";
import PropTypes from "prop-types";
import SubscriptionPlanIcon from "@/components/Icons/SubscriptionPlanIcon";

const SideDashboard = ({ currentTab, handleChangeTab, handleLogout }) => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  return (
    <>
      <div
        className={`${styles["sidebar_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div className={styles.head_div}>
          <h2>
            <DashboardLine />
            <span>Hello {userDetails?.first_name}</span>
          </h2>
          <p>Welcome to your Account</p>
        </div>
        {userDetails?.role === "Customer" ? (
          <>
            <div
              className={
                currentTab === "my-orders" || currentTab === "tracks-details"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("my-orders")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <MyOrderIcon />
                </div>
                <span>My orders</span>
              </div>
            </div>
            <div
              className={
                currentTab === "chart-plan"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("chart-plan")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <ChartPlanIcon />
                </div>
                <span>My Chart plan</span>
              </div>
            </div>
            <div
              className={
                currentTab === "wishlist"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("wishlist")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <DashboardWishIcon />
                </div>
                <span>Wishlist</span>
              </div>
            </div>
            <div
              className={
                currentTab === "information" || currentTab === "addaddress"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("information")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <MyInfoIcon />
                </div>
                <span>My info</span>
              </div>
            </div>
            <div
              className={
                currentTab === "subscription"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("subscription")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <SubscriptionPlanIcon />
                </div>
                <span>Subscription Plan</span>
              </div>
            </div>
          </>
        ) : userDetails?.role === "HealthExpert" ? (
          <>
            <div
              className={
                currentTab === "expert"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("expert")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <ExpertIcon />
                </div>
                <span>Dashboard</span>
              </div>
            </div>
            <div
              className={
                currentTab === "patient-info"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("patient-info")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <PatientInfoIcon />
                </div>
                <span>Patient Info</span>
              </div>
            </div>
            <div
              className={
                currentTab === "my-patients" ||
                currentTab === "patients-details"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("my-patients")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <MyPatientIcon />
                </div>
                <span>My Patients</span>
              </div>
            </div>
            <div
              className={
                currentTab === "diet-plan"
                  ? styles.dashboardTabActive
                  : styles.dashparts
              }
              onClick={() => handleChangeTab("diet-plan")}
            >
              <div className={styles.dashparts_div}>
                <div className={styles.iconsvg_div}>
                  <ChartPlanIcon />
                </div>
                <span>Diet Plans</span>
              </div>
            </div>
          </>
        ) : null}

        <div className={styles.dashparts} onClick={handleLogout}>
          <div className={styles.dashparts_div}>
            <div className={styles.iconsvg_div}>
              <SignoutIcon />
            </div>
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </>
  );
};

SideDashboard.propTypes = {
  currentTab: PropTypes.string,
  handleChangeTab: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default SideDashboard;
