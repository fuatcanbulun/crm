import React, { useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import Tabs from "../../../ui/tabs";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import PersonsDetailGeneral from "./tabs/personsDetailGeneral";
import PersonsDetailNotes from "./tabs/personsDetailNotes";
import PersonsDetailAccounting from "./tabs/personsDetailAccounting";
import PersonsDetailAppointments from "./tabs/personsDetailAppointments";
import PersonsDetailCalls from "./tabs/personsDetailCalls";
import { useTranslation } from "react-i18next";

const PersonsDetail = ({}) => {
  const { t } = useTranslation();
  const tabsOptions = [
    {
      icon: "",
      label: t("general"),
      value: "general",
    },
    {
      icon: "",
      label: t("notes"),
      value: "notes",
    },
    {
      icon: "",
      label: t("appointments"),
      value: "appointments",
    },
    {
      icon: "",
      label: t("calls"),
      value: "calls",
    },
    {
      icon: "",
      label: t("accounting"),
      value: "accounting",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabsOptions[0].value);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Kişiler" />
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

      {selectedTab == "general" && <PersonsDetailGeneral />}
      {selectedTab == "notes" && <PersonsDetailNotes />}
      {selectedTab == "appointments" && <PersonsDetailAppointments />}
      {selectedTab == "calls" && <PersonsDetailCalls />}
      {selectedTab == "accounting" && <PersonsDetailAccounting />}
    </PageLayout>
  );
};

export default PersonsDetail;
