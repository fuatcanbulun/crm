import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const IconButton = ({ icon, className, onClick }) => {
  return (
    <button className={`ui-icon-button ${className}`} onClick={() => onClick()}>
      {icon}
    </button>
  );
};

export default IconButton;
