import React, { useEffect, useState } from "react";
import InformationModal from "../../../ui/modals/informationModal";
import { useTranslation } from "react-i18next";
import FormRow from "../../../ui/rows/formRow";
import FormColumn from "../../../ui/columns/formColumn";
import FormField from "../../../ui/fields/formField";
import FormLabel from "../../../ui/labels/formLabel";
import FormErrorMessage from "../../../ui/messages/formErrorMessage";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import InfoLine from "../../../ui/info/infoLine";
import moment from "moment";
import { useSelector } from "react-redux";
import useValidate from "../../../hooks/useValidate";
import SingleSelectInput from "../../../ui/inputs/singleSelectInput";
import { AiOutlineClose } from "react-icons/ai";
import { LuCheck } from "react-icons/lu";
import HSeperator from "../../../ui/seperators/hSeperator";

const initialFormValues = {
  appointment_status_type: "",
};

const AppointmentInformationModal = ({
  data,
  title,
  onCancel,
  visibility,
  onSave,
}) => {
  const { t } = useTranslation();
  const { appointmentStatusTypes } = useSelector((state) => state.enums);
  const { validate } = useValidate();
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (data) {
      setFormValues(data ? data : initialFormValues);
    }
  }, [data]);

  const validation = {
    person_id: ["validation_required"],
    appointment_type: ["validation_required"],
    date: ["validation_required"],
    start_time: ["validation_required"],
    end_time: ["validation_required"],
  };

  const handleValidation = (values) => {
    const response = validate(values, validation);
    setFormError(response);
    if (response === true) {
      onSave(values);
    }
  };

  const modalBody = () => {
    return (
      <>
        <FormRow className="col-12 pt0">
          <FormColumn className="xs:col-12 sm:col-12 col-6">
            <InfoLine label={t("person_name")} value={data?.person_name} />
            <InfoLine label={t("appointment_type")} value={data?.type} />
            <InfoLine
              label={t("date")}
              value={moment(data?.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
            />
          </FormColumn>
          <FormColumn className="xs:col-12 sm:col-12 col-6">
            <InfoLine label={t("start_time")} value={data?.start_time} />
            <InfoLine label={t("end_time")} value={data?.end_time} />
          </FormColumn>
        </FormRow>

        <FormRow className="col-12 pt0">
          <FormColumn className="col-12">
            <HSeperator />
          </FormColumn>
        </FormRow>

        <FormRow className="col-12 pt0">
          <FormColumn className="xs:col-12 sm:col-12 col-6">
            <FormField>
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
                  setFormValues({
                    ...formValues,
                    appointment_status_type: val,
                  })
                }
                value={formValues.appointment_status_type}
              />
              {formError.appointment_status_type && (
                <FormErrorMessage message={formError.appointment_status_type} />
              )}
            </FormField>
          </FormColumn>
        </FormRow>
      </>
    );
  };

  return (
    <InformationModal
      title={title}
      visibility={visibility}
      close={() => onCancel()}
      body={modalBody()}
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

export default AppointmentInformationModal;
