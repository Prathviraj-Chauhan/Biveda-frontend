import React, { useState } from "react";
import styles from "./reply.module.scss";
import CutomButton from "@/components/common/CutomButton";
import TextArea from "@/components/common/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  onApplyFeedbackMessage,
  onReplyFeedbackMessage,
} from "@/redux/actions/feedbackActions";

const ReplyFeedbackForm = ({ openMessageForm, handleOpenForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const { orderDetails } = useSelector((state) => state.order);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let data;

    if (openMessageForm?._id) {
      data = {
        reply: values?.message,
      };

      dispatch(onReplyFeedbackMessage(openMessageForm?._id, data));
    } else {
      data = {
        healthexpertId: orderDetails?.healthExpertId?._id,
        customerId: orderDetails?.user_id?._id,
        orderId: orderDetails?._id,
        senderId: orderDetails?.user_id?._id,
        message: values?.message,
      };
      dispatch(onApplyFeedbackMessage(data));
    }
  };

  return (
    <form className={styles.reply_wrapper} onSubmit={handleFormSubmit}>
      <div className={styles.contactus_input_list}>
        <div className={styles.contactus_input_item}>
          <label htmlFor="">Message</label>
          <div className={styles.contactus_input}>
            <TextArea
              name="message"
              cols="30"
              rows="5"
              placeholder="Enter Feedback"
              value={values?.message}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.reply_btns}>
        <CutomButton
          type="submit"
          title={openMessageForm?._id ? "Send Reply" : "Send Message"}
          className={styles.sendmessage_btn}
        />
        {openMessageForm?._id && (
          <CutomButton
            type="button"
            title="Cancel"
            className={styles.cancel_btn}
            onClick={() => handleOpenForm(false)}
          />
        )}
      </div>
    </form>
  );
};

export default ReplyFeedbackForm;
