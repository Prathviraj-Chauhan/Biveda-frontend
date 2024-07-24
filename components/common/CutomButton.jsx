import React from "react";

const CutomButton = ({ title, type, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default CutomButton;
