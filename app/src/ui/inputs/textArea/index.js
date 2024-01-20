import React from "react";
import "./style.css";

const TextArea = ({ className, onChange, value }) => {
  return (
    <textarea
      className={`ui-text-area ${className}`}
      onChange={(e) => onChange(e.target.value)}
    >
      {value}
    </textarea>
  );
};

export default TextArea;
