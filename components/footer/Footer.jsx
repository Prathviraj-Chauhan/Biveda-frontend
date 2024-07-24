import React from "react";
import styles from "./footer.module.scss";
import Image from "next/image";
import Images from "../Images/Images";
import Link from "next/link";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  FacebookIcon,
  GooglePayIcon,
  InstagramIcon,
  LinkedInIcon,
  PayPassCardIcon,
  PaypalCardIcon,
  VisaCardIcon,
  YouTubeIcon,
} from "../Icons";

const Footer = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { siteSettingData } = useSelector((state) => state.home);

  return (
    <>
      <div
        className={`${styles["footer_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_footer"] : null
        }`}
      >
        <div className="container">
          <div className={styles.ffot_main}>
            <div className={styles.footdiv}>
              <Image src={Images.logoImage} alt="" />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since
              </p>
              <div className={styles.social_icons}>
                <a
                  href={siteSettingData?.instagram_url}
                  className={styles.social_items}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={siteSettingData?.linkdin_url}
                  className={styles.social_items}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={siteSettingData?.youtube_url}
                  className={styles.social_items}
                  target="_blank"
                  rel="noreferrer"
                >
                  <YouTubeIcon />
                </a>
                <a
                  href={siteSettingData?.facebook_url}
                  className={styles.social_items}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>

            <div className={styles.list_div}>
              <h4>Need Help</h4>
              <ul>
                <li>
                  <Link href="/help-center">Help Center</Link>
                </li>
                <li>
                  <Link href="/email-support">Email Support</Link>
                </li>
                <li>
                  <Link href="/live-chat">Live Chat</Link>
                </li>
                <li>
                  <Link href="/help-center">Help Center</Link>
                </li>
                <li>
                  <Link href="/email-support">Email Support</Link>
                </li>
              </ul>
            </div>
            <div className={styles.list_div}>
              <h4>Support</h4>
              <ul>
                <li>
                  <Link href="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/return-policy">Privacy Settings</Link>
                </li>
                <li>
                  <Link href="/aboutus">Advertise With Us</Link>
                </li>
                <li>
                  <Link href="/aboutus">Help</Link>
                </li>
              </ul>
            </div>
            <div className={styles.list_div}>
              <h4>Quick Link</h4>
              <ul>
                <li>
                  <Link href="/terms-conditions">Terms Of Use</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/aboutus">Accessibility</Link>
                </li>
                <li>
                  <Link href="/aboutus">Supply</Link>
                </li>
                <li>
                  <Link href="/consultaion">Consultation</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles["copyright"]} ${
          isDarkTheme === "light" ? styles["light_copyright"] : null
        }`}
      >
        <div className="container">
          <div className={styles.copyright_main}>
            <p>
              Copyright © {moment(new Date()).format("YYYY")} Bioveda All rights
              reserved.
            </p>
            <div className={styles.footer_card_icon}>
              <GooglePayIcon />
              <VisaCardIcon />
              <PaypalCardIcon />
              <PayPassCardIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
