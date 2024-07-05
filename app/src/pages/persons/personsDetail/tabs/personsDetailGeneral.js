import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import InfoLine from "../../../../ui/info/infoLine";
import BasicButton from "../../../../ui/buttons/basicButton";
import { LuPlus, LuPen, LuCheck } from "react-icons/lu";
import PersonModal from "../../common/personModal";
import { updatePerson } from "../../../../services/persons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import moment from "moment";
import useToastMessage from "../../../../hooks/useToastMessage";

const PersonsDetailGeneral = ({ data, getRequiredData }) => {
  const { t } = useTranslation();
  const { toastMessage } = useToastMessage();

  const { personTypes, genderTypes, cities } = useSelector(
    (state) => state.enums
  );
  const [personModal, setPersonModal] = useState(false);

  const confirmUpdatePerson = async (values) => {
    setPersonModal(false);
    await updatePerson(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_person_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  return (
    <>
      <PersonModal
        data={data}
        title={t("edit_person")}
        visibility={personModal}
        onCancel={() => setPersonModal(false)}
        onSave={(values) => confirmUpdatePerson(values)}
      />
      <PageRow className="xs:col-12 sm:col-12 col-8 mt20">
        <PageColumn className="xs:col-12 sm:col-12 col-6">
          <InfoLine label={t("first_name")} value={data?.first_name} />
          <InfoLine label={t("last_name")} value={data?.last_name} />
          <InfoLine
            label={t("person_type")}
            value={t(
              personTypes.find((item) => item.id == data?.person_type)?.tr
            )}
          />
          <InfoLine
            label={t("gender_type")}
            value={t(
              genderTypes.find((item) => item.id == data?.gender_type)?.tr
            )}
          />
          <InfoLine
            label={t("date_of_birth")}
            value={
              data?.date_of_birth &&
              moment(data?.date_of_birth, "YYYY-MM-DD").format("DD/MM/YYYY")
            }
          />
        </PageColumn>
        <PageColumn className="xs:col-12 sm:col-12 col-6">
          <InfoLine label={t("phone1")} value={data?.phone1} />
          <InfoLine label={t("phone2")} value={data?.phone2} />
          <InfoLine
            label={t("city")}
            value={t(cities.find((item) => item.id == data?.city)?.tr)}
          />
          <InfoLine label={t("address")} value={data?.phone2} />
          <InfoLine
            label={t("created_at")}
            value={
              data?.created_at &&
              moment(data?.created_at).format("DD/MM/YYYY HH:MM:ss")
            }
          />
        </PageColumn>
      </PageRow>
      <PageRow className="col-8 mt20">
        <PageColumn className="col-6">
          <BasicButton
            label={t("edit")}
            icon={<LuPen size={15} />}
            className="mt10"
            onClick={() => setPersonModal(true)}
          />
        </PageColumn>
        <PageColumn className="col-6"></PageColumn>
      </PageRow>
    </>
  );
};

export default PersonsDetailGeneral;
