import React, { useState } from "react";
import ReplyFeedbackForm from "../replayFeedbackForm/ReplyFeedbackForm";
import Image from "next/image";
import Images from "@/components/Images/Images";

const PatientFeedback = ({ feedbackList, styles }) => {
  const [openMessageForm, setOpenMessageForm] = useState(false);

  const handleOpenForm = (item) => {
    setOpenMessageForm(item);
  };

  return feedbackList?.map((item, key) => (
    <React.Fragment>
      <div className={styles.feedback_item} key={key}>
        <div className={styles.feedback_info}>
          <div className={styles.feedback_img}>
            <Image src={Images.LiyanSmith} alt="" />
            <h6>
              {item?.customerId?.first_name} {item?.customerId?.last_name}
            </h6>
          </div>
          <p>14 Aug 2023</p>
        </div>
        <p className={styles.feedback_desc}>{item?.message}</p>
        {item?.reply ? null : openMessageForm._id === item._id ? (
          <ReplyFeedbackForm
            openMessageForm={openMessageForm}
            handleOpenForm={handleOpenForm}
          />
        ) : (
          <h6
            className={styles.replay_btn}
            onClick={() => handleOpenForm(item)}
          >
            Replay
          </h6>
        )}
      </div>
      {item?.reply ? (
        <div className={styles.feedback_reply_item} key={key}>
          <div className={styles.feedback_info}>
            <div className={styles.feedback_img}>
              <Image src={Images.LiyanSmith} alt="" />
              <h6>
                {item?.healthexpertId?.first_name}{" "}
                {item?.healthexpertId?.last_name}
              </h6>
            </div>
            <p>14 Aug 2023</p>
          </div>
          <p className={styles.feedback_desc}>{item?.reply}</p>
        </div>
      ) : null}

      <div className={styles.feedback_line}></div>
    </React.Fragment>
  ));
};

export default PatientFeedback;
