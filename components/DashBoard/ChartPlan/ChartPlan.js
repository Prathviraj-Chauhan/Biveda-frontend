import React, { useState } from "react";
import styles from "./chartplan.module.scss";
import CurrentPlan from "./CurrentPlan";
import { useSelector } from "react-redux";

const ChartPlan = () => {
  const [currentTab, setCurrentTab] = useState("current-plan");
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { dietPlanList } = useSelector((state) => state.healthExpert);

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
      className={`${styles["chartplan_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightchartplan__wrapper"] : null
      }`}
    >
      <h4 className={styles.plan_title}>My Plan</h4>
      <div className={styles.tracking_tabs}>
        <p
          className={
            currentTab === "previous-plan"
              ? styles.trackingTabActive
              : styles.tracking
          }
          onClick={() => setCurrentTab("previous-plan")}
        >
          Previous Plan
        </p>
        <p
          className={
            currentTab === "current-plan"
              ? styles.trackingTabActive
              : styles.tracking
          }
          onClick={() => setCurrentTab("current-plan")}
        >
          Current Plan
        </p>
        <p
          className={
            currentTab === "next-plan"
              ? styles.trackingTabActive
              : styles.tracking
          }
          onClick={() => setCurrentTab("next-plan")}
        >
          Next Plan
        </p>
      </div>

      {currentTab === "previous-plan" && <CurrentPlan />}
      {currentTab === "current-plan" && (
        <CurrentPlan updatedDietPlanList={updatedDietPlanList} />
      )}
      {currentTab === "next-plan" && <CurrentPlan />}
    </div>
  );
};

export default ChartPlan;
