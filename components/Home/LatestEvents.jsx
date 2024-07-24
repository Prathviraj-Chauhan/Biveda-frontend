import React from "react";
import styles from "./latestevents.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import { useSelector } from "react-redux";
import Link from "next/link";

const LatestEvents = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { blogList } = useSelector((state) => state.product);

  const cleanDescription = (description) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = description;
    const textWithoutTags = tempElement.textContent || tempElement.innerText;

    return textWithoutTags;
  };

  return (
    <div
      className={`${styles["events_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_event"] : null
      }`}
    >
      <div className="container">
        <div className={styles.events_main}>
          <h1>Our Latest Events</h1>
          <div className={styles.events_list}>
            {blogList
              ?.filter((item, index) => index < 4)
              .map((data, key) => (
                <div className={styles.events_item} key={key}>
                  <div className={styles.events_image}>
                    <img
                      src={data?.blog_image}
                      alt=""
                      className={styles.blog_image}
                    />
                  </div>
                  <div className={styles.events_info}>
                    <h6 className={styles.events_title}>{data.title}</h6>
                    <p className={styles.events_desc}>
                      {cleanDescription(data.blog)}
                    </p>
                    <Link href={`/blog-details/${data._id}`}>
                      <button className={styles.events_btn}>read more</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestEvents;
