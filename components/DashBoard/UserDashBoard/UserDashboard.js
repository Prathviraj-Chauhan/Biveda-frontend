"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import SideDashboard from "../SideDashboard/SideDashboard";
import styles from "./userdashboard.module.scss";
import Tracking from "../Tracking/Tracking";
import MyInformation from "../MyInformation/MyInformation";
import Favourite from "../Favourite/Favourite";
import MyinfoAddAddress from "../MyInformation/MyinfoAddAddress";
import TrackYourOrder from "../Tracking/TrackYourOrder/TrackYourOrder";
import Dashboard from "../dashboard/Dashboard";
import MyPatients from "../MyPatients/MyPatients";
import PatientsDetails from "../PatientsDetails/PatientsDetails";
import PatientsInfo from "../PatientsInfo/PatientsInfo";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import ChartPlan from "../ChartPlan/ChartPlan";
import DietPlan from "../DietPlan/DietPlan";
import { getOrderList } from "../../../redux/actions/orderActions";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { setAddressDetails } from "../../../redux/actions/userActions";
import {
  getDeitListByUser,
  getPatientList,
} from "@/redux/actions/healthExpertActions";
import SubscriptionPlan from "../SubscriptionPlan/SubscriptionPlan";

const UserDashboard = ({ slug }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const { isDarkTheme, isAuthenticated, pageLoading } = useSelector(
    (state) => state.auth
  );
  const { userDetails } = useSelector((state) => state.user);
  const { orderCancel } = useSelector((state) => state.order);
  const { productFilterValues } = useSelector((state) => state.product);
  const { addDietPlan } = useSelector((state) => state.healthExpert);

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      redirect("/registration");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (slug) {
      setCurrentTab(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (userDetails?.role === "Customer") {
      const searchParmas = new URLSearchParams();
      searchParmas.append("limit", 10);
      searchParmas.append("page", productFilterValues?.page);
      dispatch(getOrderList(userDetails?._id, searchParmas));
    }
  }, [userDetails, productFilterValues, orderCancel]);

  useEffect(() => {
    if (userDetails?.role === "HealthExpert") {
      const searchParmas = new URLSearchParams();
      searchParmas.append("limit", 10);
      searchParmas.append("page", productFilterValues?.page);
      dispatch(getPatientList(searchParmas));
    }
  }, [userDetails, productFilterValues]);

  useEffect(() => {
    if (userDetails?.role === "Customer") {
      dispatch(getDeitListByUser(userDetails?._id));
    }
  }, [userDetails, addDietPlan]);

  const handleChangeTab = (tab, data) => {
    router.push(`/dashboard/${tab}`);
    if (data) {
      dispatch(setAddressDetails(data));
    }
  };

  const handleLogout = () => {
    router.push("/registration");
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div
        className={`${styles["user_dashboard_wrap"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div className="container">
          <section className={styles.dashboard_section}>
            <div className={styles.section_left}>
              <SideDashboard
                currentTab={currentTab}
                handleChangeTab={handleChangeTab}
                handleLogout={handleLogout}
              />
            </div>
            <div className={styles.section_right}>
              {currentTab === "my-orders" && (
                <Tracking handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "chart-plan" && (
                <ChartPlan handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "expert" && (
                <Dashboard handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "my-patients" && (
                <MyPatients handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "patient-info" && (
                <PatientsInfo handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "information" && (
                <MyInformation
                  handleChangeTab={handleChangeTab}
                  setOpenPopup={setOpenPopup}
                />
              )}
              {currentTab === "subscription" && (
                <SubscriptionPlan handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "wishlist" && <Favourite />}
              {currentTab === "tracks-details" && (
                <TrackYourOrder
                  handleChangeTab={handleChangeTab}
                  setOpenPopup={setOpenPopup}
                />
              )}
              {currentTab === "patients-details" && (
                <PatientsDetails
                  handleChangeTab={handleChangeTab}
                  setOpenPopup={setOpenPopup}
                />
              )}
              {currentTab === "diet-plan" && (
                <DietPlan handleChangeTab={handleChangeTab} />
              )}
              {currentTab === "addaddress" && (
                <MyinfoAddAddress handleChangeTab={handleChangeTab} />
              )}
            </div>
          </section>
        </div>
      </div>
      {openPopup}
      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

UserDashboard.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default UserDashboard;
