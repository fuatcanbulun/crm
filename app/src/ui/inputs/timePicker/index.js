import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { LuClock } from "react-icons/lu";
import moment from "moment";
const TimePicker = ({
  value,
  onChange,
  className,
  isSecondsVisible = true,
}) => {
  const inputOptions = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [selectedHour, setSelectedHour] = useState(
    value ? value.split(":")[0] : ""
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? value.split(":")[1] : ""
  );
  const [selectedSecond, setSelectedSecond] = useState(
    value ? value.split(":")[2] : ""
  );

  useEffect(() => {
    if (optionsVisibility) {
      window.addEventListener("mouseup", (e) => {
        handleOutsideClick(e);
      });
      setTimeout(() => {
        hourRef.current.scrollTop = parseInt(selectedHour) * 50;
        minuteRef.current.scrollTop = parseInt(selectedMinute) * 50;
        secondRef.current.scrollTop = parseInt(selectedSecond) * 50;
      }, 100);
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

  const calculateValue = (i) => {
    return i < 10 ? `0${i}` : i;
  };

  const handleOnChange = (i, type) => {
    let timeString = "";

    if (type == "hour") {
      setSelectedHour(calculateValue(i));
      timeString =
        calculateValue(i) +
        ":" +
        selectedMinute +
        (isSecondsVisible ? ":" + selectedSecond : "");
    }
    if (type == "minute") {
      setSelectedMinute(calculateValue(i));
      timeString =
        selectedHour +
        ":" +
        calculateValue(i) +
        (isSecondsVisible ? ":" + selectedSecond : "");
    }
    if (type == "second") {
      setSelectedSecond(calculateValue(i));
      timeString =
        selectedHour +
        ":" +
        selectedMinute +
        (isSecondsVisible ? ":" + calculateValue(i) : "");
    }

    onChange(timeString);
  };

  return (
    <div className={`ui-time-picker ${className}`}>
      <div
        className="ui-time-picker-value"
        onClick={() => setOptionsVisibility(!optionsVisibility)}
      >
        <span>{value}</span>
        <LuClock />
      </div>
      {optionsVisibility && (
        <div className="ui-time-picker-options" ref={inputOptions}>
          <div className="ui-time-picker-options-column">
            <div className="ui-time-picker-options-scroll" ref={hourRef}>
              {[...Array(24)].map((x, i) => (
                <div
                  className={`ui-time-picker-options-item ${
                    calculateValue(i) == selectedHour
                      ? "ui-time-picker-options-item-selected"
                      : ""
                  }`}
                  onClick={() => handleOnChange(i, "hour")}
                >
                  {calculateValue(i)}
                </div>
              ))}
            </div>
          </div>
          <div className="ui-time-picker-options-column">
            <div className="ui-time-picker-options-scroll" ref={minuteRef}>
              {[...Array(60)].map((x, i) => (
                <div
                  className={`ui-time-picker-options-item ${
                    calculateValue(i) == selectedMinute
                      ? "ui-time-picker-options-item-selected"
                      : ""
                  }`}
                  onClick={() => handleOnChange(i, "minute")}
                >
                  {calculateValue(i)}
                </div>
              ))}
            </div>
          </div>
          <div className="ui-time-picker-options-column">
            {isSecondsVisible && (
              <div className="ui-time-picker-options-scroll" ref={secondRef}>
                {[...Array(60)].map((x, i) => (
                  <div
                    className={`ui-time-picker-options-item ${
                      calculateValue(i) == selectedSecond
                        ? "ui-time-picker-options-item-selected"
                        : ""
                    }`}
                    onClick={() => handleOnChange(i, "second")}
                  >
                    {calculateValue(i)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
