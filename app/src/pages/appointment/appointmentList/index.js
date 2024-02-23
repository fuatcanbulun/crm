import React, { useEffect, useState } from "react";
import BasicButton from "../../../ui/buttons/basicButton";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import Table from "../../../ui/table";
import { useTranslation } from "react-i18next";

import {
  getAppointments,
  updateAppointment,
  addAppointment,
  removeAppointmentById,
} from "../../../services/appointments";
import { useSelector } from "react-redux";
import { LuCheck, LuPlus, LuPen, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

import AppointmentModal from "../common/appointmentModal";
import { getPersons } from "../../../services/persons";
import useToastMessage from "../../../hooks/useToastMessage";
import ConfirmModal from "../../../ui/modals/confirmModal";

const AppointmentList = ({}) => {
  const { toastMessage } = useToastMessage();
  const { t } = useTranslation();
  const { appointmentTypes } = useSelector((state) => state.enums);
  const [persons, setPersons] = useState([]);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [appointmentModalData, setAppointmentModalData] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentDeleteModal, setAppointmentDeleteModal] = useState(false);

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
    if (appointmentTypes.length > 0) {
      getRequiredData();
    }
  }, [appointmentTypes]);

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

    setPersons(personsData);
    setTableData({ ...initialTableData, data: newData });
  };

  const confirmAddAppointment = async (values) => {
    setAppointmentModal(false);
    await addAppointment(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_appointment_created",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmUpdateAppointment = async (values) => {
    setAppointmentModal(false);
    setAppointmentModalData(null);
    await updateAppointment(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_appointment_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteAppointment = async () => {
    setAppointmentDeleteModal(false);
    await removeAppointmentById(selectedAppointment.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_appointment_deleted",
        type: "success",
        duration: 3000,
      });
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
        onCancel={() => {
          setAppointmentModal(false);
          setAppointmentModalData(null);
        }}
        onSave={(values) =>
          appointmentModalData
            ? confirmUpdateAppointment(values)
            : confirmAddAppointment(values)
        }
        persons={persons}
      />
      <ConfirmModal
        title={t("delete_appointment")}
        visibility={appointmentDeleteModal}
        close={() => setAppointmentDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setAppointmentDeleteModal(false),
            icon: <AiOutlineClose />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteAppointment(),
            icon: <LuCheck />,
          },
        ]}
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
                onClick={() => setAppointmentDeleteModal(true)}
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
