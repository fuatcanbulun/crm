import React from "react";
import "./style.css";

const ContainerLayout = ({ className, children }) => {
  return <div className={`ui-container-layout ${className}`}>{children}</div>;
};

export default ContainerLayout;
