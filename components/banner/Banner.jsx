import React from "react";
import styles from "./banner.module.scss";

const Banner = ({ text }) => {
  return (
    <div className={styles.banner_comman}>
      <div className="container">
        <h1 className={styles.banner_text}>{text}</h1>
      </div>
    </div>
  );
};

export default Banner;
