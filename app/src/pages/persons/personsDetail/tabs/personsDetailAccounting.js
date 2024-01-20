import React, { useState } from "react";
import PageRow from "../../../../ui/rows/pageRow";
import PageColumn from "../../../../ui/columns/pageColumn";
import Table from "../../../../ui/table";
import { useTranslation } from "react-i18next";
import {
  accountingTypes,
  paymentTypes,
  currencyTypes,
  incomeTypes,
} from "../../../../constants/types";

const PersonsDetailAccounting = ({}) => {
  const { t } = useTranslation();
  const initialTableData = {
    tableId: "test",
    isSelectionMode: true,
    columns: [
      {
        field: "accountingType",
        header: t("accountingType"),
        dataType: "dropdown",
        dropDownValues: accountingTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "paymentType",
        header: t("paymentType"),
        dataType: "dropdown",
        dropDownValues: paymentTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "amount",
        header: t("amount"),
        dataType: "text",
      },
      {
        field: "currencyType",
        header: t("currencyType"),
        dataType: "dropdown",
        dropDownValues: currencyTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
      },
      {
        field: "incomeType",
        header: t("incomeType"),
        dataType: "dropdown",
        dropDownValues: incomeTypes.map((item) => {
          return { ...item, label: t(item.label) };
        }),
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
    data: [
      {
        id: 1,
        accountingType: "income",
        paymentType: "cash",
        amount: "500",
        currencyType: "tl",
        incomeType: "hairCare",
        createdBy: "Can Yılmaz",
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
          tableTitle="accounting"
          className="mt10"
        />
      </PageColumn>
    </PageRow>
  );
};

export default PersonsDetailAccounting;
