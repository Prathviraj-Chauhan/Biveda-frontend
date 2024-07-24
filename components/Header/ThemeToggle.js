import React from "react";
import styles from "./header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { handleDarkTheme } from "../../redux/actions/authActions";
import { MoonIcon, SunIcon } from "../Icons";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.auth);

  const handleChangeMode = (tab) => {
    dispatch(handleDarkTheme(tab));
  };

  return (
    <div
      className={`${styles["darkmode_wrapper"]} ${
        isDarkTheme === "light" ? styles["light_wrapper"] : null
      }`}
    >
      <div
        className={
          isDarkTheme === "light" ? styles.active_mode : styles.inactive_mode
        }
        onClick={() => handleChangeMode("light")}
      >
        <SunIcon isDarkTheme={isDarkTheme} />
      </div>
      <div
        className={
          isDarkTheme === "dark" ? styles.active_mode : styles.inactive_mode
        }
        onClick={() => handleChangeMode("dark")}
      >
        <MoonIcon isDarkTheme={isDarkTheme} />
      </div>
    </div>
  );
};

export default ThemeToggle;
