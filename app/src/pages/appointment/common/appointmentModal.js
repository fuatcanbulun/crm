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

const initialFormValues = {
  person_id: "",
  appointment_type: "",
  date: "",
  start_time: "",
  end_time: "",
};

const AppointmentModal = ({
  data,
  title,
  onSave,
  onCancel,
  visibility,
  persons,
}) => {
  const { t } = useTranslation();
  const { appointmentTypes } = useSelector((state) => state.enums);
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);

  useEffect(() => {
    setFormValues(data ? data : initialFormValues);
  }, [data]);

  const appointmentFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="col-6">
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
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("date")} />
            <DatePicker
              id="date"
              value={formValues.date}
              onChange={(val) => setFormValues({ ...formValues, date: val })}
            />
          </FormField>
        </FormColumn>
        <FormColumn className="col-6">
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
      body={appointmentFormBody()}
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

export default AppointmentModal;
