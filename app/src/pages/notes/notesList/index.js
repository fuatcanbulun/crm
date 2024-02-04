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

import NoteModal from "../common/noteModal";
import DatePicker from "../../../ui/inputs/datePicker";
import { getPersons } from "../../../services/persons";
import { addNote, getNotes } from "../../../services/notes";

const NotesList = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialTableData = {
    tableId: "persons",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedNote(selectedData),
    columns: [
      {
        field: "created_at",
        header: t("created_at"),
        dataType: "date",
      },
      {
        field: "person_name",
        header: t("person"),
        dataType: "text",
      },
      {
        field: "note",
        header: t("note"),
        dataType: "text",
      },
      {
        field: "created_by",
        header: t("created_by"),
        dataType: "text",
      },
    ],
    data: [],
  };

  const [noteModal, setNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    const [notesData, personsData] = await Promise.all([
      getNotes(),
      getPersons(),
    ]);

    const newData = [];
    for (const item of notesData) {
      const matchedData = personsData.find(
        (person) => person.id == item.person_id
      );
      newData.push({
        ...item,
        person_name: matchedData.first_name + " " + matchedData.last_name,
      });
    }

    setTableData({ ...tableData, data: newData });
    setPersons(personsData);
  };

  const confirmAddNote = async (values) => {
    await addNote(values, () => {
      setNoteModal(false);
      getRequiredData();
    });
  };

  const confirmDeleteNote = async () => {
    // await removePersonById(selectedNote.id, () => {
    //   getPersonsData();
    // });
  };

  return (
    <PageLayout>
      <NoteModal
        title={t("new_note")}
        visibility={noteModal}
        onCancel={() => setNoteModal(false)}
        onSave={(values) => confirmAddNote(values)}
        persons={persons}
      />
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("notes")} />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            icon={<LuPlus />}
            onClick={() => setNoteModal(true)}
          />
          {selectedNote && (
            <>
              <BasicButton
                label={t("edit")}
                icon={<LuEye />}
                //onClick={() => navigate(`/persons-detail/${selectedNote.id}`)}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => confirmDeleteNote()}
              />
            </>
          )}
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle={t("notes")}
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default NotesList;
