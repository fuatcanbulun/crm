import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const CalendarWeek = ({ data, onDayClick }) => {
  const [visibleTypes, setVisibleTypes] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("week")
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(moment().endOf("week"));

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

  const types = {};
  for (const item of data) {
    types[item.type] = types[item.item] > 0 ? types[item.item] + 1 : 1;
  }

  const typeMapper = { ...types };
  let typeIndex = 0;
  for (const property in typeMapper) {
    typeIndex = typeIndex + 1;
    typeMapper[property] = "ui-type" + typeIndex;
  }

  const statusMapper = {
    "d2347269-ea5c-4c3a-b5e6-5f98201bf8af": "ui-type13",
    "bfdc2256-53cc-4e3b-b103-40a752bdf319": "ui-type12",
    "352b2f2e-187e-4493-9b55-c54df4290bb9": "ui-type11",
  };

  useEffect(() => {
    const visibleTypesData = [];
    for (const property in types) {
      visibleTypesData.push(property);
    }
    setVisibleTypes(visibleTypesData);
  }, []);

  const toggleType = (val) => {
    let newData = [...visibleTypes];
    if (visibleTypes.includes(val)) {
      newData = visibleTypes.filter((item) => item !== val);
    } else {
      newData.push(val);
    }
    setVisibleTypes(newData);
  };

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

    const renderFilters = () => {
      return (
        <div className="ui-calendar-week-filters">
          {Object.keys(types).map((item, key) => (
            <div
              className={`ui-calendar-week-filter ${typeMapper[item]} ${
                visibleTypes.includes(item) ? "ui-opaque" : "ui-transparent"
              }`}
              onClick={() => toggleType(item)}
            >
              {item}
            </div>
          ))}
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
            <div className="ui-calendar-week-day-body">
              <div className="ui-calendar-week-day-body-content">
                {data
                  .filter((item) => item.date === day.format("YYYY-MM-DD"))
                  .map((item) => (
                    <>{renderBodyItem(item)}</>
                  ))}
              </div>
              <div className="ui-calendar-week-day-body-rows">
                {generateHourArray().map((hour) => (
                  <div className="ui-calendar-week-day-body-row"></div>
                ))}
              </div>
            </div>
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

    const renderBodyItem = (data) => {
      console.log("renderBodyItem", data);

      const sampleStart = "08:00";

      const dayStart = moment(sampleStart, "HH:mm");
      const itemStart = moment(data.start_time, "HH:mm");
      const itemEnd = moment(data.end_time, "HH:mm");

      const itemPosition = itemStart.diff(dayStart, "minutes");
      const itemHeight = itemEnd.diff(itemStart, "minutes");

      return (
        <div
          className={`ui-calendar-week-day-body-item ${
            statusMapper[data.appointment_status_type]
          } ${typeMapper[data.type]} ${
            visibleTypes.includes(data.type) ? "ui-opaque" : "ui-hidden"
          }`}
          style={{ top: itemPosition, height: itemHeight }}
          onClick={() => onDayClick(data)}
        >
          <div className="ui-calendar-week-day-body-item-title">
            {data.label}
          </div>
          <div className="ui-calendar-week-day-body-item-subtitle">
            {data.type}
          </div>
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
        {renderFilters()}
        {renderDays()}
        {renderCells()}
      </div>
    );
  };

  return <Calendar />;
};

export default CalendarWeek;
