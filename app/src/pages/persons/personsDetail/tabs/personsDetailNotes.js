import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import Table from "../../../../ui/table";
import { useTranslation } from "react-i18next";
import BasicButton from "../../../../ui/buttons/basicButton";
import { LuPlus, LuEye } from "react-icons/lu";

const PersonsDetailNotes = ({ data, getRequiredData }) => {
  console.log("noteData", data);

  const { t } = useTranslation();
  const initialTableData = {
    tableId: "test",
    isSelectionMode: true,
    columns: [
      {
        field: "created_at",
        header: t("created_at"),
        dataType: "date",
      },
      {
        field: "created_by",
        header: t("created_by"),
        dataType: "text",
      },
      {
        field: "note",
        header: t("note"),
        dataType: "text",
      },
    ],
    data: data,
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <>
      <PageRow className="col-12 mt10">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new_entry")}
            icon={<LuPlus />}
            className="mt10"
            //onClick={() => setPersonModal(true)}
          />
          {/* {selectedPerson && (
            <BasicButton
              label={t("detail")}
              icon={<LuEye />}
              className="mt10"
              onClick={() => navigate(`/persons-detail/${selectedPerson.id}`)}
            />
          )} */}
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table tableOptions={tableData} tableTitle="notes" className="mt10" />
        </PageColumn>
      </PageRow>
    </>
  );
};

export default PersonsDetailNotes;
