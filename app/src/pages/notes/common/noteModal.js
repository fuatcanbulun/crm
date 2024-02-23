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
import FormErrorMessage from "../../../ui/messages/formErrorMessage";
import useValidate from "../../../hooks/useValidate";

const initialFormValues = {
  person_id: "",
  note: "",
  created_by: "",
};

const NoteModal = ({ data, title, onSave, onCancel, visibility, persons }) => {
  const { t } = useTranslation();
  const { validate } = useValidate();

  const { userInfo } = useSelector((state) => state.user);
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});

  const validation = {
    person_id: ["validation_required"],
    note: ["validation_required"],
  };

  useEffect(() => {
    setFormValues(data ? data : initialFormValues);
  }, [data]);

  const handleValidation = (values) => {
    const response = validate(values, validation);
    setFormError(response);
    if (response === true) {
      onSave({ ...values, created_by: userInfo.user_name });
    }
  };

  const personFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("person")} />
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
            {formError.person_id && (
              <FormErrorMessage message={formError.person_id} />
            )}
          </FormField>
        </FormColumn>
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("note")} />
            <TextArea
              id="note"
              value={formValues.note}
              onChange={(val) => setFormValues({ ...formValues, note: val })}
            />
            {formError.note && <FormErrorMessage message={formError.note} />}
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
          onClick: () => handleValidation(formValues),
          icon: <LuCheck />,
        },
      ]}
    />
  );
};

export default NoteModal;
