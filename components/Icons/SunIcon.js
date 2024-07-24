import React from "react";

const SunIcon = ({ isDarkTheme }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M11.0003 16.9584C14.291 16.9584 16.9587 14.2908 16.9587 11.0001C16.9587 7.70938 14.291 5.04175 11.0003 5.04175C7.70963 5.04175 5.04199 7.70938 5.04199 11.0001C5.04199 14.2908 7.70963 16.9584 11.0003 16.9584Z"
        stroke={isDarkTheme === "light" ? "#292D32" : "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5447 17.5449L17.4255 17.4258M17.4255 4.57408L17.5447 4.45492L17.4255 4.57408ZM4.45467 17.5449L4.57384 17.4258L4.45467 17.5449ZM10.9997 1.90659V1.83325V1.90659ZM10.9997 20.1666V20.0933V20.1666ZM1.90634 10.9999H1.83301H1.90634ZM20.1663 10.9999H20.093H20.1663ZM4.57384 4.57408L4.45467 4.45492L4.57384 4.57408Z"
        stroke={isDarkTheme === "light" ? "#292D32" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SunIcon;
