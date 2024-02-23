import React, { useState, useEffect } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import Table from "../../../ui/table";
import BasicButton from "../../../ui/buttons/basicButton";
import useToastMessage from "../../../hooks/useToastMessage";
import { useTranslation } from "react-i18next";
import { getBrands } from "../../../services/brands";
import { getProducts } from "../../../services/products";
import StocksMovementsModal from "./stocksMovementsModal";
import ConfirmModal from "../../../ui/modals/confirmModal";
import { LuCheck, LuPlus, LuPen, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";
import {
  getMovements,
  updateMovement,
  addMovement,
  removeMovementById,
} from "../../../services/movements";
import { useSelector } from "react-redux";

const StocksMovements = ({}) => {
  const { toastMessage } = useToastMessage();
  const { t } = useTranslation();
  const { stockMovementTypes } = useSelector((state) => state.enums);

  const [movementModal, setMovementModal] = useState(false);
  const [movementModalData, setMovementModalData] = useState(null);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [movementDeleteModal, setMovementDeleteModal] = useState(false);

  const [movements, setMovements] = useState([]);

  const initialTableData = {
    tableId: "movement_list",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedMovement(selectedData),
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
        field: "movement_type",
        header: t("movement_type"),
        dataType: "dropdown",
        dropDownValues: stockMovementTypes.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
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
    if (stockMovementTypes.length > 0) {
      getRequiredData();
    }
  }, [stockMovementTypes]);

  const getRequiredData = async () => {
    const [movementsData, brandsData, productsData] = await Promise.all([
      getMovements(),
      getBrands(),
      getProducts(),
    ]);

    const newData = [];
    for (const item of movementsData) {
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

    setTableData({ ...initialTableData, data: newData });
  };

  const confirmAddMovement = async (values) => {
    setMovementModal(false);
    await addMovement(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_movement_created",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmUpdateMovement = async (values) => {
    setMovementModal(false);
    setMovementModalData(null);
    await updateMovement(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_movement_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteMovement = async () => {
    setMovementDeleteModal(false);
    await removeMovementById(selectedMovement.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_movement_deleted",
        type: "success",
        duration: 3000,
      });
    });
  };

  useEffect(() => {
    if (movementModalData) {
      setMovementModal(true);
    }
  }, [movementModalData]);

  return (
    <PageLayout>
      {/* <StocksMovementsModal
        data={movementModalData}
        title={movementModalData ? t("edit_movement") : t("new_movement")}
        visibility={movementModal}
        onCancel={() => {
          setMovementModal(false);
          setMovementModalData(null);
        }}
        onSave={(values) =>
          movementModalData
            ? confirmUpdateMovement(values)
            : confirmAddMovement(values)
        }
        movements={movements}
      /> */}
      <ConfirmModal
        title={t("delete_movement")}
        visibility={movementDeleteModal}
        close={() => setMovementDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setMovementDeleteModal(false),
            icon: <AiOutlineClose />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteMovement(),
            icon: <LuCheck />,
          },
        ]}
      />
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Stok Hareketleri" />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          {/* <BasicButton
            label={t("new")}
            icon={<LuPlus />}
            onClick={() => setMovementModal(true)}
          />
          {selectedMovement && (
            <>
              <BasicButton
                label={t("edit")}
                icon={<LuPen />}
                onClick={() => {
                  setMovementModalData(selectedMovement);
                }}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash />}
                onClick={() => setMovementDeleteModal(true)}
              />
            </>
          )} */}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="movement_list"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default StocksMovements;
