import React from "react";
import "./style.css";

const LandingLayout = ({ className, children }) => {
  return <div className={`ui-landing-layout ${className}`}>{children}</div>;
};

export default LandingLayout;
