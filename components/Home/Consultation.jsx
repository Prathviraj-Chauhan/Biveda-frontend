import React from "react";
import styles from "./consultation.module.scss";
import Images from "../Images/Images";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { HomeCheckIcon } from "../Icons";

const Consultation = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { consultationDetails } = useSelector((state) => state.home);

  return (
    <div
      className={`${styles["consultation"]} ${
        isDarkTheme === "light" ? styles["light_consultation"] : null
      }`}
    >
      <div className={styles.consultation_wrapper}>
        <div className="container">
          <div className={styles.consultation_main}>
            <div className={styles.logo}>
              <Image src={Images.logoImage} alt="" />
            </div>
            <div className={styles.consultation_info}>
              <h1>{consultationDetails?.title}</h1>
              <ul>
                {consultationDetails?.topic?.map((item, key) => (
                  <li key={key}>
                    <HomeCheckIcon />
                    <span>{item}</span>
                  </li>
                ))}

                {/* <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>diverse workout Library Segmented By Goal</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Strength, endurance and mobility program</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Beginner intermediate and advance workouts</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Guided workouts with certified fitness pros</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Syncs with apple watch</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Guided Programs from the top athletes & Coach</span>
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_281_8797)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31 7.29L4.05 8.55L8.1 12.6L17.1 3.6L15.84 2.34L8.1 10.08L5.31 7.29ZM16.2 9C16.2 12.96 12.96 16.2 9 16.2C5.04 16.2 1.8 12.96 1.8 9C1.8 5.04 5.04 1.8 9 1.8C9.72 1.8 10.35 1.89 10.98 2.07L12.42 0.63C11.34 0.27 10.17 0 9 0C4.05 0 0 4.05 0 9C0 13.95 4.05 18 9 18C13.95 18 18 13.95 18 9H16.2Z"
                        fill="#0CEAEF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_281_8797">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Syncs with apple watch</span>
                </li> */}
              </ul>

              <div className={styles.consul_btn}>
                <Link href="/consultaion">
                  <button>get you free consultation</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
