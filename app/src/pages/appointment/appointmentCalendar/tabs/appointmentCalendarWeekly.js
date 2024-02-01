import React, { useState } from "react";
import CalendarWeek from "../../../../ui/calendars/calendarWeek";
import { useSelector } from "react-redux";

const AppointmentCalendarWeekly = ({ data }) => {
  const { appointmentTypes } = useSelector((state) => state.enums);

  console.log("data", data);

  const weeklyData = data.map((item) => {
    return {
      ...item,
      label: item.person_name,
      type: appointmentTypes.find(
        (element) => element.id == item?.appointment_type
      )?.tr,
    };
  });

  console.log("weeklyData", weeklyData);

  return <CalendarWeek data={weeklyData} />;
};

export default AppointmentCalendarWeekly;
