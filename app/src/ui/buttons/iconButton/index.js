import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const IconButton = ({ icon, className }) => {
  return (
    <div className={`ui-icon-button ${className}`}>
      <img className="ui-icon-button-image" src={icon} />
    </div>
  );
};

export default IconButton;
