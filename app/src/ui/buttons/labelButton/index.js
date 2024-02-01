import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const LabelButton = ({ icon, label, onClick, className }) => {
  return (
    <button
      className={`ui-label-button ${className}`}
      onClick={() => onClick()}
    >
      <span className="ui-label-button-label">{label}</span>
    </button>
  );
};

export default LabelButton;
