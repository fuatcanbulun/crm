import React from "react";
import "./style.css";

const FormField = ({ className, children }) => {
  return <div className={`ui-form-field ${className}`}>{children}</div>;
};

export default FormField;
