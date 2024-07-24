import React, { useState } from "react";
import styles from "./videobanner.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { onChangePassword } from "../../redux/actions/authActions";
import Input from "../common/Input";

const ChangePasswordPopup = ({ setPopup }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const { isDarkTheme } = useSelector((state) => state.auth);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
    };

    if (!values?.oldPassword) {
      toast.error("Please enter your old password");
    } else if (!values?.newPassword) {
      toast.error("Please enter your new password");
    } else if (!values?.confirmPassword) {
      toast.error("Please enter your confirm password");
    } else if (values?.newPassword !== values?.confirmPassword) {
      toast.error("Confirm password should match with new password");
    } else {
      dispatch(onChangePassword(data, setPopup));
    }
  };

  return (
    <div
      className={`${styles["bg_wrapper_popup_new"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <div
        className={`${styles["popup_box_bpn"]} ${styles["profile_nceqoi_popup"]} ${styles["pb-4"]}`}
      >
        <div className={`${styles["popup_header"]} ${styles["pb-0"]}`}>
          <div className={styles["p_header_hding"]}>Change Password</div>
          <div className={styles["close_pp_btn"]} onClick={() => setPopup()}>
            <i className="fa fa-remove"></i>
          </div>
        </div>
        <form
          className={styles.change_password_popup}
          onSubmit={handleFormSubmit}
        >
          <div className={styles.long_input_divs}>
            <div className={styles.label_div2}>
              <Input
                className={styles["inputmain"]}
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                onChange={onInputChange}
                name="oldPassword"
                value={values?.oldPassword}
              />

              {!showOldPassword ? (
                <span
                  className={styles.eyeSpan}
                  onClick={() => setShowOldPassword(true)}
                >
                  <i className="fa-sharp fa-solid fa-eye-slash "></i>
                </span>
              ) : (
                <span
                  className={styles.eyeSpan}
                  onClick={() => setShowOldPassword(false)}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
              )}
            </div>
          </div>
          <div className={styles.long_input_divs}>
            <div className={styles.label_div2}>
              <Input
                className={styles["inputmain"]}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                onChange={onInputChange}
                name="newPassword"
                value={values?.newPassword}
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
              <Input
                className={styles["inputmain"]}
                type={confirmShowPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={onInputChange}
                name="confirmPassword"
                value={values?.confirmPassword}
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

          <button className={styles.btn_of_otp} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
