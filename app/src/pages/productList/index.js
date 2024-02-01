import React, { useState } from "react";
import PageRow from "../../ui/rows/pageRow";
import PageColumn from "../../ui/columns/pageColumn";
import TitleLabel from "../../ui/labels/titleLabel";
import PageLayout from "../../ui/layouts/pageLayout";
import Table from "../../ui/table";
import BasicButton from "../../ui/buttons/basicButton";
import { useNavigate } from "react-router-dom";

const product_list = ({}) => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductModal, setNewProductModal] = useState(false);

  const initialTableData = {
    tableId: "product_list",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedProduct(selectedData),
    columns: [
      {
        field: "product_type",
        header: "product_type",
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
        field: "unit",
        header: "unit",
        dataType: "text",
      },
      {
        field: "price",
        header: "price",
        dataType: "number",
      },
      {
        field: "created_at",
        header: "created_at",
        dataType: "date",
      },
      {
        field: "created_by",
        header: "created_by",
        dataType: "text",
      },
    ],
    data: [
      {
        id: 1,
        product_type: "protezSac",
        brand: "Hairskeen",
        description: "Lorem Ipsum",
        unit: "piece",
        price: "200 TL",
        created_at: "14/01/2024 15:30",
        created_by: "Yeşim Polat",
      },
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Ürün Listesi" />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label="Yeni Kayıt"
            className="mt10"
            onClick={() => setNewProductModal(true)}
          />
          {selectedProduct && (
            <BasicButton
              label="Detay"
              className="mt10"
              onClick={() => navigate(`/product-detail/${selectedProduct.id}`)}
            />
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="product_list"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default product_list;
