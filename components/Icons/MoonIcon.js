import React from "react";

const MoonIcon = ({ isDarkTheme }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.86083 11.385C2.19083 16.1058 6.19667 19.9466 10.9908 20.1575C14.3733 20.3041 17.3983 18.7275 19.2133 16.2433C19.965 15.2258 19.5617 14.5475 18.3058 14.7766C17.6917 14.8866 17.0592 14.9325 16.3992 14.905C11.9167 14.7216 8.25 10.9725 8.23167 6.54496C8.2225 5.3533 8.47 4.2258 8.91917 3.19913C9.41417 2.06246 8.81833 1.52163 7.6725 2.00746C4.0425 3.5383 1.55833 7.1958 1.86083 11.385Z"
        stroke={isDarkTheme === "dark" ? "#292D32" : "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoonIcon;
