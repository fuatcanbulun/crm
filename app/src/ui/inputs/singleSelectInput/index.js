import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { LuChevronDown } from "react-icons/lu";

const SingleSelectInput = ({ value, options, onChange, className }) => {
  const inputOptions = useRef();

  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [selected, setSelected] = useState(value ? value : {});
  const [sortedOptions, setSortedOptions] = useState(options);
  const [filteredOptions, setFilteredOptions] = useState(options);

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
    if (inputOptions.current && !inputOptions.current.contains(e.target)) {
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

  return (
    <div className={`ui-single-select-input ${className}`}>
      <div
        className="ui-single-select-input-value"
        onClick={() => setOptionsVisibility(!optionsVisibility)}
      >
        <span>{options.find((option) => option.value == selected)?.label}</span>
        <LuChevronDown />
      </div>
      {optionsVisibility && (
        <div className="ui-single-select-input-options" ref={inputOptions}>
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
            {filteredOptions.map((option, index) => (
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
