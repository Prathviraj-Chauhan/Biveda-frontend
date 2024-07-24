import React from "react";

const ActiveReviewIcon = ({ styles, rating, ratingData }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.selected_items}
    >
      <circle
        cx="10"
        cy="10"
        r="9.5"
        fill={ratingData >= rating ? "#0CEAEF" : "#000"}
        stroke={ratingData >= rating ? "#0CEAEF" : "#fff"}
      />
    </svg>
  );
};

export default ActiveReviewIcon;
