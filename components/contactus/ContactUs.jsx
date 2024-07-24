"use client";

import React, { useState } from "react";
import Banner from "../banner/Banner";
import styles from "./contactus.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { onSendContactUs } from "../../redux/actions/authActions";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import { EmailIcon, LocationIcon, PhoneIcon } from "../Icons";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { siteSettingData } = useSelector((state) => state.home);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: values?.name,
      email: values?.email,
      phone: values?.phone,
      address: values?.address,
      message: values?.message,
    };

    if (!values?.name) {
      toast.error("Please enter your first name");
    } else if (!values?.email) {
      toast.error("Please enter your email");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values?.email)
    ) {
      toast.error("Please type a valid email address");
    } else if (!values?.phone) {
      toast.error("Please enter your mobile number");
    } else if (!values?.address) {
      toast.error("Please enter your address");
    } else if (!values?.message) {
      toast.error("Please enter your message");
    } else {
      dispatch(onSendContactUs(data));
    }
  };

  return (
    <>
      <Banner text="Contact Us" />

      <div
        className={`${styles["contactus_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_contactus"] : null
        }`}
        id="contactUs"
      >
        <div className="container">
          <h1 className={styles.contactus_heading}>
            Send Us <span>Email</span>
          </h1>
          <p className={styles.contactus_para}>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim{" "}
          </p>
          <div className={styles.contactus_form}>
            <div className={styles.contactus_list}>
              <div className={styles.contactus_item}>
                <div className={styles.contactus_img}>
                  <PhoneIcon />
                </div>
                <div className={styles.contactus_info}>
                  <h6>Call Us</h6>
                  <a
                    href={`tel:${siteSettingData?.mobile_number}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {siteSettingData?.mobile_number}
                  </a>
                </div>
              </div>
              <div className={styles.contactus_item}>
                <div className={styles.contactus_img}>
                  <EmailIcon />
                </div>
                <div className={styles.contactus_info}>
                  <h6>Email Us</h6>
                  <a
                    href={`mailto:${siteSettingData?.support_email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {siteSettingData?.support_email}
                  </a>
                </div>
              </div>
              <div className={styles.contactus_item}>
                <div className={styles.contactus_img}>
                  <LocationIcon />
                </div>
                <div className={styles.contactus_info}>
                  <h6>Address</h6>
                  <p>Jaipur Rajasthan, India</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.contactus_input_list}>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Name*</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={values?.name}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Email*</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      placeholder="Email*"
                      name="email"
                      value={values?.email}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.contactus_input_list}>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Mobile Number</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="number"
                      placeholder="Enter Mobile Number"
                      name="phone"
                      value={values?.phone}
                      onChange={onInputChange}
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Address</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={values?.address}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.contactus_input_list}>
                <div
                  className={`${styles.contactus_input_item} ${styles.textarea_item}`}
                >
                  <label htmlFor="">Message</label>
                  <div className={styles.contactus_input}>
                    <TextArea
                      cols="30"
                      rows="5"
                      placeholder="Type..."
                      name="message"
                      value={values?.message}
                      onChange={onInputChange}
                    />
                  </div>{" "}
                </div>
              </div>
              <button className={styles.sendmessage_btn}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
