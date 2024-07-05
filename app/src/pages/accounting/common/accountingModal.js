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
  accounting_type_id: "",
  payment_type_id: "",
  amount: "",
  currency_type_id: "",
  accounting_model_id: "",
  related_person_id: "",
  created_by: "",
  product_id: "",
  piece: "",
};

const AccountingModal = ({
  data,
  title,
  onSave,
  onCancel,
  visibility,
  persons,
  stocks,
}) => {
  const { t } = useTranslation();
  const {
    accountingTypes,
    currencyTypes,
    incomeTypes,
    expenseTypes,
    paymentTypes,
  } = useSelector((state) => state.enums);
  const { userInfo } = useSelector((state) => state.user);

  const { validate } = useValidate();
  const [formValues, setFormValues] = useState(data ? data : initialFormValues);
  const [formError, setFormError] = useState({});
  const [accountingModels, setAccountingModels] = useState([]);

  const validation = {
    // person_id: ["validation_required"],
    // accounting_type: ["validation_required"],
    // date: ["validation_required"],
    // start_time: ["validation_required"],
    // end_time: ["validation_required"],
  };

  console.log("stocks1", stocks);
  useEffect(() => {
    if (data) {
      if (
        data.accounting_type_id ===
        process.env.REACT_APP_ACCOUNTING_TYPES_INCOME
      ) {
        setAccountingModels(incomeTypes);
      } else if (
        data.accounting_type_id ===
        process.env.REACT_APP_ACCOUNTING_TYPES_EXPENSE
      ) {
        setAccountingModels(expenseTypes);
      }
    }
    setFormValues(data ? data : initialFormValues);
  }, [data]);

  const handleValidation = (values) => {
    console.log("values", values);

    const response = validate(values, validation);
    setFormError(response);
    if (response === true) {
      onSave({ ...values, created_by: userInfo.user_name });
    }
  };

  const accountingFormBody = () => {
    return (
      <>
        <FormRow className="col-12">
          <FormColumn className="xs:col-12 sm:col-12 col-6">
            <FormField>
              <FormLabel label={t("accounting_type")} />
              <SingleSelectInput
                id="accounting_type_id"
                options={accountingTypes?.map((item) => {
                  return {
                    ...item,
                    value: item.id,
                    label: t(item.tr),
                  };
                })}
                onChange={(val) => {
                  setFormValues({ ...formValues, accounting_type_id: val });
                  console.log(
                    "1",
                    process.env.REACT_APP_ACCOUNTING_TYPES_INCOME
                  );
                  if (val === process.env.REACT_APP_ACCOUNTING_TYPES_INCOME) {
                    setAccountingModels(incomeTypes);
                  } else if (
                    val === process.env.REACT_APP_ACCOUNTING_TYPES_EXPENSE
                  ) {
                    setAccountingModels(expenseTypes);
                  }
                }}
                value={formValues.accounting_type_id}
              />
              {formError.accounting_type_id && (
                <FormErrorMessage message={formError.accounting_type_id} />
              )}
            </FormField>
            <FormField className="mt10">
              <FormLabel label={t("accounting_model")} />
              <SingleSelectInput
                id="accounting_model_id"
                options={accountingModels?.map((item) => {
                  return {
                    ...item,
                    value: item.id,
                    label: t(item.tr),
                  };
                })}
                onChange={(val) =>
                  setFormValues({ ...formValues, accounting_model_id: val })
                }
                value={formValues.accounting_model_id}
              />
              {formError.accounting_model_id && (
                <FormErrorMessage message={formError.accounting_model_id} />
              )}
            </FormField>
            <FormField className="mt10">
              <FormLabel label={t("related_person")} />
              <SingleSelectInput
                id="related_person_id"
                options={persons?.map((item) => {
                  return {
                    ...item,
                    value: item.id,
                    label: item.first_name + " " + item.last_name,
                  };
                })}
                onChange={(val) => {
                  setFormValues({
                    ...formValues,
                    related_person_id: val,
                  });
                }}
                value={formValues.related_person_id}
              />
              {formError.related_person_id && (
                <FormErrorMessage message={formError.related_person_id} />
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
                onChange={(val) =>
                  setFormValues({ ...formValues, amount: val })
                }
              />
              {formError.amount && (
                <FormErrorMessage message={formError.amount} />
              )}
            </FormField>
            <FormField className="mt10">
              <FormLabel label={t("currency_type")} />
              <SingleSelectInput
                id="currency_type_id"
                options={currencyTypes?.map((item) => {
                  return {
                    ...item,
                    value: item.id,
                    label: t(item.tr),
                  };
                })}
                onChange={(val) =>
                  setFormValues({ ...formValues, currency_type_id: val })
                }
                value={formValues.currency_type_id}
              />
              {formError.currency_type_id && (
                <FormErrorMessage message={formError.currency_type_id} />
              )}
            </FormField>
            <FormField className="mt10">
              <FormLabel label={t("payment_type")} />
              <SingleSelectInput
                id="payment_type_id"
                options={paymentTypes?.map((item) => {
                  return {
                    ...item,
                    value: item.id,
                    label: t(item.tr),
                  };
                })}
                onChange={(val) =>
                  setFormValues({ ...formValues, payment_type_id: val })
                }
                value={formValues.payment_type_id}
              />
              {formError.payment_type_id && (
                <FormErrorMessage message={formError.payment_type_id} />
              )}
            </FormField>
          </FormColumn>
        </FormRow>

        {formValues.accounting_model_id ==
          "909e3de1-7e05-42bd-9ddb-8695bfc387f6" && (
          <FormRow className="col-12">
            <FormColumn className="xs:col-12 sm:col-12 col-6">
              <FormField>
                <FormLabel label={t("product")} />
                <SingleSelectInput
                  id="product_id"
                  options={stocks?.map((item) => {
                    return {
                      ...item,
                      value: item.product_id,
                      label:
                        item.product_brand_name +
                        " " +
                        item.product_description,
                    };
                  })}
                  onChange={(val) => {
                    setFormValues({ ...formValues, product_id: val });
                  }}
                  value={formValues.product_id}
                />
                {formError.product_id && (
                  <FormErrorMessage message={formError.product_id} />
                )}
              </FormField>
            </FormColumn>
            <FormColumn className="xs:col-12 sm:col-12 col-6">
              <FormField>
                <FormLabel label={t("piece")} />
                <TextInput
                  id="piece"
                  type="number"
                  value={formValues.piece}
                  onChange={(val) =>
                    setFormValues({ ...formValues, piece: val })
                  }
                />
                {formError.piece && (
                  <FormErrorMessage message={formError.piece} />
                )}
              </FormField>
            </FormColumn>
          </FormRow>
        )}
      </>
    );
  };

  return (
    <FormModal
      title={title}
      visibility={visibility}
      close={() => onCancel()}
      body={accountingFormBody()}
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

export default AccountingModal;
