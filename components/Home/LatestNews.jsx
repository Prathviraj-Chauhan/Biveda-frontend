import React from "react";
import styles from "./latestnews.module.scss";
import { useSelector } from "react-redux";
import Input from "../common/Input";

const LatestNews = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["news_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_news"] : null
      }`}
    >
      <div className="container">
        <div className={styles.news_main}>
          <h1>
            GET THE LATEST <span>NEWS SENT</span> RIGHT TO YOUR INBOX!
          </h1>
          <form className={styles.news_info}>
            <Input
              type="text"
              className={styles.news_input}
              placeholder="Enter Your Email"
            />
            <button className={styles.news_btn}>SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
