import React from "react";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  onWheel,
  className,
  id,
  checked,
  max,
  disabled,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onWheel={onWheel}
      checked={checked}
      className={className}
      max={max}
      disabled={disabled}
    />
  );
};

export default Input;
