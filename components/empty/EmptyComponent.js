import React from "react";
import Link from "next/link";
import styles from "./empty.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";

const EmptyComponent = ({ heading, para, image, isProduct }) => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["empty_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <Image src={image} alt="" />
      <h1>{heading}</h1>
      <p>{para}</p>

      {isProduct === true ? (
        <Link href="/products">Continue Shopping</Link>
      ) : null}
    </div>
  );
};

export default EmptyComponent;
