"use client";

import React, { useEffect } from "react";
import Banner from "../banner/Banner";
import styles from "./blogdetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetails } from "@/redux/actions/productActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const BlogDetails = ({ slug }) => {
  const dispatch = useDispatch();
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);
  const { blogDetails } = useSelector((state) => state.product);

  useEffect(() => {
    // if (typeof window !== undefined) {
    //   const url = window.location.href;
    //   const params = new URLSearchParams(url?.split("?")[1]);
    //   const slug = params.get("slug");
    if (slug) {
      dispatch(getBlogDetails(slug));
    }
    // }
  }, [slug]);

  return (
    <>
      <Banner text="Blog Details" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_blogdetails"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}>
            <div className={styles.product_img}>
              <img src={blogDetails?.blog_image} alt="" />
            </div>
            <div className={styles.product_info}>
              <h4 className={styles.privacy_main_headings}>
                {blogDetails?.title}
              </h4>
              <p dangerouslySetInnerHTML={{ __html: blogDetails?.blog }}></p>
            </div>
          </div>
        </div>
      </div>

      {pageLoading ? <LoadingSpinner /> : ""}
    </>
  );
};

export default BlogDetails;
