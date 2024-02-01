import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { LuChevronDown } from "react-icons/lu";

const SingleSelectInput = ({ value, options, onChange, className }) => {
  const inputOptions = useRef();

  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [selected, setSelected] = useState(value ? value : {});

  let sortedOptions;
  if (options?.length > 0) {
    sortedOptions = options.sort(function (a, b) {
      return a.label.localeCompare(b.label);
    });
  } else {
    sortedOptions = options;
  }

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

  const handleOnChange = (val, label) => {
    setSelected(val);
    onChange(val, label);
  };

  return (
    <div
      className={`ui-single-select-input ${className}`}
      onClick={() => setOptionsVisibility(!optionsVisibility)}
    >
      <div className="ui-single-select-input-value">
        <span>{options.find((option) => option.value == selected)?.label}</span>
        <LuChevronDown />
      </div>
      {optionsVisibility && (
        <div className="ui-single-select-input-options" ref={inputOptions}>
          <div
            className="ui-single-select-input-option"
            onClick={() => handleOnChange(null)}
          >
            <span>Seçiniz</span>
          </div>
          {sortedOptions.map((option, index) => (
            <div
              key={index}
              className="ui-single-select-input-option"
              onClick={() => handleOnChange(option.value, option.label)}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelectInput;
