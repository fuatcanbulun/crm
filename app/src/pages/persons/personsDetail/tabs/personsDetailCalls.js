import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import Table from "../../../../ui/table";
import { useTranslation } from "react-i18next";

const PersonsDetailCalls = ({}) => {
  const { t } = useTranslation();
  const initialTableData = {
    tableId: "test",
    isSelectionMode: true,
    columns: [
      {
        field: "createdAt",
        header: t("createdAt"),
        dataType: "date",
      },
      {
        field: "createdBy",
        header: t("createdBy"),
        dataType: "text",
      },
      {
        field: "notes",
        header: t("notes"),
        dataType: "text",
      },
    ],
    headers: {
      dynamicButtons: [
        {
          id: "add",
          name: "add",
          icon: "pi pi-plus",
          type: "button",
          label: "add",
          _onClick: (secilenData, tumData) => {
            console.log("secilenData", secilenData);
          },
          disabled: false,
        },
        {
          id: "detail",
          name: "detail",
          icon: "pi pi-pencil",
          type: "button",
          label: "detail",
          _onClick: (secilenData, tumData) => {
            console.log("secilenData", secilenData);
          },
        },
        {
          id: "remove",
          name: "remove",
          icon: "pi pi-pencil",
          type: "button",
          label: "remove",
          _onClick: (secilenData, tumData) => {
            console.log("secilenData", secilenData);
          },
        },
      ],
    },
    data: [
      {
        id: 1,
        createdAt: "14/01/2024 15:30",
        createdBy: "Can Yılmaz",
        notes: "Lorem Ipsum",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageRow className="col-12">
      <PageColumn className="col-12">
        <Table tableOptions={tableData} tableTitle="calls" className="mt10" />
      </PageColumn>
    </PageRow>
  );
};

export default PersonsDetailCalls;
