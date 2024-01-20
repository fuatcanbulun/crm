import React from "react";
import "./style.css";

const TextInput = ({ className, onChange, value }) => {
  return (
    <input
      value={value}
      className={`ui-text-input ${className}`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
