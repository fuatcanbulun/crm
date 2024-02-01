import React, { useState } from "react";
import "./style.css";
import moment from "moment";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const CalendarMonth = ({ className, children, data }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const Calendar = () => {
    const renderHeader = () => {
      return (
        <div className="ui-calendar-month-header">
          <button className="ui-calendar-month-header-left" onClick={prevMonth}>
            <LuMoveLeft />
          </button>
          <span className="ui-calendar-month-header-title">
            {currentMonth.format("MMMM YYYY")}
          </span>
          <button
            className="ui-calendar-month-header-right"
            onClick={nextMonth}
          >
            <LuMoveRight />
          </button>
        </div>
      );
    };

    const renderDays = () => {
      const daysOfWeek = moment.weekdaysShort();
      const firstDayOfWeek = moment().startOf("week").isoWeekday(1);

      return (
        <div className="ui-calendar-month-header-days">
          {daysOfWeek.map((day, index) => (
            <span key={index} className="ui-calendar-month-header-day">
              {firstDayOfWeek.clone().add(index, "days").format("dddd")}
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
              className={`ui-calendar-month-day ${
                isSameMonth(currentDay, monthStart)
                  ? ""
                  : "ui-calendar-month-disabled-days"
              }`}
            >
              <span className="ui-calendar-month-day-label">
                {currentDay.format("D")}
              </span>
              <div className="ui-calendar-month-day-body">
                <>
                  {data
                    .filter(
                      (data) => data.date == currentDay.format("YYYY-MM-DD")
                    )
                    .map((data) => (
                      <div className="ui-calendar-month-day-body-item">
                        <span className="ui-calendar-month-day-body-item-count">
                          {data.count}
                        </span>
                        <span className="ui-calendar-month-day-body-item-label">
                          {data.label}
                        </span>
                      </div>
                    ))}
                </>
              </div>
            </div>
          );
          day.add(1, "day");
        }
        rows.push(
          <div key={day.format("YYYY-MM-DD")} className="ui-calendar-month-row">
            {days}
          </div>
        );
        days = [];
      }

      return <div className="ui-calendar-month-body">{rows}</div>;
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
      <div className="ui-calendar-month">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    );
  };

  return <Calendar />;
};

export default CalendarMonth;
