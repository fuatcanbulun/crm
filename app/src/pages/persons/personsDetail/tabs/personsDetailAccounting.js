import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import Table from "../../../../ui/table";
import { useTranslation } from "react-i18next";
import BasicButton from "../../../../ui/buttons/basicButton";
import { LuPlus, LuEye } from "react-icons/lu";
import { useSelector } from "react-redux";

const PersonsDetailAccounting = ({ data, getRequiredData }) => {
  const {
    accountingTypes,
    paymentTypes,
    incomeTypes,
    currencyTypes,
    expenseTypes,
  } = useSelector((state) => state.enums);

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
        field: "accounting_type_id",
        header: t("accounting_type"),
        dataType: "dropdown",
        dropDownValues: accountingTypes?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "amount",
        header: t("amount"),
        dataType: "text",
      },
      {
        field: "currency_type_id",
        header: t("currency_type"),
        dataType: "dropdown",
        dropDownValues: currencyTypes?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "payment_type_id",
        header: t("payment_type"),
        dataType: "dropdown",
        dropDownValues: paymentTypes?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "accounting_model_id",
        header: t("accounting_model"),
        dataType: "dropdown",
        dropDownValues: incomeTypes.concat(expenseTypes)?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "created_by",
        header: t("created_by"),
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
          <Table tableOptions={tableData} tableTitle="appointments" />
        </PageColumn>
      </PageRow>
    </>
  );
};

export default PersonsDetailAccounting;
