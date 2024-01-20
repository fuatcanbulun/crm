import React from "react";
import "./style.css";

const PageRow = ({ className, children }) => {
  return <div className={`ui-page-row ${className}`}>{children}</div>;
};

export default PageRow;
