import React, { useEffect, useState } from "react";
import TextInput from "../../../ui/inputs/textInput";
import DatePicker from "../../../ui/inputs/datePicker";
import SingleSelectInput from "../../../ui/inputs/singleSelectInput";
import TimePicker from "../../../ui/inputs/timePicker";
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
  appointment_type: "",
  appointment_status_type: "352b2f2e-187e-4493-9b55-c54df4290bb9",
  date: "",
  start_time: "",
  end_time: "",
  created_by: "",
};

const AppointmentModal = ({
  data,
  title,
  onSave,
  onCancel,
  visibility,
  persons,
  isEdit,
}) => {
  const { t } = useTranslation();
  const { appointmentTypes, appointmentStatusTypes } = useSelector(
    (state) => state.enums
  );
  const { userInfo } = useSelector((state) => state.user);

  const { validate } = useValidate();
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});

  const validation = {
    person_id: ["validation_required"],
    appointment_type: ["validation_required"],
    date: ["validation_required"],
    start_time: ["validation_required"],
    end_time: ["validation_required"],
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

  const appointmentFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("person")} />
            <SingleSelectInput
              id="person"
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
          <FormField className="mt10">
            <FormLabel label={t("appointment_type")} />
            <SingleSelectInput
              id="appointment_type"
              options={appointmentTypes.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: t(item.tr),
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, appointment_type: val })
              }
              value={formValues.appointment_type}
            />
            {formError.appointment_type && (
              <FormErrorMessage message={formError.appointment_type} />
            )}
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("date")} />
            <DatePicker
              id="date"
              value={formValues.date}
              onChange={(val) => setFormValues({ ...formValues, date: val })}
            />
            {formError.date && <FormErrorMessage message={formError.date} />}
          </FormField>
        </FormColumn>
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("start_time")} />
            <TimePicker
              id="start_time"
              value={formValues.start_time}
              onChange={(val) =>
                setFormValues({ ...formValues, start_time: val })
              }
              isSecondsVisible={false}
            />
            {formError.start_time && (
              <FormErrorMessage message={formError.start_time} />
            )}
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("end_time")} />
            <TimePicker
              id="end_time"
              value={formValues.end_time}
              onChange={(val) =>
                setFormValues({ ...formValues, end_time: val })
              }
              isSecondsVisible={false}
            />
            {formError.end_time && (
              <FormErrorMessage message={formError.end_time} />
            )}
          </FormField>
          {isEdit && (
            <FormField className="mt10">
              <FormLabel label={t("appointment_status")} />
              <SingleSelectInput
                id="appointment_status_type"
                options={appointmentStatusTypes.map((item) => {
                  return {
                    ...item,
                    value: item.id,
                    label: t(item.tr),
                  };
                })}
                onChange={(val) =>
                  setFormValues({ ...formValues, appointment_status_type: val })
                }
                value={formValues.appointment_status_type}
              />
              {formError.appointment_status_type && (
                <FormErrorMessage message={formError.appointment_status_type} />
              )}
            </FormField>
          )}
        </FormColumn>
      </FormRow>
    );
  };

  return (
    <FormModal
      title={title}
      visibility={visibility}
      close={() => onCancel()}
      body={appointmentFormBody()}
      buttons={[
        {
          label: t("cancel"),
          onClick: () => onCancel(),
          icon: <AiOutlineClose size={20} />,
        },
        {
          label: t("save"),
          onClick: () => handleValidation(formValues),
          icon: <LuCheck size={20} />,
        },
      ]}
    />
  );
};

export default AppointmentModal;
