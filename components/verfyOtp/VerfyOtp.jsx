"use client";

import React, { useEffect, useState } from "react";
import styles from "./verifyotp.module.scss";
import { Button } from "react-bootstrap";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { onVerifyRegister } from "../../redux/actions/authActions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState();
  const [time, setTime] = useState(60);
  const [reOtp, setReOtp] = useState(true);
  const [token, setToken] = useState();
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== undefined) {
      const url = window.location.href;
      const params = new URLSearchParams(url?.split("?")[1]);
      const token = params.get("token");
      setToken(token);
    }
  }, []);

  useEffect(() => {
    setReOtp(false);
    let i = 1;
    const timeout2 = setInterval(() => {
      setTime(time - i);
      i = i + 1;
    }, 1000);

    setTimeout(() => {
      setReOtp(true);
      clearInterval(timeout2);
      setTime(60);
    }, 60000);
  }, []);

  const onInputChange = (value) => {
    setOtp(value);
  };

  const resendOtp = () => {
    setOtp();

    setReOtp(false);

    let i = 1;

    const timeout2 = setInterval(() => {
      setTime(time - i);
      i = i + 1;
    }, 1000);

    setTimeout(() => {
      setReOtp(true);
      clearInterval(timeout2);
      setTime(60);
    }, 60000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      otp: Number(otp),
    };

    if (!otp) {
      toast.error("Please enter an otp");
    } else if (otp && otp.length < 4) {
      toast.error("The OTP must be 4 digit");
    } else {
      dispatch(onVerifyRegister(token, data, router));
    }
  };

  return (
    <>
      <div
        className={`${styles["verify_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_verify_wrapper"] : null
        }`}
      >
        <form onSubmit={handleFormSubmit} className={styles.main_div}>
          <h4>Verify Otp</h4>

          <div className={styles.long_input_divs}>
            <OTPInput
              value={otp}
              onChange={onInputChange}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          {reOtp ? (
            <h5 onClick={resendOtp}>
              Don't get the code ? <span onClick={resendOtp}>Resend OTP</span>
            </h5>
          ) : (
            <h5>You can resend an OTP after {time} seconds</h5>
          )}

          <Button type="submit" className={styles.btn_of_otps}>
            SEND
          </Button>
        </form>
      </div>

      {pageLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default VerifyOtp;
