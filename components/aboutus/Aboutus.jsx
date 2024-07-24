"use client";

import React, { useEffect, useState } from "react";
import Banner from "../banner/Banner";
import styles from "./aboutus.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Counter from "../Counter/Counter";
import { useDispatch, useSelector } from "react-redux";
import { getAboutUsData } from "@/redux/actions/homeActions";

const Aboutus = () => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { aboutUsData, termsAndCondition } = useSelector((state) => state.home);
  const [pageData, setPageData] = useState();

  useEffect(() => {
    if (termsAndCondition) {
      setPageData(termsAndCondition.find((item) => item.title === "about us "));
    }
  }, [termsAndCondition]);

  useEffect(() => {
    dispatch(getAboutUsData());
  }, []);

  const cleanDescription = (description) => {
    if (process.browser) {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = description;
      const textWithoutTags = tempElement.textContent || tempElement.innerText;

      return textWithoutTags;
    }
  };

  return (
    <>
      <Banner text="about us" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_aboutus_wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}>
            <div className={styles.privacy_main_left_box}>
              <div className={styles.leftbox_exper}>
                <h1>29</h1>
                <h4>
                  YEARS <br /> EXPERIENCE <br /> WORKING
                </h4>
              </div>

              <h3>we bodybuilder to provide proper services</h3>
              <p>{cleanDescription(pageData?.description)}</p>

              <button>Discover More</button>
            </div>
            <div className={styles.rightbox_img}>
              <Image src={Images.aboutusBuilder} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles["applications_section"]} ${
          isDarkTheme === "light" ? styles["light_applications_wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.applications_section_headlines}>
            <h3>
              We provide and extend personalized & innovative healthcare
              services to its customers.
            </h3>
            <p>
              We have recently organised a new office location at 33 Queens
              Square, Leeds to cater for the growth of business for North of UK
              and Scotland locations.
            </p>
          </div>

          <div className={styles.applications_section_goals}>
            {pageData?.our_data?.map((item, key) => (
              <div className={styles.applications_section_goals_box} key={key}>
                <Image src={Images.ourvisionimg} alt="" />
                <h6>{item.heading}</h6>
                <ul>
                  {item.topics.map((data, key) => (
                    <li key={key}>{data}</li>
                  ))}
                  {/* <li>for community</li>
                  <li>long term development</li>
                  <li>save our planet</li>
                  <li>help people</li> */}
                </ul>
              </div>
            ))}
            {/* <div className={styles.applications_section_goals_box}>
              <Image src={Images.ourpromiseimg} alt="" />
              <h6>Our Promise</h6>
              <ul>
                <li>good service</li>
                <li>for community</li>
                <li>long term development</li>
                <li>save our planet</li>
                <li>help people</li>
              </ul>
            </div>
            <div className={styles.applications_section_goals_box}>
              <Image src={Images.ourmissionimg} alt="" />
              <h6>Our Mission</h6>
              <ul>
                <li>good service</li>
                <li>for community</li>
                <li>long term development</li>
                <li>save our planet</li>
                <li>help people</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      <div
        className={`${styles["clientdatas_section"]} ${
          isDarkTheme === "light" ? styles["light_clientdatas"] : null
        }`}
      >
        <div className="container">
          <div className={styles.clientdatas_section_wrapper}>
            <div className={styles.databox}>
              <h5>
                <Counter targetValue={1967} />
              </h5>
              <span>happy clients</span>
            </div>
            <div className={styles.databox}>
              <h5>
                <Counter targetValue={500} />
              </h5>
              <span>FINISHED PROJECTS</span>
            </div>
            <div className={styles.databox}>
              <h5>
                <Counter targetValue={267} />
              </h5>
              <span>EXPERTS</span>
            </div>
            <div className={styles.databox}>
              <h5>
                <Counter targetValue={1090} />
              </h5>
              <span>POSTS</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles["investores_compony_section"]} ${
          isDarkTheme === "light" ? styles["light_investores"] : null
        }`}
      >
        <div className="container">
          <div className={styles.img_boxes_wrap}>
            <div className={styles.img_box}>
              <Image src={Images.hippocrateImg} alt="" />
            </div>
            <div className={styles.img_box}>
              <Image src={Images.medicalImg} alt="" />
            </div>
            <div className={styles.img_box}>
              <Image src={Images.kureImge} alt="" />
            </div>
            <div className={styles.img_box}>
              <Image src={Images.canniImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
