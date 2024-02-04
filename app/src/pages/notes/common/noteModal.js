import React, { useEffect, useState } from "react";
import TextInput from "../../../ui/inputs/textInput";
import DatePicker from "../../../ui/inputs/datePicker";
import SingleSelectInput from "../../../ui/inputs/singleSelectInput";
import TextArea from "../../../ui/inputs/textArea";
import FormLabel from "../../../ui/labels/formLabel";
import FormModal from "../../../ui/modals/formModal";
import FormRow from "../../../ui/rows/formRow";
import FormColumn from "../../../ui/columns/formColumn";
import FormField from "../../../ui/fields/formField";
import { useTranslation } from "react-i18next";
import { LuCheck } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const initialFormValues = {
  person_id: "",
  note: "",
};

const NoteModal = ({ data, title, onSave, onCancel, visibility, persons }) => {
  const { t } = useTranslation();
  const { personTypes, genderTypes, cities } = useSelector(
    (state) => state.enums
  );

  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  useEffect(() => {
    setFormValues(data ? data : initialFormValues);
  }, [data]);

  const personFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("person_id")} />
            <SingleSelectInput
              id="person_id"
              options={persons.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: item.first_name + " " + item.last_name,
                };
              })}
              onChange={(val) => {
                setFormValues({
                  ...formValues,
                  person_id: val,
                });
              }}
              value={formValues.person_id}
            />
          </FormField>
        </FormColumn>
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("note")} />
            <TextArea
              id="note"
              value={formValues.note}
              onChange={(val) => setFormValues({ ...formValues, note: val })}
            />
          </FormField>
        </FormColumn>
      </FormRow>
    );
  };

  return (
    <FormModal
      title={title}
      visibility={visibility}
      close={() => onCancel()}
      body={personFormBody()}
      buttons={[
        {
          label: t("cancel"),
          onClick: () => onCancel(),
          icon: <AiOutlineClose />,
        },
        {
          label: t("save"),
          onClick: () => onSave(formValues),
          icon: <LuCheck />,
        },
      ]}
    />
  );
};

export default NoteModal;
