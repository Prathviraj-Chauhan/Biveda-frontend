import React, { useState } from "react";
import Images from "../Images/Images";
import Image from "next/image";
import styles from "./banner.module.scss";
import ImageWithVideoBanner from "../Popups/ImageWithVideoBanner";
import { useSelector } from "react-redux";

const HomeBanner = () => {
  const [popup, setPopup] = useState(false);
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <>
      <div className={styles.home_banner}>
        {isDarkTheme === "light" ? (
          <Image src={Images.lightBannerImage} alt="" />
        ) : (
          <Image src={Images.bannerImage} alt="" />
        )}

        <Image
          src={Images.playIcon}
          alt=""
          className={styles.play_icon}
          onClick={() => setPopup(<ImageWithVideoBanner setPopup={setPopup} />)}
        />
      </div>
      {popup}
    </>
  );
};

export default HomeBanner;
