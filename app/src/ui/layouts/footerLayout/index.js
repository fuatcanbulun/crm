import React from "react";
import "./style.css";

const FooterLayout = ({ className, children }) => {
  return <div className={`ui-footer-layout ${className}`}>{children}</div>;
};

export default FooterLayout;
