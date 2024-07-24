import React from "react";

const InActiveReviewIcon = ({ styles }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.unselected_items}
    >
      <circle cx="10" cy="10" r="9.5" stroke="white" />
    </svg>
  );
};

export default InActiveReviewIcon;
