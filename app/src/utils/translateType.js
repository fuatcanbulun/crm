import { useTranslation } from "react-i18next";

export const TranslateType = ({ types }) => {
  const { t } = useTranslation();

  return types.map((item) => {
    return { ...item, label: t(item.label) };
  });
};
