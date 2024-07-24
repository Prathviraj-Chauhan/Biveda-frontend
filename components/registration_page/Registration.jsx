"use client";

import React, { useState } from "react";
import styles from "./registration.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onRegister } from "../../redux/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Input from "../common/Input";
import CutomButton from "../common/CutomButton";

const Registration = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [registerValues, setRegisterValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    disease: "",
    user_role: "",
  });
  const { isDarkTheme, pageLoading } = useSelector((state) => state.auth);

  const onLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const onRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginValues?.email,
      password: loginValues?.password,
    };

    if (!loginValues?.email) {
      toast.error("Please enter your email");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(loginValues?.email)
    ) {
      toast.error("Please type a valid email address");
    } else if (!loginValues?.password) {
      toast.error("Please enter your password");
    } else {
      dispatch(onLogin(data, router));
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const data = {
      role: registerValues?.user_role,
      first_name: registerValues?.first_name,
      last_name: registerValues?.last_name,
      email: registerValues?.email,
      phone: registerValues?.phone,
      password: registerValues?.password,
      disease: registerValues?.disease,
      confirm_password: registerValues?.confirm_password,
    };

    if (!registerValues?.first_name) {
      toast.error("Please enter your first name");
    } else if (!registerValues?.last_name) {
      toast.error("Please enter your last name");
    } else if (!registerValues?.email) {
      toast.error("Please enter your email");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registerValues?.email)
    ) {
      toast.error("Please type a valid email address");
    } else if (!registerValues?.phone) {
      toast.error("Please enter your mobile number");
    } else if (!registerValues?.password) {
      toast.error("Please enter your password");
    } else if (!registerValues?.confirm_password) {
      toast.error("Please enter your confirm password");
    } else if (registerValues.password !== registerValues.confirm_password) {
      toast.error("Confirm password should match with new password");
    } else if (!registerValues.disease) {
      toast.error("Please select disease");
    } else if (!registerValues.user_role) {
      toast.error("Please select user role");
    } else {
      dispatch(onRegister(data, setRegisterValues));
    }
  };

  return (
    <>
      <div
        className={`${styles["form_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_form_wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.signup_create_wrapper}>
            <form onSubmit={handleLoginSubmit}>
              <h3 className={styles.form_title}>Sign In</h3>
              <div className={styles.contactus_input_list}>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">EMAIL*</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      name="email"
                      value={loginValues?.email}
                      onChange={onLoginChange}
                      placeholder="Please enter your email"
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">PASSWORD</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginValues?.password}
                      onChange={onLoginChange}
                      placeholder="Please enter your password"
                    />
                  </div>
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

              <div className={styles.checkbpx_wrapper_div}>
                <div className="checkbox check_transparent">
                  <div className={styles.checkbox_wrapper}>
                    <Input
                      type="checkbox"
                      id="cutOfCheckbox"
                      className={styles.custom_checkbox}
                    />

                    <label htmlFor="cutOfCheckbox" className="">
                      Remember Me
                    </label>
                  </div>
                </div>
                <Link href="/forgot-password" className="text-decoration-none">
                  <span> Forgot password?</span>
                </Link>
              </div>

              <CutomButton
                type="submit"
                title="login"
                className={styles.sendmessage_btn}
              />
            </form>

            <form onSubmit={handleRegisterSubmit}>
              <h3 className={styles.form_title}>Create An Account</h3>
              <div className={styles.contactus_input_list}>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">First Name</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      name="first_name"
                      value={registerValues?.first_name}
                      onChange={onRegisterChange}
                      placeholder="Please enter your first name"
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Last name</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      name="last_name"
                      value={registerValues?.last_name}
                      onChange={onRegisterChange}
                      placeholder="Please enter your last name"
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Email</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="text"
                      name="email"
                      value={registerValues?.email}
                      onChange={onRegisterChange}
                      placeholder="Please enter your email"
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">phone number</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type="number"
                      name="phone"
                      value={registerValues?.phone}
                      onChange={onRegisterChange}
                      placeholder="Please enter your phone number"
                      onWheel={(e) => e.target.blur()}
                    />
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">password</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type={showRegisterPassword ? "text" : "password"}
                      name="password"
                      value={registerValues?.password}
                      onChange={onRegisterChange}
                      placeholder="Please enter your password"
                    />
                  </div>
                  {!showRegisterPassword ? (
                    <span
                      className={styles.eyeSpan}
                      onClick={() => setShowRegisterPassword(true)}
                    >
                      <i className="fa-sharp fa-solid fa-eye-slash "></i>
                    </span>
                  ) : (
                    <span
                      className={styles.eyeSpan}
                      onClick={() => setShowRegisterPassword(false)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </span>
                  )}
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Confirm Password</label>
                  <div className={styles.contactus_input}>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      value={registerValues?.confirm_password}
                      onChange={onRegisterChange}
                      placeholder="Please enter your confirm password"
                    />
                  </div>
                  {!showConfirmPassword ? (
                    <span
                      className={styles.eyeSpan}
                      onClick={() => setShowConfirmPassword(true)}
                    >
                      <i className="fa-sharp fa-solid fa-eye-slash "></i>
                    </span>
                  ) : (
                    <span
                      className={styles.eyeSpan}
                      onClick={() => setShowConfirmPassword(false)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </span>
                  )}
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">Disease*</label>
                  <div className={styles.contactus_input}>
                    <select
                      name="disease"
                      value={registerValues?.disease}
                      onChange={onRegisterChange}
                    >
                      <option value="" hidden>
                        Select
                      </option>
                      <option value="Alphaviruses">Alphaviruses</option>
                      <option value="Arthritis">Arthritis</option>
                      <option value="Asthma">Asthma</option>
                      <option value="Babesiosis">Babesiosis</option>
                      <option value="Cancer">Cancer</option>
                      <option value="Chancroid">Chancroid</option>
                      <option value="Chickenpox">Chickenpox</option>
                      <option value="Chlamydia">Chlamydia</option>
                    </select>
                  </div>
                </div>
                <div className={styles.contactus_input_item}>
                  <label htmlFor="">USER TYPE*</label>
                  <div className={styles.contactus_input}>
                    <select
                      name="user_role"
                      value={registerValues?.user_role}
                      onChange={onRegisterChange}
                    >
                      <option value="" hidden>
                        Select
                      </option>
                      <option value="Customer">Customer</option>
                      <option value="HealthExpert">Health Expert</option>
                    </select>
                  </div>
                </div>
              </div>
              <CutomButton
                type="submit"
                title="Create Account"
                className={styles.sendmessage_btn}
              />

              <p>
                by clicking “create account” you agree to the bodybuilding.com
                <span>
                  <Link href="/terms-conditions"> terms of use</Link>{" "}
                </span>{" "}
                and{" "}
                <span>
                  {" "}
                  <Link href="/privacy-policy">privacy</Link>{" "}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      {pageLoading ? <LoadingSpinner /> : null}
    </>
  );
};

export default Registration;
