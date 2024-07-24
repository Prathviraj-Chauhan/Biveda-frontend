"use client";

import React, { useEffect, useState } from "react";
import styles from "./chnagePassword.module.scss";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { onChangeForgotPassword } from "../../redux/actions/authActions";
import { useRouter } from "next/navigation";
import Input from "../common/Input";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [values, setValues] = useState({ password: "", confirm_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState();
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== undefined) {
      const url = window.location.href;
      const params = new URLSearchParams(url?.split("?")[1]);
      const token = params.get("token");
      setToken(token);
    }
  }, []);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const SetLatestPasswordFormHandler = (e) => {
    e.preventDefault();

    const data = {
      token: token,
      password: values?.password,
    };

    if (!values?.password) {
      toast.error("Please enter your password");
    } else if (!values?.confirm_password) {
      toast.error("Please enter your confirm password");
    } else if (values?.password !== values?.confirm_password) {
      toast.error("Confirm password should match with new password");
    } else {
      dispatch(onChangeForgotPassword(data, router));
    }
  };

  return (
    <>
      <div
        className={`${styles["forgot_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_forgot_wrapper"] : null
        }`}
      >
        <div className={styles.main_div}>
          <h4>Change Password</h4>
          <form onSubmit={SetLatestPasswordFormHandler}>
            <div className={styles.long_input_divs}>
              <div className={styles.label_div2}>
                <label>Password </label>
                <Input
                  className={styles["inputmain"]}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={onInputChange}
                  name="password"
                />

                {!showPassword ? (
                  <span
                    className={styles.eyeSpan}
                    onClick={() => setShowPassword(true)}
                  >
                    <i className="fa-sharp fa-solid fa-eye-slash "></i>
                  </span>
                ) : (
                  <span
                    className={styles.eyeSpan}
                    onClick={() => setShowPassword(false)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </span>
                )}
              </div>
            </div>
            <div className={styles.long_input_divs}>
              <div className={styles.label_div2}>
                <label>Confirm Password </label>
                <Input
                  className={styles["inputmain"]}
                  type={confirmShowPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={onInputChange}
                  name="confirm_password"
                />

                {!confirmShowPassword ? (
                  <span
                    className={styles.eyeSpan}
                    onClick={() => setConfirmShowPassword(true)}
                  >
                    <i className="fa-sharp fa-solid fa-eye-slash "></i>
                  </span>
                ) : (
                  <span
                    className={styles.eyeSpan}
                    onClick={() => setConfirmShowPassword(false)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </span>
                )}
              </div>
            </div>

            <Button className={styles.btn_of_otp} type="submit">
              Save
            </Button>
          </form>
        </div>
      </div>

      {pageLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default ChangePassword;
