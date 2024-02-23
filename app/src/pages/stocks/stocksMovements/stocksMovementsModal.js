import React, { useEffect, useState } from "react";
import TextInput from "../../../ui/inputs/textInput";
import PhoneInput from "../../../ui/inputs/phoneInput";
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
  label: "",
};

const StocksMovementsModal = ({
  data,
  title,
  onSave,
  onCancel,
  visibility,
}) => {
  const { t } = useTranslation();
  const { movementTypes } = useSelector((state) => state.enums);
  const { userInfo } = useSelector((state) => state.user);
  const { validate } = useValidate();
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});
  const validation = {
    label: [
      "validation_min_2_characters",
      "validation_max_50_characters",
      "validation_required",
    ],
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

  const movementFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("name")} />
            <TextInput
              id="label"
              value={formValues.label}
              onChange={(val) => setFormValues({ ...formValues, label: val })}
            />
            {formError.label && <FormErrorMessage message={formError.label} />}
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
      body={movementFormBody()}
      buttons={[
        {
          label: t("cancel"),
          onClick: () => onCancel(),
          icon: <AiOutlineClose />,
        },
        {
          label: t("save"),
          onClick: () => {
            handleValidation(formValues);
          },
          icon: <LuCheck />,
        },
      ]}
    />
  );
};

export default StocksMovementsModal;
