"use client";

import React from "react";
import ReturnPolicyAccordiean from "../accordiean/ReturnPolicyAccordiean";
import Banner from "../banner/Banner";
import styles from "./returnpolicy.module.scss";
import { useSelector } from "react-redux";

const ReturnPolicy = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <>
      <Banner text="Return Policy" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_returnpolicy"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}></div>
          <ReturnPolicyAccordiean />
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
