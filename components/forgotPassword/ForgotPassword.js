"use client";

import React, { useState } from "react";
import styles from "./forgotpassword.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onForgotPassword } from "../../redux/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Input from "../common/Input";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState({ email: "" });
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: values?.email,
    };

    if (!values?.email) {
      toast.error("Please enter your email");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values?.email)
    ) {
      toast.error("Please type a valid email address");
    } else {
      dispatch(onForgotPassword(data, router));
    }
  };

  return (
    <>
      <div
        className={`${styles["forgot_wrapper"]} ${
          isDarkTheme === "light" ? styles["lightforgot_wrapper"] : null
        }`}
      >
        <form onSubmit={handleFormSubmit} className={styles.main_div}>
          <h4>Forgot Password</h4>

          <div className={styles.long_input_divs}>
            <div className={styles.label_div2}>
              <label>Email </label>
              <Input
                type="text"
                name="email"
                value={values?.email}
                onChange={onInputChange}
                placeholder="Please enter your email"
              />
            </div>
          </div>

          <Button type="submit" className={styles.btn_of_otp}>
            SEND
          </Button>
        </form>
      </div>
      {pageLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default ForgotPassword;
