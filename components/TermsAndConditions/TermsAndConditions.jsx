"use client";

import React, { useEffect, useState } from "react";
import styles from "./termsandcon.module.scss";
import Banner from "../banner/Banner";
import Accordian from "../accordiean/accordian";
import { useSelector } from "react-redux";

const TermsAndConditions = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { termsAndCondition } = useSelector((state) => state.home);
  const [pageData, setPageData] = useState();

  useEffect(() => {
    if (termsAndCondition) {
      setPageData(
        termsAndCondition.find((item) => item.title === "Terms and Conditions")
      );
    }
  }, [termsAndCondition]);

  return (
    <>
      <Banner text="Terms And Conditions" />

      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_terms_wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}>
            <div
              dangerouslySetInnerHTML={{
                __html: pageData?.description,
              }}
            >
              {/* <h4 className={styles.privacy_main_headings}>
                terms and conditions
              </h4> */}
            </div>
            <div className={styles.accordian_infos}>
              <Accordian />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
