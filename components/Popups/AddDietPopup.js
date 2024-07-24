import React, { useState } from "react";
import styles from "./videobanner.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/Input";
import { onAddDietPlan } from "@/redux/actions/healthExpertActions";

const AddDietPopup = ({ setPopup, patientId }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const { userDetails } = useSelector((state) => state.user);
  const { isDarkTheme } = useSelector((state) => state.auth);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      customer_id: patientId,
      health_expert_id: userDetails?._id,
      early_morning_meds: values?.early_morning_meds,
      breakfast: values?.breakfast,
      snack: values?.snack,
      lunch: values?.lunch,
      after_lunch_meds: values?.after_lunch_meds,
      evening: values?.evening,
      before_dinner_meds: values?.before_dinner_meds,
      dinner: values?.dinner,
      after_meal_meds: values?.after_meal_meds,
      select_day: values?.select_day,
    };

    dispatch(onAddDietPlan(data, setPopup));
  };

  return (
    <>
      <div
        className={`${styles["bg_wrapper_popup_new"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div
          className={`${styles["popup_box_bpn"]} ${styles["diet_plan_wrapper"]} ${styles["profile_nceqoi_popup"]} ${styles["pb-4"]}`}
        >
          <div className={`${styles["popup_header"]} ${styles["pb-0"]}`}>
            <div className={styles["p_header_hding"]}>Assign Diet plan</div>
            <div className={styles["close_pp_btn"]} onClick={() => setPopup()}>
              <i className="fa fa-remove"></i>
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.adddietplan_input_item}>
              <label htmlFor="">Select Day</label>
              <div className={styles.adddietplan_input}>
                <select
                  name="select_day"
                  value={values?.select_day}
                  onChange={onInputChange}
                >
                  <option value="" hidden>
                    Select Day
                  </option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
            </div>

            <div className="w-100 d-flex justify-content-between mb-2 flex-wrap">
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">early morning meds</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="Tea"
                    name="early_morning_meds"
                    value={values?.early_morning_meds}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">breakfast</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="Toss"
                    name="breakfast"
                    value={values?.breakfast}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">snack</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="Biskit"
                    name="snack"
                    value={values?.snack}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">lunch</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="masala oats"
                    name="lunch"
                    value={values?.lunch}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">after lunch meds</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="oats"
                    name="after_lunch_meds"
                    value={values?.after_lunch_meds}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">evening</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="lentils"
                    name="evening"
                    value={values?.evening}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">before dinner meds</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="masala oats"
                    name="before_dinner_meds"
                    value={values?.before_dinner_meds}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">dinner</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="oats"
                    name="dinner"
                    value={values?.dinner}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className={styles.adddietplan_input_item}>
                <label htmlFor="">after meal meds</label>
                <div className={styles.adddietplan_input}>
                  <Input
                    type="text"
                    placeholder="lentils"
                    name="after_meal_meds"
                    value={values?.after_meal_meds}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <button>Assign Diet</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDietPopup;
