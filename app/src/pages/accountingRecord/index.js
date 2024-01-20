import React, { useState } from "react";
import PageRow from "../../ui/rows/pageRow";
import PageColumn from "../../ui/columns/pageColumn";
import TitleLabel from "../../ui/labels/titleLabel";
import PageLayout from "../../ui/layouts/pageLayout";
import Table from "../../ui/table";

const AccountingRecord = ({}) => {
  const initialTableData = {
    tableId: "accountingRecord",
    isSelectionMode: true,
    columns: [
      {
        field: "date",
        header: "date",
        dataType: "date",
      },
      {
        field: "accountingDirectionType",
        header: "accountingDirectionType",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "income",
            value: "income",
          },
          {
            label: "expense",
            value: "expense",
          },
        ],
      },
      {
        field: "paymentType",
        header: "paymentType",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "cash",
            value: "cash",
          },
          {
            label: "card",
            value: "card",
          },
        ],
      },
      {
        field: "amount",
        header: "amount",
        dataType: "number",
      },
      {
        field: "unit",
        header: "unit",
        dataType: "text",
      },
      {
        field: "accountingType",
        header: "accountingType",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "sacBakim",
            value: "sacBakim",
          },
          {
            label: "urunSatis",
            value: "urunSatis",
          },
        ],
      },
      {
        field: "relatedPerson",
        header: "relatedPerson",
        dataType: "text",
      },
    ],
    data: [
      {
        id: 1,
        date: "14/01/2024 15:30",
        accountingDirectionType: "income",
        paymentType: "cash",
        amount: 10,
        unit: "piece",
        accountingType: "sacBakim",
        relatedPerson: "Can Yılmaz",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Muhasebe Kaydı" />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="accountingRecord"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AccountingRecord;
