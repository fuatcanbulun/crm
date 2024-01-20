import React, { useState } from "react";
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
import { appointmentTypes } from "../../../constants/types";
import DatePicker from "../../../ui/inputs/datePicker";
import TimePicker from "../../../ui/inputs/timePicker";

const AppointmentList = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [appointmentModal, setAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [formValues, setFormValues] = useState({
    isim: "",
    sehir: "ankara",
    ilceler: ["çankaya", "yenimahalle"],
    tarih: "",
    saat: "12:30:00",
    aciklama: "",
  });

  const initialTableData = {
    tableId: "kisiler",
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
        field: "firstName",
        header: t("firstName"),
        dataType: "text",
      },
      {
        field: "lastName",
        header: t("lastName"),
        dataType: "text",
      },
      {
        field: "appointmentType",
        header: t("appointmentType"),
        dataType: "dropdown",
        dropDownValues: appointmentTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "createdBy",
        header: t("createdBy"),
        dataType: "text",
      },
      {
        field: "createdAt",
        header: t("createdAt"),
        dataType: "date",
      },
    ],
    data: [
      {
        id: 1,
        date: "14/01/2024 15:30",
        firstName: "Can",
        lastName: "Yılmaz",
        appointmentType: "hairCare",
        createdBy: "Yeşim Polat",
        createdAt: "14/01/2024 15:30",
      },
    ],
  };

  const appointmentFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("firstName")} />
            <TextInput
              id="firstName"
              value={formValues.firstName}
              onChange={(val) =>
                setFormValues({ ...formValues, firstName: val })
              }
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("lastName")} />
            <TextInput
              id="lastName"
              value={formValues.lastName}
              onChange={(val) =>
                setFormValues({ ...formValues, lastName: val })
              }
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("appointmentType")} />
            <SingleSelectInput
              id="appointmentType"
              options={appointmentTypes}
              onChange={(val) =>
                setFormValues({ ...formValues, appointmentType: val })
              }
              value={formValues.appointmentType}
            />
          </FormField>
        </FormColumn>
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("date")} />
            <DatePicker
              id="date"
              value={formValues.date}
              onChange={(val) => setFormValues({ ...formValues, date: val })}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("time")} />
            <TimePicker
              id="time"
              value={formValues.time}
              onChange={(val) => setFormValues({ ...formValues, time: val })}
            />
          </FormField>
        </FormColumn>
      </FormRow>
    );
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageLayout>
      <FormModal
        title="Yeni Kişi"
        visibility={appointmentModal}
        body={appointmentFormBody()}
        buttons={[
          {
            label: t("save"),
            onClick: () => console.log(formValues),
          },
          { label: t("cancel"), onClick: () => setAppointmentModal(false) },
        ]}
      />
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("appointmentList")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            className="mt10"
            onClick={() => setAppointmentModal(true)}
          />
          {selectedAppointment && (
            <BasicButton
              label={t("detail")}
              className="mt10"
              onClick={() =>
                navigate(`/appointment-detail/${selectedAppointment.id}`)
              }
            />
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
