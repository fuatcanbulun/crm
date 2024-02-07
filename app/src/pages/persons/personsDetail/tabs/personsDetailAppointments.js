import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import Table from "../../../../ui/table";
import { useTranslation } from "react-i18next";
import BasicButton from "../../../../ui/buttons/basicButton";
import { LuPlus, LuEye } from "react-icons/lu";
import { useSelector } from "react-redux";

const PersonsDetailAppointments = ({ data, getRequiredData }) => {
  const { appointmentTypes } = useSelector((state) => state.enums);

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
        field: "start_time",
        header: t("start_time"),
        dataType: "text",
      },
      {
        field: "end_time",
        header: t("end_time"),
        dataType: "text",
      },
      {
        field: "appointment_type",
        header: t("appointment_type"),
        dataType: "dropdown",
        dropDownValues: appointmentTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "explanation",
        header: t("explanation"),
        dataType: "text",
      },
      {
        field: "created_by",
        header: t("created_by"),
        dataType: "text",
      },
      {
        field: "created_at",
        header: t("created_at"),
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
    data: data,
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <>
      <PageRow className="col-12 mt10">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          {/* <BasicButton
            label={t("new_entry")}
            icon={<LuPlus />}
            className="mt10"
            onClick={() => setPersonModal(true)}
          /> */}
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
          <Table
            tableOptions={tableData}
            tableTitle="appointments"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </>
  );
};

export default PersonsDetailAppointments;
