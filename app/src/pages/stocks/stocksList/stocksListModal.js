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
  product_id: "",
  amount: "",
};

const StocksListModal = ({
  data,
  title,
  onSave,
  onCancel,
  visibility,
  brands,
  products,
  type,
}) => {
  const { t } = useTranslation();
  const { stockMovementTypes } = useSelector((state) => state.enums);
  const { userInfo } = useSelector((state) => state.user);
  const { validate } = useValidate();
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});
  const validation = {
    // brand_id: ["validation_required_selection"],
    // stocks_type: ["validation_required_selection"],
  };

  useEffect(() => {
    setFormValues(data ? data : initialFormValues);
  }, [data]);

  const handleValidation = (values) => {
    const response = validate(values, validation);
    setFormError(response);
    if (response === true) {
      onSave({ ...values, created_by: userInfo.user_name, type: type });
      setFormValues(initialFormValues);
    }
  };

  const stocksFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("product")} />
            <SingleSelectInput
              options={products.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label:
                    brands.find((brand) => brand.id === item.brand_id).label +
                    " " +
                    item.description,
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, product_id: val })
              }
              value={formValues.product_id}
            />
            {formError.product_id && (
              <FormErrorMessage message={formError.product_id} />
            )}
          </FormField>
        </FormColumn>
        <FormColumn className="xs:col-12 sm:col-12 col-6">
          <FormField>
            <FormLabel label={t("amount")} />
            <TextInput
              id="amount"
              type="number"
              value={formValues.amount}
              onChange={(val) => setFormValues({ ...formValues, amount: val })}
            />
            {formError.amount && (
              <FormErrorMessage message={formError.amount} />
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
      body={stocksFormBody()}
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

export default StocksListModal;
