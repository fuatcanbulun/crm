import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { LuChevronDown } from "react-icons/lu";

const MultiSelectInput = ({ value, options, onChange, className }) => {
  const inputOptions = useRef();
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [selected, setSelected] = useState(value ? value : []);

  useEffect(() => {
    if (optionsVisibility) {
      window.addEventListener("mouseup", (e) => {
        handleOutsideClick(e);
      });
    } else {
      window.removeEventListener("mouseup", (e) => {
        handleOutsideClick(e);
      });
    }
  }, [optionsVisibility]);

  const handleOutsideClick = (e) => {
    if (inputOptions.current && !inputOptions.current.contains(e.target)) {
      setOptionsVisibility(false);
    }
  };

  const handleOnChange = (val) => {
    const newData = [...selected];
    let result = [];
    if (newData.includes(val)) {
      result = newData.filter((item) => item != val);
    } else {
      newData.push(val);
      result = newData;
    }

    setSelected(result);
    onChange(result);
  };

  return (
    <div className={`ui-multi-select-input ${className}`}>
      <div
        className="ui-multi-select-input-value"
        onClick={() => setOptionsVisibility(!optionsVisibility)}
      >
        <span>{selected.length + " items selected"}</span>
        <LuChevronDown />
      </div>
      {optionsVisibility && (
        <div className="ui-multi-select-input-options" ref={inputOptions}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`ui-multi-select-input-option ${
                selected.includes(option.value) ? "ui-selected" : ""
              }`}
              onClick={() => handleOnChange(option.value)}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
