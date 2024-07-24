import React from "react";

const ChevronTopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
    >
      <g filter="url(#filter0_d_1722_2145)">
        <circle cx="15.085" cy="15.085" r="12.085" fill="white" />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7123 17.1696C19.3914 17.3664 18.9329 17.3167 18.6882 17.0586L15.042 13.2118C14.9513 13.1635 14.8187 13.1635 14.728 13.2118L11.0818 17.0586C10.8371 17.3167 10.3786 17.3664 10.0577 17.1696C9.73679 16.9728 9.67499 16.604 9.91967 16.3458L13.5784 12.4858C13.6211 12.4407 13.6857 12.3784 13.7752 12.3188C14.4128 11.8937 15.3572 11.8937 15.9948 12.3188C16.0843 12.3784 16.1489 12.4407 16.1916 12.4858L19.8503 16.3458C20.095 16.604 20.0332 16.9728 19.7123 17.1696Z"
        fill="#0CEAEF"
      />
      <defs>
        <filter
          id="filter0_d_1722_2145"
          x="0.732041"
          y="0.732041"
          width="30.2178"
          height="30.2179"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="0.755986" dy="0.755986" />
          <feGaussianBlur stdDeviation="1.51197" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1722_2145"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1722_2145"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ChevronTopIcon;
