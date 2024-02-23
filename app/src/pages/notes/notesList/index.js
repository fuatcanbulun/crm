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
import { LuCheck, LuPlus, LuEye, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import NoteModal from "../common/noteModal";
import ConfirmModal from "../../../ui/modals/confirmModal";
import { getPersons } from "../../../services/persons";
import {
  addNote,
  getNotes,
  removeNoteById,
  updateNote,
} from "../../../services/notes";
import useToastMessage from "../../../hooks/useToastMessage";

const NotesList = ({}) => {
  const { toastMessage } = useToastMessage();
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
  const [noteModalData, setNoteModalData] = useState(null);
  const [noteDeleteModal, setNoteDeleteModal] = useState(false);
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
      let person_name = "";
      if (matchedData) {
        person_name = matchedData.first_name + " " + matchedData.last_name;
      }
      newData.push({ ...item, person_name: person_name });
    }

    setTableData({ ...tableData, data: newData });
    setPersons(personsData);
  };

  const confirmAddNote = async (values) => {
    setNoteModal(false);
    await addNote(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_note_created",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmUpdateNote = async (values) => {
    setNoteModal(false);
    setNoteModalData(null);
    await updateNote(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_note_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteNote = async () => {
    setNoteDeleteModal(false);
    await removeNoteById(selectedNote.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_note_deleted",
        type: "success",
        duration: 3000,
      });
    });
  };

  useEffect(() => {
    if (noteModalData) {
      setNoteModal(true);
    }
  }, [noteModalData]);

  return (
    <PageLayout>
      <NoteModal
        data={noteModalData}
        title={t("new_note")}
        visibility={noteModal}
        onCancel={() => {
          setNoteModal(false);
          setNoteModalData(null);
        }}
        onSave={(values) =>
          noteModalData ? confirmUpdateNote(values) : confirmAddNote(values)
        }
        persons={persons}
      />
      <ConfirmModal
        title={t("delete_note")}
        visibility={noteDeleteModal}
        close={() => setNoteDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setNoteDeleteModal(false),
            icon: <AiOutlineClose />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteNote(),
            icon: <LuCheck />,
          },
        ]}
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
                onClick={() => {
                  setNoteModalData(selectedNote);
                }}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => setNoteDeleteModal(true)}
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
