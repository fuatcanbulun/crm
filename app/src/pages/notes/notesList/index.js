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
import { LuPlus, LuEye, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  addPerson,
  removePersonById,
  getPersons,
} from "../../../services/persons";
import PersonModal from "../common/personModal";
import DatePicker from "../../../ui/inputs/datePicker";

const PersonsList = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { personTypes, genderTypes, cities } = useSelector(
    (state) => state.enums
  );

  const initialTableData = {
    tableId: "persons",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedPerson(selectedData),
    columns: [
      {
        field: "first_name",
        header: t("first_name"),
        dataType: "text",
      },
      {
        field: "last_name",
        header: t("last_name"),
        dataType: "text",
      },
      {
        field: "person_type",
        header: t("person_type"),
        dataType: "dropdown",
        dropDownValues: personTypes.map((item) => {
          console.log("item", item);
          return { ...item, value: item.id, label: item.tr };
        }),
      },
      {
        field: "gender_type",
        header: t("gender_type"),
        dataType: "dropdown",
        dropDownValues: genderTypes.map((item) => {
          return { ...item, value: item.id, label: item.tr };
        }),
      },
      {
        field: "phone1",
        header: t("phone1"),
        dataType: "text",
      },
      {
        field: "city",
        header: t("city"),
        dataType: "dropdown",
        dropDownValues: cities.map((item) => {
          return { ...item, value: item.id, label: item.tr };
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

  const [personModal, setPersonModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);

  useEffect(() => {
    getPersonsData();
  }, []);

  const getPersonsData = async () => {
    setTableData({ ...tableData, data: await getPersons() });
  };

  const confirmAddPerson = async (values) => {
    await addPerson(values, () => {
      setPersonModal(false);
      getPersonsData();
    });
  };

  const confirmDeletePerson = async () => {
    await removePersonById(selectedPerson.id, () => {
      getPersonsData();
    });
  };

  return (
    <PageLayout>
      <PersonModal
        title={t("new_person")}
        visibility={personModal}
        onCancel={() => setPersonModal(false)}
        onSave={(values) => confirmAddPerson(values)}
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
            icon={<LuPlus />}
            onClick={() => setPersonModal(true)}
          />
          {selectedPerson && (
            <>
              <BasicButton
                label={t("detail")}
                icon={<LuEye />}
                onClick={() => navigate(`/persons-detail/${selectedPerson.id}`)}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => confirmDeletePerson()}
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

export default PersonsList;
