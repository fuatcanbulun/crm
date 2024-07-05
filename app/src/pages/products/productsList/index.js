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
import ProductsListModal from "./productsListModal";
import ConfirmModal from "../../../ui/modals/confirmModal";
import { LuCheck, LuPlus, LuPen, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import {
  getProducts,
  updateProduct,
  addProduct,
  removeProductById,
} from "../../../services/products";

const ProductsList = ({}) => {
  const { toastMessage } = useToastMessage();
  const { t } = useTranslation();
  const { productTypes } = useSelector((state) => state.enums);
  const [productModal, setProductModal] = useState(false);
  const [productModalData, setProductModalData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDeleteModal, setProductDeleteModal] = useState(false);

  const [brands, setBrands] = useState([]);

  const initialTableData = {
    tableId: "product_list",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedProduct(selectedData),
    columns: [
      {
        field: "brand_name",
        header: t("brand"),
        dataType: "text",
      },
      {
        field: "product_type",
        header: t("product_type"),
        dataType: "dropdown",
        dropDownValues: productTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "description",
        header: "description",
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
    if (productTypes.length > 0) {
      getRequiredData();
    }
  }, [productTypes]);

  const getRequiredData = async () => {
    const [productsData, brandsData] = await Promise.all([
      getProducts(),
      getBrands(),
    ]);

    setBrands(brandsData);
    setTableData({ ...initialTableData, data: productsData });
  };

  const confirmAddProduct = async (values) => {
    setProductModal(false);
    await addProduct(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_product_created",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmUpdateProduct = async (values) => {
    setProductModal(false);
    setProductModalData(null);
    await updateProduct(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_product_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteProduct = async () => {
    setProductDeleteModal(false);
    await removeProductById(selectedProduct.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_product_deleted",
        type: "success",
        duration: 3000,
      });
    });
  };

  useEffect(() => {
    if (productModalData) {
      setProductModal(true);
    }
  }, [productModalData]);

  return (
    <PageLayout>
      <ProductsListModal
        data={productModalData}
        title={productModalData ? t("edit_product") : t("new_product")}
        visibility={productModal}
        onCancel={() => {
          setProductModal(false);
          setProductModalData(null);
        }}
        onSave={(values) =>
          productModalData
            ? confirmUpdateProduct(values)
            : confirmAddProduct(values)
        }
        brands={brands}
      />
      <ConfirmModal
        title={t("delete_product")}
        visibility={productDeleteModal}
        close={() => setProductDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setProductDeleteModal(false),
            icon: <AiOutlineClose size={20} />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteProduct(),
            icon: <LuCheck size={20} />,
          },
        ]}
      />

      <PageRow className="col-12">
        <PageColumn className="col-6">
          <TitleLabel label="Ürün Listesi" />
        </PageColumn>
        <PageColumn className="col-6 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            icon={<LuPlus />}
            onClick={() => setProductModal(true)}
          />
          {selectedProduct && (
            <>
              <BasicButton
                label={t("edit")}
                icon={<LuPen size={15} />}
                onClick={() => {
                  setProductModalData(selectedProduct);
                }}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash size={20} />}
                onClick={() => setProductDeleteModal(true)}
              />
            </>
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table tableOptions={tableData} tableTitle="product_list" />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default ProductsList;
