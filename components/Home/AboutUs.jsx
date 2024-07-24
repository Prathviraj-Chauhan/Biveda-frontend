import React from "react";
import styles from "./aboutus.module.scss";
import Images from "../Images/Images";
import Image from "next/image";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["aboutus_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_aboutus"] : null
      }`}
    >
      <div className="container">
        <div className={styles.about_main}>
          <div className={styles.about_image}>
            <Image src={Images.aboutImage} alt="" />
          </div>
          <div className={styles.about_info}>
            <h4 className={styles.about_heading}>
              ABOUT US <div className={styles.about_line}></div>
            </h4>
            <div className={styles.about_title}>
              <h4>
                <span>WE RAISE</span> YOUR CONFIDENCE
              </h4>
            </div>
            <p className={styles.about_para}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
            <p className={styles.about_para}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make{" "}
            </p>
            <button className={styles.about_btn}>View More</button>
          </div>
        </div>
      </div>
      <Image src={Images.powderImage} alt="" className={styles.powder_box} />
    </div>
  );
};

export default AboutUs;
