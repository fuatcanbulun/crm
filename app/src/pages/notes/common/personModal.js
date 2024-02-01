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
  first_name: "",
  last_name: "",
  person_type: "",
  gender_type: "",
  date_of_birth: "",
  city: "",
  address: "",
  phone1: "",
  phone2: "",
  email: "",
  created_by: "",
  created_at: "",
};

const PersonModal = ({ data, title, onSave, onCancel, visibility }) => {
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
            <FormLabel label={t("first_name")} />
            <TextInput
              id="first_name"
              value={formValues.first_name}
              onChange={(val) =>
                setFormValues({ ...formValues, first_name: val })
              }
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("last_name")} />
            <TextInput
              id="lastName"
              value={formValues.last_name}
              onChange={(val) =>
                setFormValues({ ...formValues, last_name: val })
              }
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("person_type")} />
            <SingleSelectInput
              options={personTypes.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: t(item.tr),
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, person_type: val })
              }
              value={formValues.person_type}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("gender_type")} />
            <SingleSelectInput
              options={genderTypes.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: t(item.tr),
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, gender_type: val })
              }
              value={formValues.gender_type}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("date_of_birth")} />
            <DatePicker
              id="date_of_birth"
              value={formValues.date_of_birth}
              onChange={(val) => {
                console.log("xxx", val);
                setFormValues({ ...formValues, date_of_birth: val });
              }}
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
            <FormLabel label={t("city")} />
            <SingleSelectInput
              options={cities.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: t(item.tr),
                };
              })}
              onChange={(val) => setFormValues({ ...formValues, city: val })}
              value={formValues.city}
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

export default PersonModal;
