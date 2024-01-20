import React, { useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import Table from "../../../ui/table";

const sampleData = {
  firstName: "Can",
  lastName: "Yılmaz",
  personType: "customer",
  gender: "male",
  phone: "0555 555 5555",
  createdAt: "14/01/2024 15:30",
};

const StockContent = ({}) => {
  const initialTableData = {
    tableId: "stockContent",
    isSelectionMode: true,
    columns: [
      {
        field: "productType",
        header: "productType",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "protezSac",
            value: "protezSac",
          },
          {
            label: "yapistirici",
            value: "yapistirici",
          },
        ],
      },
      {
        field: "brand",
        header: "brand",
        dataType: "text",
      },
      {
        field: "description",
        header: "description",
        dataType: "text",
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
        field: "lastModifiedAt",
        header: "lastModifiedAt",
        dataType: "date",
      },
    ],
    data: [
      {
        id: 1,
        productType: "protezSac",
        brand: "Hairskeen",
        description: "Lorem Ipsum",
        amount: "10",
        unit: "piece",
        lastModifiedAt: "14/01/2024 15:30",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageRow className="col-12">
      <PageColumn className="col-12">
        <Table
          tableOptions={tableData}
          tableTitle="stockContent"
          className="mt10"
        />
      </PageColumn>
    </PageRow>
  );
};

export default StockContent;
