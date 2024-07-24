import React from "react";

const FeedbackCommentIcon = ({ isDarkTheme }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="9"
        cy="9"
        r="9"
        fill={isDarkTheme === "light" ? "#1da1f2" : "#0CEAEF"}
      />
      <g clipPath="url(#clip0_634_1217)">
        <path
          d="M12.125 13.375C12.0545 13.3746 11.9862 13.3504 11.9312 13.3063L9.67188 11.5H5.25C5.00136 11.5 4.7629 11.4012 4.58709 11.2254C4.41127 11.0496 4.3125 10.8111 4.3125 10.5625V5.5625C4.3125 5.31386 4.41127 5.0754 4.58709 4.89959C4.7629 4.72377 5.00136 4.625 5.25 4.625H12.75C12.9986 4.625 13.2371 4.72377 13.4129 4.89959C13.5887 5.0754 13.6875 5.31386 13.6875 5.5625V10.5625C13.6875 10.8111 13.5887 11.0496 13.4129 11.2254C13.2371 11.4012 12.9986 11.5 12.75 11.5H12.4375V13.0625C12.4373 13.1214 12.4205 13.1791 12.389 13.2288C12.3575 13.2786 12.3126 13.3184 12.2594 13.3438C12.2178 13.365 12.1717 13.3758 12.125 13.375ZM5.25 5.25C5.16712 5.25 5.08763 5.28292 5.02903 5.34153C4.97042 5.40013 4.9375 5.47962 4.9375 5.5625V10.5625C4.9375 10.6454 4.97042 10.7249 5.02903 10.7835C5.08763 10.8421 5.16712 10.875 5.25 10.875H9.78125C9.85281 10.8747 9.92231 10.899 9.97812 10.9437L11.8125 12.4125V11.1875C11.8125 11.1046 11.8454 11.0251 11.904 10.9665C11.9626 10.9079 12.0421 10.875 12.125 10.875H12.75C12.8329 10.875 12.9124 10.8421 12.971 10.7835C13.0296 10.7249 13.0625 10.6454 13.0625 10.5625V5.5625C13.0625 5.47962 13.0296 5.40013 12.971 5.34153C12.9124 5.28292 12.8329 5.25 12.75 5.25H5.25Z"
          fill={isDarkTheme === "light" ? "#fff" : "#000"}
        />
        <path
          d="M9.3125 7.75H8.6875V8.375H9.3125V7.75Z"
          fill={isDarkTheme === "light" ? "#fff" : "#000"}
        />
        <path
          d="M7.125 7.75H6.5V8.375H7.125V7.75Z"
          fill={isDarkTheme === "light" ? "#fff" : "#000"}
        />
        <path
          d="M11.5 7.75H10.875V8.375H11.5V7.75Z"
          fill={isDarkTheme === "light" ? "#fff" : "#000"}
        />
      </g>
      <defs>
        <clipPath id="clip0_634_1217">
          <rect
            width="10"
            height="10"
            fill="white"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FeedbackCommentIcon;
