import React, { useEffect, useState } from "react";
import TextInput from "../../ui/inputs/textInput";
import SingleSelectInput from "../../ui/inputs/singleSelectInput";
import MultiSelectInput from "../../ui/inputs/multiSelectInput";
import DatePicker from "../../ui/inputs/datePicker";
import TimePicker from "../../ui/inputs/timePicker";
import TextArea from "../../ui/inputs/textArea";
import BasicButton from "../../ui/buttons/basicButton";
import PageRow from "../../ui/rows/pageRow";
import PageColumn from "../../ui/columns/pageColumn";
import FormLabel from "../../ui/labels/formLabel";
import TitleLabel from "../../ui/labels/titleLabel";
import PageLayout from "../../ui/layouts/pageLayout";
import Table from "../../ui/table";
import FormModal from "../../ui/modals/formModal";
import FormRow from "../../ui/rows/formRow";
import FormColumn from "../../ui/columns/formColumn";
import FormField from "../../ui/fields/formField";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Persons = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [newPersonModal, setNewPersonModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

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
    getSelectionValue: (selectedData) => setSelectedPerson(selectedData),
    columns: [
      {
        field: "firstName",
        header: "firstName",
        dataType: "text",
      },
      {
        field: "lastName",
        header: "lastName",
        dataType: "text",
      },
      {
        field: "personType",
        header: "personType",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "Customer",
            value: "customer",
          },
          {
            label: "Other",
            value: "other",
          },
        ],
      },
      {
        field: "gender",
        header: "gender",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
        ],
      },
      {
        field: "phone",
        header: "phone",
        dataType: "text",
      },
      {
        field: "createdAt",
        header: "createdAt",
        dataType: "date",
      },
    ],
    data: [
      {
        id: 1,
        firstName: "Can",
        lastName: "Yılmaz",
        personType: "customer",
        gender: "male",
        phone: "0555 555 5555",
        createdAt: "14/01/2024 15:30",
      },
      {
        id: 2,
        firstName: "Aslı",
        lastName: "Bakır",
        personType: "customer",
        gender: "male",
        phone: "0555 555 5555",
        createdAt: "14/01/2024 15:30",
      },
      {
        id: 3,
        firstName: "Sevim",
        lastName: "Doğan",
        personType: "customer",
        gender: "male",
        phone: "0555 555 5555",
        createdAt: "14/01/2024 15:30",
      },
      {
        id: 4,
        firstName: "Mustafa",
        lastName: "Sarı",
        personType: "customer",
        gender: "male",
        phone: "0555 555 5555",
        createdAt: "14/01/2024 15:30",
      },
    ],
  };

  const sehirler = [
    {
      label: "Ankara",
      value: "ankara",
    },
    {
      label: "İstanbul",
      value: "istanbul",
    },
  ];

  const ilceler = [
    {
      label: "Çankaya",
      value: "cankaya",
    },
    {
      label: "Etimesgut",
      value: "etimesgut",
    },
  ];

  const newPersonFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("firstName")} />
            <TextInput
              value={formValues.isim}
              onChange={(val) => setFormValues({ ...formValues, isim: val })}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label="Form Label" />
            <SingleSelectInput
              options={sehirler}
              onChange={(val) => setFormValues({ ...formValues, sehir: val })}
              value={formValues.sehir}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label="Form Label" />
            <MultiSelectInput
              options={ilceler}
              onChange={(val) => setFormValues({ ...formValues, ilceler: val })}
              value={formValues.ilceler}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label="Form Label" />
            <DatePicker
              value={formValues.tarih}
              onChange={(val) => setFormValues({ ...formValues, tarih: val })}
            />
          </FormField>
        </FormColumn>
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label="Form Label" />
            <TimePicker
              onChange={(val) => setFormValues({ ...formValues, saat: val })}
              value={formValues.saat}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label="Form Label" />
            <TextArea
              value={formValues.aciklama}
              onChange={(val) =>
                setFormValues({ ...formValues, aciklama: val })
              }
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
        visibility={newPersonModal}
        body={newPersonFormBody()}
        buttons={[
          {
            label: "Kaydet",
            onClick: () => console.log(formValues),
          },
          { label: "Vazgeç", onClick: () => setNewPersonModal(false) },
        ]}
      />
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Kişiler" />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label="Yeni Kayıt"
            className="mt10"
            onClick={() => setNewPersonModal(true)}
          />
          {selectedPerson && (
            <BasicButton
              label="Detay"
              className="mt10"
              onClick={() => navigate(`/persons-detail/${selectedPerson.id}`)}
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

export default Persons;
