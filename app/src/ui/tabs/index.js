import React, { useEffect, useState, useRef } from "react";
import "./style.css";

const Tabs = ({ options, value, onChange, className }) => {
  const index = options.findIndex((item) => item.value == value);
  const sliderPosition = index * 200 + "px";

  return (
    <div className={`ui-tabs ${className}`}>
      <div className="ui-tabs-controls">
        {options.map((option) => (
          <div
            className="ui-tabs-controls-button"
            onClick={() => onChange(option.value)}
          >
            <span
              className={`ui-tabs-controls-button-label ${
                option.value == value ? "ui-tabs-selected" : ""
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
      <div className="ui-tabs-slider" style={{ paddingLeft: sliderPosition }}>
        <div className="ui-tabs-slider-line"></div>
      </div>
    </div>
  );
};

export default Tabs;
