import React from "react";
import styles from "./feedback.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import Images from "@/components/Images/Images";
import { FeedbackCommentIcon } from "@/components/Icons";
import ReplyFeedbackForm from "../../replayFeedbackForm/ReplyFeedbackForm";

const Feedback = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { feedbackList } = useSelector((state) => state.feedback);

  return (
    <div
      className={`${styles["feedback_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightevents_wrapper"] : null
      }`}
    >
      <h1>Feedback</h1>
      {feedbackList?.map((item, key) => (
        <React.Fragment key={key}>
          <div className={styles.feedback_item}>
            <div className={styles.feedback_info}>
              <div className={styles.feedback_img}>
                <Image src={Images.feedbackImg} alt="" />
                <h6>
                  {item?.customerId?.first_name} {item?.customerId?.last_name}
                </h6>
                <FeedbackCommentIcon isDarkTheme={isDarkTheme} />
              </div>
              <p>14 Aug 2023</p>
            </div>
            <p className={styles.feedback_desc}>{item?.message}</p>
          </div>
          {item?.reply ? (
            <div className={styles.feedback_reply_item}>
              <div className={styles.feedback_info}>
                <div className={styles.feedback_img}>
                  <Image src={Images.feedbackImg} alt="" />
                  <h6>
                    {item?.healthexpertId?.first_name}{" "}
                    {item?.healthexpertId?.last_name}
                  </h6>
                  <FeedbackCommentIcon isDarkTheme={isDarkTheme} />
                </div>
                <p>14 Aug 2023</p>
              </div>
              <p className={styles.feedback_desc}>{item?.reply}</p>
            </div>
          ) : null}

          <div className={styles.feedback_line}></div>
        </React.Fragment>
      ))}
      <ReplyFeedbackForm />
    </div>
  );
};

export default Feedback;
