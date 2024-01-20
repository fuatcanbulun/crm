import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import Table from "../../../../ui/table";
import { useTranslation } from "react-i18next";
import { appointmentTypes } from "../../../../constants/types";

const PersonsDetailAppointments = ({}) => {
  const { t } = useTranslation();
  const initialTableData = {
    tableId: "test",
    isSelectionMode: true,
    columns: [
      {
        field: "date",
        header: t("date"),
        dataType: "date",
      },
      {
        field: "time",
        header: t("time"),
        dataType: "text",
      },
      {
        field: "appointmentType",
        header: t("appointmentType"),
        dataType: "dropdown",
        dropDownValues: appointmentTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "explanation",
        header: t("explanation"),
        dataType: "text",
      },
      {
        field: "createdBy",
        header: t("createdBy"),
        dataType: "text",
      },
      {
        field: "createdAt",
        header: t("createdAt"),
        dataType: "date",
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
        date: "Can",
        time: "Yılmaz",
        appointmentType: "meeting",
        explanation: "Lorem Ipsum",
        createdBy: "Yeşim Polat",
        createdAt: "14/01/2024 15:30",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageRow className="col-12">
      <PageColumn className="col-12">
        <Table
          tableOptions={tableData}
          tableTitle="appointments"
          className="mt10"
        />
      </PageColumn>
    </PageRow>
  );
};

export default PersonsDetailAppointments;
