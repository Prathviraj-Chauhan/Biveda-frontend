import React from "react";

const TextArea = ({ cols, rows, placeholder, name, value, onChange }) => {
  return (
    <textarea
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextArea;
