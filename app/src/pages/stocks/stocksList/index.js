import React, { useState, useEffect } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import Table from "../../../ui/table";
import BasicButton from "../../../ui/buttons/basicButton";
import useToastMessage from "../../../hooks/useToastMessage";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getBrands } from "../../../services/brands";
import { getProducts } from "../../../services/products";
import StocksListModal from "./stocksListModal";
import ConfirmModal from "../../../ui/modals/confirmModal";
import { LuCheck, LuPlus, LuMinus, LuPen, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import {
  getStocks,
  updateStock,
  addStock,
  removeStockById,
} from "../../../services/stocks";

const StocksList = ({}) => {
  const { toastMessage } = useToastMessage();
  const { t } = useTranslation();
  const [stockModal, setStockModal] = useState(false);
  const [stockModalData, setStockModalData] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockDeleteModal, setStockDeleteModal] = useState(false);
  const [stockType, setStockType] = useState("");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const initialTableData = {
    tableId: "stock_list",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedStock(selectedData),
    columns: [
      {
        field: "brand",
        header: t("brand"),
        dataType: "text",
      },
      {
        field: "description",
        header: t("description"),
        dataType: "text",
      },
      {
        field: "amount",
        header: t("amount"),
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
    data: [],
  };

  const [tableData, setTableData] = useState(initialTableData);

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    const [stocksData, productsData, brandsData] = await Promise.all([
      getStocks(),
      getProducts(),
      getBrands(),
    ]);

    console.log("stocksData", stocksData);
    console.log("productsData", productsData);
    console.log("brandsData", brandsData);

    const newData = [];
    for (const item of stocksData) {
      const matchedProduct = productsData.find(
        (product) => product.id == item.product_id
      );

      const matchedBrand = brandsData.find(
        (brand) => brand.id == matchedProduct.brand_id
      );

      newData.push({
        ...item,
        brand: matchedBrand.label,
        description: matchedProduct.description,
        amount: item.amount,
      });
    }

    setProducts(productsData);
    setBrands(brandsData);
    setTableData({ ...initialTableData, data: newData });
  };

  const confirmAddStock = async (values) => {
    setStockModal(false);
    await addStock(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_stock_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteStock = async () => {
    setStockDeleteModal(false);
    await removeStockById(selectedStock.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_stock_deleted",
        type: "success",
        duration: 3000,
      });
    });
  };

  return (
    <PageLayout>
      <StocksListModal
        title={stockType === "in" ? t("stock_in") : t("stock_out")}
        visibility={stockModal}
        onCancel={() => {
          setStockModal(false);
          setStockModalData(null);
        }}
        onSave={(values) => confirmAddStock(values)}
        brands={brands}
        products={products}
        type={stockType}
      />
      <ConfirmModal
        title={t("delete_stock")}
        visibility={stockDeleteModal}
        close={() => setStockDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setStockDeleteModal(false),
            icon: <AiOutlineClose />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteStock(),
            icon: <LuCheck />,
          },
        ]}
      />
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Stok Listesi" />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("stock_in")}
            icon={<LuPlus />}
            onClick={() => {
              setStockType("in");
              setStockModal(true);
            }}
          />
          <BasicButton
            label={t("stock_out")}
            icon={<LuMinus />}
            onClick={() => {
              setStockType("out");
              setStockModal(true);
            }}
          />
          {selectedStock && (
            <>
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => setStockDeleteModal(true)}
              />
            </>
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="stock_list"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default StocksList;
