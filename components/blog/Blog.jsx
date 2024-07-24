"use client";

import Banner from "../banner/Banner";
import React from "react";
import styles from "./blog.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Blog = () => {
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);
  const { blogList } = useSelector((state) => state.product);

  const cleanDescription = (description) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = description;
    const textWithoutTags = tempElement.textContent || tempElement.innerText;

    return textWithoutTags;
  };

  return (
    <>
      <Banner text="Blog" />

      <div
        className={`${styles["events_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.events_main}>
            <div className={styles.events_list}>
              {blogList?.map((item, key) => (
                <div className={styles.events_item} key={key}>
                  <div className={styles.events_image}>
                    <img
                      src={item?.blog_image}
                      alt=""
                      className={styles.blog_image}
                    />
                  </div>
                  <div className={styles.events_info}>
                    <h6 className={styles.events_title}>{item.title}</h6>
                    <p className={styles.events_desc}>
                      {cleanDescription(item.blog)}
                    </p>
                    <Link href={`/blog-details/${item._id}`}>
                      <button className={styles.events_btn}>read more</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default Blog;
