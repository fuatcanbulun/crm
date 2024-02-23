import React from "react";
import "./style.css";

const TextInput = ({ className, onChange, value, type }) => {
  return (
    <input
      type={type}
      value={value}
      className={`ui-text-input ${className}`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
