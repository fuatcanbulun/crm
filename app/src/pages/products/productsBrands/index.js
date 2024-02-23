import React, { useState, useEffect } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import Table from "../../../ui/table";
import BasicButton from "../../../ui/buttons/basicButton";
import useToastMessage from "../../../hooks/useToastMessage";
import { useTranslation } from "react-i18next";

import ProductsBrandsModal from "./productsBrandsModal";
import ConfirmModal from "../../../ui/modals/confirmModal";
import { LuCheck, LuPlus, LuPen, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import {
  getBrands,
  updateBrand,
  addBrand,
  removeBrandById,
} from "../../../services/brands";

const ProductsBrands = ({}) => {
  const { toastMessage } = useToastMessage();
  const { t } = useTranslation();
  const [brandModal, setBrandModal] = useState(false);
  const [brandModalData, setBrandModalData] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandDeleteModal, setBrandDeleteModal] = useState(false);

  const [brands, setBrands] = useState([]);

  const initialTableData = {
    tableId: "brand_list",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedBrand(selectedData),
    columns: [
      {
        field: "label",
        header: t("brand"),
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
    const [brandsData] = await Promise.all([getBrands()]);

    setTableData({ ...initialTableData, data: brandsData });
  };

  const confirmAddBrand = async (values) => {
    setBrandModal(false);
    await addBrand(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_brand_created",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmUpdateBrand = async (values) => {
    setBrandModal(false);
    setBrandModalData(null);
    await updateBrand(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_brand_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteBrand = async () => {
    setBrandDeleteModal(false);
    await removeBrandById(selectedBrand.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_brand_deleted",
        type: "success",
        duration: 3000,
      });
    });
  };

  useEffect(() => {
    if (brandModalData) {
      setBrandModal(true);
    }
  }, [brandModalData]);

  return (
    <PageLayout>
      <ProductsBrandsModal
        data={brandModalData}
        title={brandModalData ? t("edit_brand") : t("new_brand")}
        visibility={brandModal}
        onCancel={() => {
          setBrandModal(false);
          setBrandModalData(null);
        }}
        onSave={(values) =>
          brandModalData ? confirmUpdateBrand(values) : confirmAddBrand(values)
        }
        brands={brands}
      />
      <ConfirmModal
        title={t("delete_brand")}
        visibility={brandDeleteModal}
        close={() => setBrandDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setBrandDeleteModal(false),
            icon: <AiOutlineClose />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteBrand(),
            icon: <LuCheck />,
          },
        ]}
      />
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Ürün Listesi" />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            icon={<LuPlus />}
            onClick={() => setBrandModal(true)}
          />
          {selectedBrand && (
            <>
              <BasicButton
                label={t("edit")}
                icon={<LuPen />}
                onClick={() => {
                  setBrandModalData(selectedBrand);
                }}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => setBrandDeleteModal(true)}
              />
            </>
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="brand_list"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default ProductsBrands;
