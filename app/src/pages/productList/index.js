import React, { useState } from "react";
import PageRow from "../../ui/rows/pageRow";
import PageColumn from "../../ui/columns/pageColumn";
import TitleLabel from "../../ui/labels/titleLabel";
import PageLayout from "../../ui/layouts/pageLayout";
import Table from "../../ui/table";
import BasicButton from "../../ui/buttons/basicButton";
import { useNavigate } from "react-router-dom";

const ProductList = ({}) => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductModal, setNewProductModal] = useState(false);

  const initialTableData = {
    tableId: "productList",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedProduct(selectedData),
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
        field: "createdAt",
        header: "createdAt",
        dataType: "date",
      },
      {
        field: "createdBy",
        header: "createdBy",
        dataType: "text",
      },
    ],
    data: [
      {
        id: 1,
        productType: "protezSac",
        brand: "Hairskeen",
        description: "Lorem Ipsum",
        unit: "piece",
        price: "200 TL",
        createdAt: "14/01/2024 15:30",
        createdBy: "Yeşim Polat",
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
            tableTitle="productList"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default ProductList;
