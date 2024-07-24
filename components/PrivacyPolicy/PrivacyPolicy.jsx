"use client";

import React, { useEffect, useState } from "react";
import styles from "./privacy.module.scss";
import Banner from "../banner/Banner";
import { useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { termsAndCondition } = useSelector((state) => state.home);
  const [pageData, setPageData] = useState();

  useEffect(() => {
    if (termsAndCondition) {
      setPageData(
        termsAndCondition.find((item) => item.title === "privacy policy")
      );
    }
  }, [termsAndCondition]);

  return (
    <>
      <Banner text="Privacy Policy" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_PrivacyPolicy_wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}>
            <div dangerouslySetInnerHTML={{ __html: pageData?.description }}>
              {/* <h4 className={styles.privacy_main_headings}>Privacy policy</h4>
              <p>
                Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                eiusmod tempor incididunt ut eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut denim ad minim{" "}
              </p>
              <p>
                When you visit the Site, we automatically collect certain
                information about your device, including information about your
                web browser, IP address, time zone, and some of the cookies that
                are installed on your device. Additionally, as you browse the
                Site, we collect information about the individual web pages or
                products that you view, what websites or search terms referred
                you to the Site, and information about how you interact with the
                Site. We refer to this automatically-collected information as
                “Device Information”.
              </p>
              <p>
                This website is operated by Fashion. Throughout the site, the
                terms “we”, “us” and “our” refer to.The offers this website,
                including all information, tools and services available from
                this site to you, the user, conditioned upon your acceptance of
                all terms, conditions, policies and notices stated here.
              </p>
              <p>
                By visiting our site and/ or purchasing something from us, you
                engage in our “Service” and agree to be bound by the following
                terms and conditions (“Terms of Service”, “Terms”), including
                those additional terms and conditions and policies referenced
                herein and/or available by hyperlink. These Terms of Service
                apply to all users of the site, including without limitation
                users who are browsers, vendors, customers, merchants, and/ or
                contributors of content.
              </p> */}
            </div>
            {/* <div>
              <h4 className={styles.privacy_main_headings}>
                Information Collection And Use
              </h4>
              <p>
                Please read these Terms of Service carefully before accessing or
                using our website. By accessing or using any part of the site,
                you agree to be bound by these Terms of Service. If you do not
                agree to all the terms and conditions of this agreement, then
                you may not access the website or use any services. If these
                Terms of Service are considered an offer, acceptance is
                expressly limited to these Terms of Service.{" "}
              </p>
              <p>
                Any new features or tools which are added to the current store
                shall also be subject to the Terms of Service. You can review
                the most current version of the Terms of Service at any time on
                this page. We reserve the right to update, change or replace any
                part of these Terms of Service by posting updates and/or changes
                to our website. It is your responsibility to check this page
                periodically for changes. Your continued use of or access to the
                website following the posting of any changes constitutes
                acceptance of those changes.
              </p>
            </div>
            <div>
              <h4 className={styles.privacy_main_headings}>Log Data</h4>
              <p>
                We collect information that your browser sends whenever you
                visit our Service (“Log Data”). This Log Data may include
                information such as your computer’s Internet Protocol (“IP”)
                address, browser type, browser version, the pages of our Service
                that you visit, the time and date of your visit, the time spent
                on those pages and other statistics.{" "}
              </p>
              <p>
                When you visit the Site, we automatically collect certain
                information about your device, including information about your
                web browser, IP address, time zone, and some of the cookies that
                are installed on your device. Additionally, as you browse the
                Site, we collect information about the individual web pages or
                products that you view, what websites or search terms referred
                you to the Site, and information about how you interact with the
                Site. We refer to this automatically-collected information as
                “Device Information”.
              </p>
              <p>
                This website is operated by Fashion. Throughout the site, the
                terms “we”, “us” and “our” refer to.The offers this website,
                including all information, tools and services available from
                this site to you, the user, conditioned upon your acceptance of
                all terms, conditions, policies and notices stated here.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
