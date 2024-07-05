import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import moment from "moment";
import "moment/locale/tr"; // Türkçe dil desteği için
import {
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

const DatePicker = ({ value, onChange, className }) => {
  const popup = useRef();
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [yearsVisibility, setYearsVisibility] = useState(false);
  const [monthsVisibility, setMonthsVisibility] = useState(false);
  const [popupPosition, setPopupPosition] = useState("bottom");

  const [currentDate, setCurrentDate] = useState(
    value ? moment(value, "YYYY-MM-DD") : moment()
  );

  const months = [];
  for (let index = 0; index < 12; index++) {
    const month = moment().month(index).format("MMMM");
    months.push(month);
  }

  const years = [];
  for (let index = 1900; index < 2100; index++) {
    years.push(index);
  }

  useEffect(() => {
    if (calendarVisibility) {
      window.addEventListener("mouseup", (e) => {
        handleOutsideClick(e);
      });
    } else {
      window.removeEventListener("mouseup", (e) => {
        handleOutsideClick(e);
      });
    }
  }, [calendarVisibility]);

  const handleOutsideClick = (e) => {
    if (popup.current && !popup.current.contains(e.target)) {
      setCalendarVisibility(false);
      setMonthsVisibility(false);
      setYearsVisibility(false);
    }
  };

  const handlePopupPosition = (e) => {
    setPopupPosition(e.screenY > 700 ? "top" : "bottom");
  };

  const handleDayClick = (val) => {
    setCurrentDate(val);
    onChange(moment(val).format("YYYY-MM-DD"));
  };

  const Calendar = () => {
    const renderHeader = () => {
      return (
        <>
          {yearsVisibility && (
            <div className="ui-date-picker-calendar-years">
              {years.map((year) => (
                <div className="ui-date-picker-calendar-years-item">
                  <button
                    onClick={() => selectYear(year)}
                    className="ui-date-picker-calendar-years-item-button"
                  >
                    {year}
                  </button>
                </div>
              ))}
            </div>
          )}
          {monthsVisibility && (
            <div className="ui-date-picker-calendar-months">
              {months.map((item, index) => (
                <div className="ui-date-picker-calendar-months-item">
                  <button
                    className="ui-date-picker-calendar-months-item-button"
                    onClick={() => selectMonth(index)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="ui-date-picker-calendar-header">
            <button
              className="ui-date-picker-calendar-header-button"
              onClick={prevYear}
            >
              <LuChevronsLeft />
            </button>
            <button
              className="ui-date-picker-calendar-header-button"
              onClick={prevMonth}
            >
              <LuChevronLeft />
            </button>
            <div className="ui-date-picker-calendar-header-titles">
              <button
                className="ui-date-picker-calendar-header-month"
                onClick={() => {
                  setMonthsVisibility(true);
                  setYearsVisibility(false);
                }}
              >
                {currentDate.format("MMMM")}
              </button>
              <button
                className="ui-date-picker-calendar-header-year"
                onClick={() => {
                  setYearsVisibility(true);
                  setMonthsVisibility(false);
                }}
              >
                {currentDate.format("YYYY")}
              </button>
            </div>

            <button
              className="ui-date-picker-calendar-header-button"
              onClick={nextMonth}
            >
              <LuChevronRight />
            </button>
            <button
              className="ui-date-picker-calendar-header-button"
              onClick={nextYear}
            >
              <LuChevronsRight />
            </button>
          </div>
        </>
      );
    };

    const renderDays = () => {
      const daysOfWeek = moment.weekdaysShort();
      const firstDayOfWeek = moment().startOf("week").isoWeekday(1);

      return (
        <div className="ui-date-picker-calendar-header-days">
          {daysOfWeek.map((day, index) => (
            <span key={index} className="ui-date-picker-calendar-header-day">
              {firstDayOfWeek.clone().add(index, "days").format("dd")}
            </span>
          ))}
        </div>
      );
    };

    const renderCells = () => {
      const monthStart = moment(currentDate).startOf("month");
      const monthEnd = moment(currentDate).endOf("month");
      const startDate = moment(monthStart).startOf("week");
      const endDate = moment(monthEnd).endOf("week");

      const rows = [];
      let days = [];
      let day = moment(startDate);

      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          const currentDay = moment(day);
          days.push(
            <div
              key={currentDay.format("YYYY-MM-DD")}
              className={`ui-date-picker-calendar-day ${
                isSameMonth(currentDay, monthStart)
                  ? ""
                  : "ui-date-picker-disabled-days"
              } ${
                moment(currentDate).format("DD/MM/YYYY") ==
                moment(currentDay).format("DD/MM/YYYY")
                  ? "ui-date-picker-selected"
                  : ""
              }`}
              onClick={() => handleDayClick(currentDay)}
            >
              {currentDay.format("D")}
            </div>
          );
          day.add(1, "day");
        }
        rows.push(
          <div
            key={day.format("YYYY-MM-DD")}
            className="ui-date-picker-calendar-row"
          >
            {days}
          </div>
        );
        days = [];
      }

      return <div className="ui-date-picker-calendar-body">{rows}</div>;
    };

    const isSameMonth = (day, startOfMonth) => {
      return day.format("MM-YYYY") === startOfMonth.format("MM-YYYY");
    };

    const nextMonth = () => {
      setCurrentDate(moment(currentDate).add(1, "month"));
    };

    const prevMonth = () => {
      setCurrentDate(moment(currentDate).subtract(1, "month"));
    };

    const nextYear = () => {
      setCurrentDate(moment(currentDate).add(12, "month"));
    };

    const prevYear = () => {
      setCurrentDate(moment(currentDate).subtract(12, "month"));
    };

    const selectMonth = (val) => {
      setMonthsVisibility(false);
      setCurrentDate(moment(currentDate).month(val));
    };

    const selectYear = (val) => {
      setYearsVisibility(false);
      setCurrentDate(moment(currentDate).year(val));
    };

    return (
      <div className="ui-date-picker-calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    );
  };

  return (
    <div className={`ui-date-picker ${className}`}>
      <div
        className="ui-date-picker-value"
        onClick={(e) => {
          handlePopupPosition(e);
          setCalendarVisibility(!calendarVisibility);
        }}
      >
        <span>{value ? moment(value).format("DD/MM/YYYY") : ""}</span>
        {value ? (
          <button onClick={() => onChange("")}>
            <AiOutlineClose size={20} />
          </button>
        ) : (
          <LuCalendar />
        )}
      </div>
      {calendarVisibility && (
        <div className={`ui-date-picker-popup-${popupPosition}`} ref={popup}>
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
