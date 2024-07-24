import React from "react";
import styles from "./questionanswer.module.scss";

const QuestionAnswer = ({ questionList }) => {
  return (
    <div className={styles.privacy_main}>
      {questionList?.map((item, index) => (
        <div className={styles.detals_inqr}>
          <div className={styles.qrbox}>Q. {index + 1}</div>
          <div className={styles.chat_answers}>
            <h6 className={styles.privacy_main_headings}>{item.que}</h6>
            <p className={styles.privacy_main_para}>
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>{" "}
              {item.ans}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionAnswer;
