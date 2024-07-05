import React, { useState } from "react";
import CalendarWeek from "../../../../ui/calendars/calendarWeek";
import { useSelector } from "react-redux";
import AppointmentInformationModal from "../appointmentInformationModal";
import { updateAppointment } from "../../../../services/appointments";
import useToastMessage from "../../../../hooks/useToastMessage";

const AppointmentCalendarWeekly = ({ data, getRequiredData }) => {
  const { toastMessage } = useToastMessage();
  const { appointmentTypes } = useSelector((state) => state.enums);
  const [modalData, setModalData] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  const weeklyData = data.map((item) => {
    return {
      ...item,
      label: item.person_name,
      type: appointmentTypes.find(
        (element) => element.id == item?.appointment_type
      )?.tr,
    };
  });

  const handleDayClick = (data) => {
    setModalData(data);
    setModalVisibility(!modalVisibility);
  };

  const confirmUpdateAppointment = async (values) => {
    setModalVisibility(false);
    setModalData(null);
    await updateAppointment(values, () => {
      toastMessage({
        title: "success",
        text: "message_appointment_updated",
        type: "success",
        duration: 3000,
      });
      getRequiredData();
    });
  };

  return (
    <>
      <AppointmentInformationModal
        data={modalData}
        title={"Randevu Detayı"}
        visibility={modalVisibility}
        onCancel={() => {
          setModalVisibility(false);
        }}
        onSave={(values) => confirmUpdateAppointment(values)}
      />
      <CalendarWeek data={weeklyData} onDayClick={handleDayClick} />
    </>
  );
};

export default AppointmentCalendarWeekly;
