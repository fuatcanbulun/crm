import React, { useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import Tabs from "../../../ui/tabs";

import PageLayout from "../../../ui/layouts/pageLayout";
import CalendarMonth from "../../../ui/calendars/calendarMonth";
import CalendarWeek from "../../../ui/calendars/calendarWeek";
import { useTranslation } from "react-i18next";

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
    {
      icon: "",
      label: t("daily"),
      value: "daily",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabsOptions[0].value);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("appointmentCalendar")} />
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

      <PageRow className="col-12">
        <PageColumn className="col-12">
          {selectedTab == "monthly" && <CalendarMonth />}
          {selectedTab == "weekly" && <CalendarWeek />}
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AppointmentCalendar;
