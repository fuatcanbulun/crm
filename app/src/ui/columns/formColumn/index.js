import React from "react";
import "./style.css";

const FormColumn = ({ className, children }) => {
  return <div className={`ui-form-column ${className}`}>{children}</div>;
};

export default FormColumn;
