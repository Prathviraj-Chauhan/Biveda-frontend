"use client";

import React from "react";
import styles from "./confirmorder.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import { useSelector } from "react-redux";
import Link from "next/link";

const ConfirmOrder = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["confirm_order_main_wrap"]} ${
        isDarkTheme === "light" ? styles["light_order_main"] : null
      }`}
    >
      <div className={styles.confirm_wrap}>
        <div className={styles.left_div}>
          {isDarkTheme === "light" ? (
            <Image src={Images.secGirl2} alt="" />
          ) : (
            <Image src={Images.secGirl} alt="" />
          )}
        </div>
        <div className={styles.right_div}>
          {isDarkTheme === "light" ? (
            <Image src={Images.msgimg2} alt="" />
          ) : (
            <Image src={Images.msgimg} alt="" />
          )}
          <div className={styles.msg_div}>
            <h3>Your Order is Confirmed</h3>

            <Link href="/products">
              <button>Continue Shopping</button>
            </Link>
            <Link href="/dashboard/my-orders">
              <button className={styles.del_ord_btn}>Order Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
