import React, { useEffect, useState } from "react";
import styles from "./patientsdetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import AddDietPopup from "../../Popups/AddDietPopup";
import {
  getDeitListByUser,
  getPatientDetails,
} from "@/redux/actions/healthExpertActions";
import { getFeedbackList } from "@/redux/actions/feedbackActions";
import PatientFeedback from "./PatientFeedback";
import CurrentPlan from "../ChartPlan/CurrentPlan";

const PatientsDetails = ({ setOpenPopup }) => {
  const dispatch = useDispatch();
  const [patientId, setPatientId] = useState();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { patientDetails, dietPlanList, addDietPlan } = useSelector(
    (state) => state.healthExpert
  );
  const { userDetails } = useSelector((state) => state.user);
  const { feedbackList, applyFeedback, replyFeedbackMessage } = useSelector(
    (state) => state.feedback
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      const url = window.location.href;
      const params = new URLSearchParams(url?.split("?")[1]);
      const token = params.get("id");
      setPatientId(token);
    }
  }, []);

  useEffect(() => {
    if (patientId) {
      dispatch(getPatientDetails(patientId));
    }
  }, [patientId]);

  useEffect(() => {
    if (patientId) {
      dispatch(getDeitListByUser(patientId));
    }
  }, [patientId, addDietPlan]);

  useEffect(() => {
    if (patientDetails) {
      dispatch(getFeedbackList(patientDetails?._id, userDetails?._id));
    }
  }, [patientDetails, applyFeedback, replyFeedbackMessage]);

  const updatedDietPlanList = [
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Sunday",
      snack: "",
      startDate: "",
    },
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Monday",
      snack: "",
      startDate: "",
    },
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Tuesday",
      snack: "",
      startDate: "",
    },
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Wednesday",
      snack: "",
      startDate: "",
    },
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Thursday",
      snack: "",
      startDate: "",
    },
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Friday",
      snack: "",
      startDate: "",
    },
    {
      _id: Math.random(),
      after_lunch_meds: "",
      after_meal_meds: "",
      before_dinner_meds: "",
      breakfast: "",
      customer_id: "",
      dinner: "",
      early_morning_meds: "",
      endDate: "",
      evening: "",
      health_expert_id: "",
      lunch: "",
      select_day: "Saturday",
      snack: "",
      startDate: "",
    },
  ];

  dietPlanList?.forEach((dietPlan) => {
    const dayToUpdate = updatedDietPlanList.find(
      (item) => item.select_day === dietPlan.select_day
    );

    if (dayToUpdate) {
      dayToUpdate._id = dietPlan._id;
      dayToUpdate.after_lunch_meds = dietPlan.after_lunch_meds;
      dayToUpdate.after_meal_meds = dietPlan.after_meal_meds;
      dayToUpdate.before_dinner_meds = dietPlan.before_dinner_meds;
      dayToUpdate.breakfast = dietPlan.breakfast;
      dayToUpdate.customer_id = dietPlan.customer_id;
      dayToUpdate.dinner = dietPlan.dinner;
      dayToUpdate.early_morning_meds = dietPlan.early_morning_meds;
      dayToUpdate.endDate = dietPlan.endDate;
      dayToUpdate.evening = dietPlan.evening;
      dayToUpdate.health_expert_id = dietPlan.health_expert_id;
      dayToUpdate.lunch = dietPlan.lunch;
      dayToUpdate.snack = dietPlan.snack;
      dayToUpdate.startDate = dietPlan.startDate;
    }
  });

  return (
    <div
      className={`${styles["patients_details_main_wrap"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <button
        className={styles.diet_btn}
        onClick={() =>
          setOpenPopup(
            <AddDietPopup setPopup={setOpenPopup} patientId={patientId} />
          )
        }
      >
        Add new Diet Plan
      </button>
      <div className={styles.main_contant}>
        <div className={styles.details}>
          <h4>Name:</h4>
          <h3>
            {patientDetails?.first_name} {patientDetails?.last_name}
          </h3>
        </div>
        <div className={styles.details}>
          <h4>Email:</h4>
          <h3>{patientDetails?.email}</h3>
        </div>
        <div className={styles.details}>
          <h4>Number:</h4>
          <h3>{patientDetails?.phone}</h3>
        </div>
        <div className={styles.details}>
          <h4>Date:</h4>
          <h3>31 Aug 2023</h3>
        </div>
        <div className={styles.details}>
          <h4>Address:</h4>
          <h3>P No. 12 Adarsh Nagar Raja Park jaipur 302004</h3>
        </div>
      </div>
      <hr />
      <div style={{ padding: "0 50px", marginBottom: "60px" }}>
        <CurrentPlan updatedDietPlanList={updatedDietPlanList} />
      </div>
      <div className={styles.feedback_wrapper}>
        <h1>patients Feedback</h1>
        {feedbackList?.length === 0 ? (
          <h1 className={styles.feedback_nodata}>No Data Found</h1>
        ) : (
          <PatientFeedback feedbackList={feedbackList} styles={styles} />
        )}
      </div>
    </div>
  );
};

export default PatientsDetails;
