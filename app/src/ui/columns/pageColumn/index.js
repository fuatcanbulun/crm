import React from "react";
import "./style.css";

const PageColumn = ({ className, children }) => {
  return <div className={`ui-page-column ${className}`}>{children}</div>;
};

export default PageColumn;
