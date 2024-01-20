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
import { personTypes, genderTypes, cityTypes } from "../../../constants/types";
import { TranslateType } from "../../../utils/translateType";

const PersonsList = ({}) => {
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
        header: t("firstName"),
        dataType: "text",
      },
      {
        field: "lastName",
        header: t("lastName"),
        dataType: "text",
      },
      {
        field: "personType",
        header: t("personType"),
        dataType: "dropdown",
        dropDownValues: personTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "gender",
        header: t("gender"),
        dataType: "dropdown",
        dropDownValues: genderTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "phone1",
        header: t("phone1"),
        dataType: "text",
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
        firstName: "Can",
        lastName: "Yılmaz",
        personType: "customer",
        gender: "male",
        phone1: "0555 555 5555",
        createdBy: "Yeşim Polat",
        createdAt: "14/01/2024 15:30",
      },
      {
        id: 2,
        firstName: "Aslı",
        lastName: "Bakır",
        personType: "customer",
        gender: "male",
        phone1: "0555 555 5555",
        createdBy: "Yeşim Polat",
        createdAt: "14/01/2024 15:30",
      },
      {
        id: 3,
        firstName: "Sevim",
        lastName: "Doğan",
        personType: "customer",
        gender: "male",
        phone1: "0555 555 5555",
        createdBy: "Yeşim Polat",
        createdAt: "14/01/2024 15:30",
      },
      {
        id: 4,
        firstName: "Mustafa",
        lastName: "Sarı",
        personType: "customer",
        gender: "male",
        phone1: "0555 555 5555",
        createdBy: "Yeşim Polat",
        createdAt: "14/01/2024 15:30",
      },
    ],
  };

  const newPersonFormBody = () => {
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
            <FormLabel label={t("personType")} />
            <SingleSelectInput
              options={personTypes}
              onChange={(val) =>
                setFormValues({ ...formValues, personType: val })
              }
              value={formValues.personType}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("gender")} />
            <SingleSelectInput
              options={genderTypes}
              onChange={(val) => setFormValues({ ...formValues, gender: val })}
              value={formValues.gender}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("city")} />
            <SingleSelectInput
              options={cityTypes}
              onChange={(val) => setFormValues({ ...formValues, city: val })}
              value={formValues.city}
            />
          </FormField>
        </FormColumn>
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("phone1")} />
            <TextInput
              id="phone1"
              value={formValues.phone1}
              onChange={(val) => setFormValues({ ...formValues, phone1: val })}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("phone2")} />
            <TextInput
              id="phone2"
              value={formValues.phone2}
              onChange={(val) => setFormValues({ ...formValues, phone2: val })}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("email")} />
            <TextInput
              id="email"
              value={formValues.email}
              onChange={(val) => setFormValues({ ...formValues, email: val })}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("address")} />
            <TextArea
              id="address"
              value={formValues.address}
              onChange={(val) => setFormValues({ ...formValues, address: val })}
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
            label: t("save"),
            onClick: () => console.log(formValues),
          },
          { label: t("cancel"), onClick: () => setNewPersonModal(false) },
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
            label={t("new")}
            className="mt10"
            onClick={() => setNewPersonModal(true)}
          />
          {selectedPerson && (
            <BasicButton
              label={t("detail")}
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

export default PersonsList;
