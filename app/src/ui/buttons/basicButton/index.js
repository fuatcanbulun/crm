import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const BasicButton = ({ icon, label, onClick, className }) => {
  return (
    <button
      className={`ui-basic-button ${className}`}
      onClick={() => onClick()}
    >
      {icon}
      <span className="ui-basic-button-label">{label}</span>
    </button>
  );
};

export default BasicButton;
