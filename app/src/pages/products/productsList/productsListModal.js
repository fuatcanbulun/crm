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
  brand_id: "",
  product_type: "",
  description: "",
};

const ProductsListModal = ({
  data,
  title,
  onSave,
  onCancel,
  visibility,
  brands,
}) => {
  const { t } = useTranslation();
  const { productTypes } = useSelector((state) => state.enums);
  const { userInfo } = useSelector((state) => state.user);
  const { validate } = useValidate();
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});
  const validation = {
    brand_id: ["validation_required_selection"],
    product_type: ["validation_required_selection"],
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

  const productFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("brand")} />
            <SingleSelectInput
              options={brands.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: item.label,
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, brand_id: val })
              }
              value={formValues.brand_id}
            />
            {formError.brand_id && (
              <FormErrorMessage message={formError.brand_id} />
            )}
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("product_type")} />
            <SingleSelectInput
              options={productTypes.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: t(item.tr),
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, product_type: val })
              }
              value={formValues.product_type}
            />
            {formError.product_type && (
              <FormErrorMessage message={formError.product_type} />
            )}
          </FormField>
        </FormColumn>
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("description")} />
            <TextArea
              id="description"
              value={formValues.description}
              onChange={(val) =>
                setFormValues({ ...formValues, description: val })
              }
            />
            {formError.note && (
              <FormErrorMessage message={formError.description} />
            )}
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
      body={productFormBody()}
      buttons={[
        {
          label: t("cancel"),
          onClick: () => onCancel(),
          icon: <AiOutlineClose size={20} />,
        },
        {
          label: t("save"),
          onClick: () => {
            handleValidation(formValues);
          },
          icon: <LuCheck size={20} />,
        },
      ]}
    />
  );
};

export default ProductsListModal;
