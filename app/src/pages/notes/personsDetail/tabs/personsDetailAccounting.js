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
import BasicButton from "../../../../ui/buttons/basicButton";
import { LuPlus, LuEye } from "react-icons/lu";

const PersonsDetailAccounting = ({}) => {
  const { t } = useTranslation();
  const initialTableData = {
    tableId: "test",
    isSelectionMode: true,
    columns: [
      {
        field: "accounting_type",
        header: t("accounting_type"),
        dataType: "dropdown",
        dropDownValues: accountingTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
      },
      {
        field: "payment_type",
        header: t("payment_type"),
        dataType: "dropdown",
        dropDownValues: paymentTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
      },
      {
        field: "amount",
        header: t("amount"),
        dataType: "text",
      },
      {
        field: "currency_type",
        header: t("currency_type"),
        dataType: "dropdown",
        dropDownValues: currencyTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
      },
      {
        field: "income_type",
        header: t("income_type"),
        dataType: "dropdown",
        dropDownValues: incomeTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
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
    data: [
      {
        id: 1,
        accounting_type: 1,
        payment_type: 1,
        amount: "500",
        currency_type: 1,
        income_type: 1,
        created_by: "Can Yılmaz",
        created_at: "14/01/2024 15:30",
      },
    ],
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
          <Table
            tableOptions={tableData}
            tableTitle="accounting"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </>
  );
};

export default PersonsDetailAccounting;
