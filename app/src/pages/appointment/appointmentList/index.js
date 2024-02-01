import React, { useEffect, useState } from "react";
import TextInput from "../../../ui/inputs/textInput";
import SingleSelectInput from "../../../ui/inputs/singleSelectInput";
import TextArea from "../../../ui/inputs/textArea";
import BasicButton from "../../../ui/buttons/basicButton";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import FormLabel from "../../../ui/labels/formLabel";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import Table from "../../../ui/table";
import FormModal from "../../../ui/modals/formModal";
import FormRow from "../../../ui/rows/formRow";
import FormColumn from "../../../ui/columns/formColumn";
import FormField from "../../../ui/fields/formField";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../ui/inputs/datePicker";
import TimePicker from "../../../ui/inputs/timePicker";
import {
  getAppointments,
  updateAppointment,
  addAppointment,
  removeAppointmentById,
} from "../../../services/appointments";
import { useSelector } from "react-redux";
import { LuPlus, LuPen, LuTrash } from "react-icons/lu";
import AppointmentModal from "../common/appointmentModal";
import { getPersons } from "../../../services/persons";
import { set } from "ol/transform";

const AppointmentList = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { appointmentTypes } = useSelector((state) => state.enums);
  const [persons, setPersons] = useState([]);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [appointmentModalData, setAppointmentModalData] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const initialTableData = {
    tableId: "appointments",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedAppointment(selectedData),
    columns: [
      {
        field: "date",
        header: t("date"),
        dataType: "date",
      },
      {
        field: "start_time",
        header: t("start_time"),
        dataType: "text",
      },
      {
        field: "end_time",
        header: t("end_time"),
        dataType: "text",
      },
      {
        field: "person_name",
        header: t("person_name"),
        dataType: "text",
      },
      {
        field: "appointment_type",
        header: t("appointment_type"),
        dataType: "dropdown",
        dropDownValues: appointmentTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "created_by",
        header: t("created_by"),
        dataType: "text",
      },
      {
        field: "created_at",
        header: t("created_at"),
        dataType: "date",
      },
    ],
    data: [],
  };

  const [tableData, setTableData] = useState(initialTableData);

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    const [appointmentsData, personsData] = await Promise.all([
      getAppointments(),
      getPersons(),
    ]);

    console.log("appointmentsData", appointmentsData);
    console.log("personsData", personsData);

    const newData = [];
    for (const item of appointmentsData) {
      const matchedData = personsData.find(
        (person) => person.id == item.person_id
      );
      newData.push({
        ...item,
        person_name: matchedData.first_name + " " + matchedData.last_name,
      });
    }
    setPersons(personsData);
    setTableData({ ...tableData, data: newData });
  };

  const confirmAddAppointment = async (values) => {
    await addAppointment(values, () => {
      setAppointmentModal(false);
      getRequiredData();
    });
  };

  const confirmUpdateAppointment = async (values) => {
    await updateAppointment(values, () => {
      setAppointmentModal(false);
      setAppointmentModalData(null);
      getRequiredData();
    });
  };

  const confirmDeleteAppointment = async () => {
    await removeAppointmentById(selectedAppointment.id, () => {
      getRequiredData();
    });
  };

  useEffect(() => {
    if (appointmentModalData) {
      setAppointmentModal(true);
    }
  }, [appointmentModalData]);

  return (
    <PageLayout>
      <AppointmentModal
        data={appointmentModalData}
        title={
          appointmentModalData ? t("edit_appointment") : t("new_appointment")
        }
        visibility={appointmentModal}
        onCancel={() => setAppointmentModal(false)}
        onSave={(values) =>
          appointmentModalData
            ? confirmUpdateAppointment(values)
            : confirmAddAppointment(values)
        }
        persons={persons}
      />

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("appointment_list")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            icon={<LuPlus />}
            onClick={() => setAppointmentModal(true)}
          />
          {selectedAppointment && (
            <>
              <BasicButton
                label={t("edit")}
                icon={<LuPen />}
                onClick={() => {
                  setAppointmentModalData(selectedAppointment);
                }}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => confirmDeleteAppointment()}
              />
            </>
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="Kişi Listesi"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AppointmentList;
