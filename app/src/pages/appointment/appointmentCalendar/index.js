import React, { useEffect, useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import Tabs from "../../../ui/tabs";
import PageLayout from "../../../ui/layouts/pageLayout";
import CalendarMonth from "../../../ui/calendars/calendarMonth";
import CalendarWeek from "../../../ui/calendars/calendarWeek";
import { useTranslation } from "react-i18next";
import AppointmentCalendarMonthly from "./tabs/appointmentCalendarMonthly";
import AppointmentCalendarWeekly from "./tabs/appointmentCalendarWeekly";
import { getAppointments } from "../../../services/appointments";
import { getPersons } from "../../../services/persons";

const AppointmentCalendar = ({}) => {
  const { t } = useTranslation();
  const tabsOptions = [
    {
      icon: "",
      label: t("monthly"),
      value: "monthly",
    },
    {
      icon: "",
      label: t("weekly"),
      value: "weekly",
    },
    // {
    //   icon: "",
    //   label: t("daily"),
    //   value: "daily",
    // },
  ];
  const [selectedTab, setSelectedTab] = useState(tabsOptions[0].value);
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    const [appointmentsData, personsData] = await Promise.all([
      getAppointments(),
      getPersons(),
    ]);

    const newData = [];
    for (const item of appointmentsData) {
      const matchedData = personsData.find(
        (person) => person.id == item.person_id
      );
      let person_name = "";
      if (matchedData) {
        person_name = matchedData.first_name + " " + matchedData.last_name;
      }
      newData.push({ ...item, person_name: person_name });
    }
    setAppointmentData(newData);
  };

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("appointment_calendar")} />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Tabs
            className="mt10"
            options={tabsOptions}
            value={selectedTab}
            onChange={(val) => setSelectedTab(val)}
          />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12 mt20">
        <PageColumn className="col-12">
          {selectedTab == "monthly" && (
            <AppointmentCalendarMonthly data={appointmentData} />
          )}
          {selectedTab == "weekly" && (
            <AppointmentCalendarWeekly data={appointmentData} />
          )}
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AppointmentCalendar;
