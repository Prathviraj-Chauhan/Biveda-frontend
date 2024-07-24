import React from "react";

const SearchIcon = ({ isDarkTheme }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4163 24.4999C19.5375 24.4999 24.4997 19.5377 24.4997 13.4166C24.4997 7.29543 19.5375 2.33325 13.4163 2.33325C7.29518 2.33325 2.33301 7.29543 2.33301 13.4166C2.33301 19.5377 7.29518 24.4999 13.4163 24.4999Z"
        stroke={isDarkTheme === "light" ? "black" : "white"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.6663 25.6666L23.333 23.3333"
        stroke={isDarkTheme === "light" ? "black" : "white"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
