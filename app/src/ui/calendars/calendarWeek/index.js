import React, { useState } from "react";
import "./style.css";
import moment from "moment";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const CalendarWeek = ({ className, children }) => {
  const generateHourArray = () => {
    const startHour = 8; // Başlangıç saati: 08:00
    const endHour = 20; // Bitiş saati: 20:00

    const hours = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      const timeSlot = `${formattedHour}:00`;
      hours.push(timeSlot);
    }

    return hours;
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("week")
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(moment().endOf("week"));

  const Calendar = () => {
    const renderHeader = () => {
      return (
        <div className="ui-calendar-week-header">
          <button className="ui-calendar-week-header-left" onClick={prevWeek}>
            <LuMoveLeft />
          </button>
          <span className="ui-calendar-week-header-title">
            {`${currentWeekStart.format("MMMM D")} - ${currentWeekEnd.format(
              "MMMM D"
            )}`}
          </span>
          <button className="ui-calendar-week-header-right" onClick={nextWeek}>
            <LuMoveRight />
          </button>
        </div>
      );
    };

    const renderDays = () => {
      const daysOfWeek = moment.weekdaysShort();

      return (
        <div className="ui-calendar-week-header-days">
          <div className="ui-calendar-week-header-days-hours"></div>
          <div className="ui-calendar-week-header-days-content">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="ui-calendar-week-header-day">
                <div className="ui-calendar-week-header-day-date">
                  {currentWeekStart
                    .clone()
                    .add(index, "days")
                    .format("DD MMMM")}
                </div>
                <div className="ui-calendar-week-header-day-name">
                  {currentWeekStart.clone().add(index, "days").format("dddd")}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const renderCells = () => {
      const days = [];
      let day = moment(currentWeekStart);

      for (let i = 0; i < 7; i++) {
        days.push(
          <div
            key={day.format("YYYY-MM-DD")}
            className={`ui-calendar-week-day`}
          >
            <div className="ui-calendar-week-day-body"></div>
          </div>
        );
        day.add(1, "day");
      }

      return (
        <div className="ui-calendar-week-body">
          <div className="ui-calendar-week-body-hours">
            {generateHourArray().map((hour) => (
              <div className="ui-calendar-week-hour">{hour}</div>
            ))}
          </div>
          <div className="ui-calendar-week-body-content">{days}</div>
        </div>
      );
    };

    const nextWeek = () => {
      setCurrentWeekStart(moment(currentWeekStart).add(1, "week"));
      setCurrentWeekEnd(moment(currentWeekEnd).add(1, "week"));
    };

    const prevWeek = () => {
      setCurrentWeekStart(moment(currentWeekStart).subtract(1, "week"));
      setCurrentWeekEnd(moment(currentWeekEnd).subtract(1, "week"));
    };

    return (
      <div className="ui-calendar-week">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    );
  };

  return <Calendar />;
};

export default CalendarWeek;
