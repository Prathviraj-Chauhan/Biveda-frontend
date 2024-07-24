import React from "react";
import styles from "./categoery.module.scss";
import Images from "../../Images/Images";
import Image from "next/image";
import { useSelector } from "react-redux";

const BestSellerProducts = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["best_seller_wrap"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper2"] : null
      }`}
    >
      <h1>filter to best seller</h1>
      <hr />
      <div className={styles.products_wrap}>
        <div className={styles.products_wrap_left_div}>
          <Image src={Images.churana} alt="" />
        </div>
        <div className={styles.products_wrap_right_div}>
          <h4>Aliquam tincidunt mauris.</h4>
          <p>
            $40.59 <span>-15%</span>
          </p>
          <h3>$34.43</h3>
        </div>
      </div>
      <div className={styles.products_wrap}>
        <div className={styles.products_wrap_left_div}>
          <Image src={Images.churana} alt="" />
        </div>
        <div className={styles.products_wrap_right_div}>
          <h4>Aliquam tincidunt mauris.</h4>
          <p>
            $40.59 <span>-15%</span>
          </p>
          <h3>$34.43</h3>
        </div>
      </div>
      <div className={styles.products_wrap}>
        <div className={styles.products_wrap_left_div}>
          <Image src={Images.churana} alt="" />
        </div>
        <div className={styles.products_wrap_right_div}>
          <h4>Aliquam tincidunt mauris.</h4>
          <p>
            $40.59 <span>-15%</span>
          </p>
          <h3>$34.43</h3>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProducts;
