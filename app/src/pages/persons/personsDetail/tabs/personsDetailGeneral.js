import React from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import InfoLine from "../../../../ui/info/infoLine";
import { useTranslation } from "react-i18next";
import { personTypes, genderTypes } from "../../../../constants/types";

const sampleData = {
  firstName: "Can",
  lastName: "Yılmaz",
  personType: "customer",
  gender: "male",
  phone: "0555 555 5555",
  createdAt: "14/01/2024 15:30",
};

const PersonsDetailGeneral = ({}) => {
  const { t } = useTranslation();

  return (
    <PageRow className="col-8">
      <PageColumn className="col-6">
        <InfoLine label={t("firstName")} value={sampleData.firstName} />
        <InfoLine label={t("lastName")} value={sampleData.lastName} />
        <InfoLine
          label={t("personType")}
          value={t(
            personTypes.find((item) => item.value == sampleData.personType)
              ?.label
          )}
        />
      </PageColumn>
      <PageColumn className="col-6">
        <InfoLine
          label={t("gender")}
          value={t(
            genderTypes.find((item) => item.value == sampleData.gender)?.label
          )}
        />
        <InfoLine label={t("phone")} value={sampleData.phone} />
        <InfoLine label={t("createdAt")} value={sampleData.createdAt} />
      </PageColumn>
    </PageRow>
  );
};

export default PersonsDetailGeneral;
