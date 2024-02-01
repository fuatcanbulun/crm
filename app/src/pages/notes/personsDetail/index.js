import React, { useState, useEffect } from "react";
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
import { getPersonById } from "../../../services/persons";
import { useParams } from "react-router-dom";
import { getAppointmentsByPersonId } from "../../../services/appointments";

const PersonsDetail = ({}) => {
  const { t } = useTranslation();
  const [personGeneralData, setPersonGeneralData] = useState(null);
  const [personNotesData, setPersonNotesData] = useState(null);
  const [personAppointmentsData, setPersonAppointmentsData] = useState(null);
  const [personAccounintingsData, setPersonAccountingsData] = useState(null);
  const [personCallsData, setPersonCallsData] = useState(null);

  const tabsOptions = [
    {
      icon: "",
      label: t("general"),
      value: "general",
    },
    {
      icon: "",
      label: t("appointments"),
      value: "appointments",
    },
    {
      icon: "",
      label: t("notes"),
      value: "notes",
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
  const { person_id } = useParams();

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    const [generalData, appointmentsData] = await Promise.all([
      getPersonById(person_id),
      getAppointmentsByPersonId(person_id),
    ]);

    setPersonGeneralData(generalData);
    setPersonAppointmentsData(appointmentsData);
  };

  const [selectedTab, setSelectedTab] = useState(tabsOptions[0].value);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel
            label={
              personGeneralData?.first_name + " " + personGeneralData?.last_name
            }
          />
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

      {selectedTab == "general" && (
        <PersonsDetailGeneral
          data={personGeneralData}
          getRequiredData={getRequiredData}
        />
      )}
      {selectedTab == "notes" && <PersonsDetailNotes />}
      {selectedTab == "appointments" && (
        <PersonsDetailAppointments
          data={personAppointmentsData}
          getRequiredData={getRequiredData}
        />
      )}
      {selectedTab == "calls" && <PersonsDetailCalls />}
      {selectedTab == "accounting" && <PersonsDetailAccounting />}
    </PageLayout>
  );
};

export default PersonsDetail;
