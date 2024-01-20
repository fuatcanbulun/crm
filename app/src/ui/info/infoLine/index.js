import React from "react";
import "./style.css";

const InfoLine = ({ className, label, value }) => {
  return (
    <div className={`ui-info-line ${className}`}>
      <span className="ui-info-line-label">{label}</span>
      <span className="ui-info-line-value">{value}</span>
    </div>
  );
};

export default InfoLine;
