import React from "react";
import "./style.css";

const HeaderLayout = ({ className, children }) => {
  return <div className={`ui-header-layout ${className}`}>{children}</div>;
};

export default HeaderLayout;
