import React from "react";
import "./style.css";

const ContentLayout = ({ className, children, isExtended }) => {
  return (
    <div
      className={`ui-content-layout ${
        isExtended ? "ui-content-layout-extended" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentLayout;
