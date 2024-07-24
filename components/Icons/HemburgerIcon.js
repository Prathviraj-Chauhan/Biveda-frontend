import React from "react";

const HemburgerIcon = ({ styles, isDarkTheme, handleShowMenu }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={styles.hemburger_menu}
      onClick={handleShowMenu}
    >
      <rect width="34" height="34" rx="4" fill="#0CEAEF" />
      <path
        d="M8 15.8344H22.0025V18.1681H8V15.8344ZM8 10H26.67V12.3338H8V10ZM8 24.0025H16.4423V21.6688H8V24.0025Z"
        stroke={isDarkTheme === "light" ? "white" : "black"}
      />
    </svg>
  );
};

export default HemburgerIcon;
