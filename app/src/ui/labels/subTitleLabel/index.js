import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const SubTitleLabel = ({ label, className }) => {
  return <span className={`ui-sub-title-label ${className}`}>{label}</span>;
};

export default SubTitleLabel;
