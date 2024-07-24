import React from "react";
import styles from "./dietplan.module.scss";
import DietPlanList from "./DietPlanList";
import CustomCalendar from "./CustomCalendar";

const DietPlan = () => {
  return (
    <div className={styles.dietplan_wrapper}>
      <CustomCalendar />
      <DietPlanList />
    </div>
  );
};

export default DietPlan;
