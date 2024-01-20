import React from "react";
import "./style.css";

const FormRow = ({ className, children }) => {
  return <div className={`ui-form-row ${className}`}>{children}</div>;
};

export default FormRow;
