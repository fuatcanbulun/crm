import React, { useState } from "react";
import CalendarMonth from "../../../../ui/calendars/calendarMonth";
import { useSelector } from "react-redux";

const AppointmentCalendarMonthly = ({ data }) => {
  const { appointmentTypes } = useSelector((state) => state.enums);

  const monthlyData = [];

  for (const item of data) {
    const matchedItem = monthlyData.find(
      (element) =>
        element.date == item.date &&
        element.appointment_type == item.appointment_type
    );

    if (matchedItem) {
      matchedItem.count = matchedItem.count + 1;
    } else {
      monthlyData.push({
        date: item.date,
        appointment_type: item.appointment_type,
        label: appointmentTypes.find(
          (element) => element.id == item?.appointment_type
        )?.tr,
        count: 1,
      });
    }
  }

  return <CalendarMonth data={monthlyData} />;
};

export default AppointmentCalendarMonthly;
