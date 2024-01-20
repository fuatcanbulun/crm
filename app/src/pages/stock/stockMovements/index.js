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

const StockMovements = ({}) => {
  const initialTableData = {
    tableId: "stockMovements",
    isSelectionMode: true,
    columns: [
      {
        field: "movement",
        header: "movement",
        dataType: "dropdown",
        dropDownValues: [
          {
            label: "in",
            value: "in",
          },
          {
            label: "out",
            value: "out",
          },
        ],
      },
      {
        field: "date",
        header: "date",
        dataType: "date",
      },
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
    ],
    data: [
      {
        id: 1,
        movement: "in",
        date: "12/10/2023 15:30",
        productType: "protezSac",
        brand: "Hairskeen",
        description: "Lorem Ipsum",
        amount: "10",
        unit: "piece",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageRow className="col-12">
      <PageColumn className="col-12">
        <Table
          tableOptions={tableData}
          tableTitle="stockMovements"
          className="mt10"
        />
      </PageColumn>
    </PageRow>
  );
};

export default StockMovements;
