import React, { useState } from "react";
import styles from "./videobanner.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TextArea from "../common/TextArea";
import { ActiveReviewIcon } from "../Icons";
import { onAddFeedback } from "@/redux/actions/feedbackActions";

const FeedbackPopup = ({ orderDetails, setPopup }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { userDetails } = useSelector((state) => state.user);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleAddFeedback = () => {
    const data = {
      rating: values?.rating,
      message: values?.message,
      customer_id: userDetails?._id,
      product_id: orderDetails?._id,
      role: userDetails?.role,
    };

    if (!values?.rating) {
      toast.error("Please select rating");
    } else if (!values?.message) {
      toast.error("Please enter message");
    } else {
      dispatch(onAddFeedback(data, setPopup));
    }
  };

  const handleAddRating = (rating) => {
    setValues({ ...values, rating });
  };

  return (
    <div
      className={`${styles["bg_wrapper_popup_new"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <div
        className={`${styles["popup_box_bpn"]} ${styles["profile_nceqoi_popup"]} ${styles["pb-4"]}`}
      >
        <div className={`${styles["popup_header"]} ${styles["pb-0"]}`}>
          <div className={styles["p_header_hding"]}>Send Feedback</div>
          <div className={styles["close_pp_btn"]} onClick={() => setPopup()}>
            <i className="fa fa-remove"></i>
          </div>
        </div>
        <div className={styles.feedback_wrapper}>
          <select name="" id="">
            <option value="">Send Reviews</option>
          </select>
          <div className={styles.review_point}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((rating, index) => (
              <div
                key={index}
                className={styles.review_point_item}
                onClick={() => handleAddRating(rating)}
              >
                <span>{rating}</span>
                <ActiveReviewIcon
                  styles={styles}
                  rating={rating}
                  ratingData={values?.rating}
                />
              </div>
            ))}
          </div>
          <TextArea
            name="message"
            cols="30"
            rows="10"
            placeholder="Enter Feedback"
            value={values?.message}
            onChange={onInputChange}
          ></TextArea>
          <button className={styles.feedback_btn} onClick={handleAddFeedback}>
            Send Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
