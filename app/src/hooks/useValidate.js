import { useTranslation } from "react-i18next";

const validations = {
  validation_only_letters: (val) => {
    return /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/u.test(val);
  },
  validation_min_2_characters: (val) => {
    return val.length >= 2;
  },
  validation_max_50_characters: (val) => {
    return val.length <= 50;
  },
  validation_email: (val) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val);
  },
  validation_required: (val) => {
    return val.length > 0;
  },
  validation_required_selection: (val) => {
    return val.length > 0;
  },
};

const useValidate = () => {
  const { t } = useTranslation();
  const result = {};

  const validate = (values, validation) => {
    for (const valuesProperty in values) {
      for (const validationProperty in validation) {
        if (validationProperty === valuesProperty) {
          if (
            validation[validationProperty].includes("validation_required") ||
            validation[validationProperty].includes(
              "validation_required_selection"
            ) ||
            (values[valuesProperty] !== "" &&
              values[valuesProperty] !== null &&
              values[valuesProperty] !== undefined)
          ) {
            for (const item of validation[validationProperty]) {
              if (validations[item](values[valuesProperty]) === false) {
                result[validationProperty] = t(item);
              }
            }
          }
        }
      }
    }
    console.log("result", result);
    return Object.keys(result).length > 0 ? result : true;
  };

  return { validate };
};

export default useValidate;
