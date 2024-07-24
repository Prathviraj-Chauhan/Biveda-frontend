import React from "react";
import styles from "./ourproduct.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import { useSelector } from "react-redux";
import Link from "next/link";

const OurProduct = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["ourproduct_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_ourproduct"] : null
      }`}
    >
      <div className={styles.ourproduct_main}>
        <div className={styles.ourProduct_image}>
          <Image src={Images.ourProduct1} alt="" />
        </div>
        <div className={styles.ourproduct_info}>
          <h1>
            <span>THE STORY</span> BEHIND OUR Product
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <Link href="/products">
            <button>View More</button>
          </Link>
        </div>
      </div>
      <div className={styles.ourproduct_main1}>
        <div className={styles.ourproduct_info1}>
          <h1>
            <span>THE STORY</span> BEHIND OUR Product
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <Link href="/products">
            <button>View More</button>
          </Link>
        </div>{" "}
        <div className={styles.ourProduct_image1}>
          <Image src={Images.ourProduct2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
