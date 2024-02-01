import React, { useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import Table from "../../../ui/table";
import PageLayout from "../../../ui/layouts/pageLayout";
import TitleLabel from "../../../ui/labels/titleLabel";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { stockMovementTypes, productTypes } from "../../../constants/types";
import { brandsData, productsData } from "../../../constants/data";

const stock_movements = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stockMovementModal, setStockMovementModal] = useState(false);
  const [selectedStockMovement, setSelectedStockMovement] = useState(null);

  const [formValues, setFormValues] = useState({
    product_type: "",
  });

  const initialTableData = {
    tableId: "stock_movements",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedStockMovement(selectedData),
    columns: [
      {
        field: "stock_movement",
        header: t("stock_movement"),
        dataType: "dropdown",
        dropDownValues: stockMovementTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
      },
      {
        field: "date",
        header: t("date"),
        dataType: "date",
      },
      {
        field: "product_type",
        header: t("product_type"),
        dataType: "dropdown",
        dropDownValues: productTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
      },
      {
        field: "brand",
        header: t("brand"),
        dataType: "dropdown",
        dropDownValues: brandsData.map((item) => {
          return { ...item, value: item.id, label: t(item.label) };
        }),
      },
      {
        field: "definition",
        header: t("definition"),
        dataType: "text",
      },
      {
        field: "amount",
        header: t("amount"),
        dataType: "number",
      },
      {
        field: "unit",
        header: t("unit"),
        dataType: "text",
      },
    ],
    data: [
      {
        id: 1,
        stock_movement: 1,
        date: "12/10/2023 15:30",
        product_type: 1,
        brand: 1,
        definition: "Lorem Ipsum",
        amount: "10",
        unit: "piece",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("stock_movements")} />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="stock_movements"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default stock_movements;
