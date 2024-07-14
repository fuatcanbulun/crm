import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { LuChevronDown } from "react-icons/lu";

const SingleSelectInput = ({ value, options, onChange, className }) => {
  const inputRef = useRef();
  const inputOptionsRef = useRef();

  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [selected, setSelected] = useState(value ? value : {});
  const [sortedOptions, setSortedOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [optionsPosition, setOptionsPosition] = useState("top");

  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    let newData;
    if (options?.length > 0) {
      newData = options.sort(function (a, b) {
        return a.label.localeCompare(b.label);
      });
    } else {
      newData = options;
    }
    setSortedOptions(newData);
    setFilteredOptions(newData);
  }, [options]);

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
    if (
      inputOptionsRef.current &&
      !inputOptionsRef.current.contains(e.target)
    ) {
      setOptionsVisibility(false);
    }
  };

  const handleOnChange = (val, label) => {
    setOptionsVisibility(false);
    setSelected(val);
    onChange(val, label);
  };

  const handleSearch = (val) => {
    const newData = [...sortedOptions];
    const valLowerCase = val.toLowerCase();
    const filteredData = newData.filter((item) =>
      item.label.toLowerCase().startsWith(valLowerCase)
    );
    setFilteredOptions(filteredData);
  };

  const handleOptionsToggle = () => {
    const rect = inputRef.current.getBoundingClientRect();
    console.log(window.innerHeight);

    if (window.innerHeight - rect.y < 250) {
      setOptionsPosition("bottom");
    } else {
      setOptionsPosition("top");
    }
    setOptionsVisibility(!optionsVisibility);
  };

  return (
    <div className={`ui-single-select-input ${className}`} ref={inputRef}>
      <div
        className="ui-single-select-input-value"
        onClick={() => handleOptionsToggle()}
      >
        <span>
          {options?.find((option) => option.value == selected)?.label}
        </span>
        <LuChevronDown />
      </div>
      {optionsVisibility && (
        <div
          className={`ui-single-select-input-options ${
            optionsPosition === "bottom"
              ? "ui-options-bottom"
              : "ui-options-top"
          }`}
          ref={inputOptionsRef}
        >
          <div className="ui-single-select-input-options-search">
            <input onChange={(e) => handleSearch(e.target.value)} />
          </div>
          <div className="ui-single-select-input-options-scroll">
            <div
              className="ui-single-select-input-option"
              onClick={() => handleOnChange(null)}
            >
              <span>Seçiniz</span>
            </div>
            {filteredOptions?.map((option, index) => (
              <div
                key={index}
                className="ui-single-select-input-option"
                onClick={() => handleOnChange(option.value, option.label)}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSelectInput;
