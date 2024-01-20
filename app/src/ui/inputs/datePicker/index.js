import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import moment from "moment";
import "moment/locale/tr"; // Türkçe dil desteği için
import { LuCalendar } from "react-icons/lu";

const DatePicker = ({ value, onChange, className }) => {
  const popup = useRef();
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [selected, setSelected] = useState(value ? value : moment());
  const [currentMonth, setCurrentMonth] = useState(moment());

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
    }
  };

  const handleDayClick = (val) => {
    setSelected(val);
    onChange(val);
  };

  const Calendar = () => {
    const renderHeader = () => {
      return (
        <div className="ui-date-picker-calendar-header">
          <button
            className="ui-date-picker-calendar-header-left"
            onClick={prevMonth}
          ></button>
          <span className="ui-date-picker-calendar-header-title">
            {currentMonth.format("MMMM YYYY")}
          </span>
          <button
            className="ui-date-picker-calendar-header-right"
            onClick={nextMonth}
          ></button>
        </div>
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
      const monthStart = moment(currentMonth).startOf("month");
      const monthEnd = moment(currentMonth).endOf("month");
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
                moment(selected).format("DD/MM/YYYY") ==
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
      setCurrentMonth(moment(currentMonth).add(1, "month"));
    };

    const prevMonth = () => {
      setCurrentMonth(moment(currentMonth).subtract(1, "month"));
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
        onClick={() => setCalendarVisibility(!calendarVisibility)}
      >
        <span>{moment(selected).format("DD/MM/YYYY")}</span>
        <LuCalendar />
      </div>
      {calendarVisibility && (
        <div className="ui-date-picker-popup" ref={popup}>
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
