import React from "react";
import "./style.css";

const PageLayout = ({ className, children }) => {
  return <div className={`ui-page-layout ${className}`}>{children}</div>;
};

export default PageLayout;
