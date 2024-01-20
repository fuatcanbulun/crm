import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const TitleLabel = ({ label, className }) => {
  return <span className={`ui-title-label ${className}`}>{label}</span>;
};

export default TitleLabel;
