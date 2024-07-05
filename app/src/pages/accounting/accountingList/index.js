import React, { useEffect, useState } from "react";
import BasicButton from "../../../ui/buttons/basicButton";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import Table from "../../../ui/table";
import { useTranslation } from "react-i18next";

import {
  getAccountings,
  updateAccounting,
  addAccounting,
  removeAccountingById,
} from "../../../services/accountings";
import { getStocks, addStock } from "../../../services/stocks";

import { useSelector } from "react-redux";
import { LuCheck, LuPlus, LuPen, LuTrash } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

import AccountingModal from "../common/accountingModal";
import { getPersons } from "../../../services/persons";
import useToastMessage from "../../../hooks/useToastMessage";
import ConfirmModal from "../../../ui/modals/confirmModal";

const AccountingList = ({}) => {
  const { toastMessage } = useToastMessage();
  const { t } = useTranslation();
  const {
    accountingTypes,
    paymentTypes,
    incomeTypes,
    currencyTypes,
    expenseTypes,
  } = useSelector((state) => state.enums);
  const [persons, setPersons] = useState([]);
  const [accountingModal, setAccountingModal] = useState(false);
  const [accountingModalData, setAccountingModalData] = useState(null);
  const [selectedAccounting, setSelectedAccounting] = useState(null);
  const [accountingDeleteModal, setAccountingDeleteModal] = useState(false);
  const [stocks, setStocks] = useState([]);

  const initialTableData = {
    tableId: "accountings",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedAccounting(selectedData),
    columns: [
      {
        field: "created_at",
        header: t("created_at"),
        dataType: "date",
      },
      {
        field: "accounting_type_id",
        header: t("accounting_type"),
        dataType: "dropdown",
        dropDownValues: accountingTypes?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "amount",
        header: t("amount"),
        dataType: "text",
      },
      {
        field: "currency_type_id",
        header: t("currency_type"),
        dataType: "dropdown",
        dropDownValues: currencyTypes?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "payment_type_id",
        header: t("payment_type"),
        dataType: "dropdown",
        dropDownValues: paymentTypes?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "accounting_model_id",
        header: t("accounting_model"),
        dataType: "dropdown",
        dropDownValues: incomeTypes.concat(expenseTypes)?.map((item) => {
          return { ...item, value: item.id, label: t(item.tr) };
        }),
      },
      {
        field: "related_person_name",
        header: t("related_person"),
        dataType: "text",
      },
      {
        field: "created_by",
        header: t("created_by"),
        dataType: "text",
      },
    ],
    data: [],
  };

  const [tableData, setTableData] = useState(initialTableData);

  useEffect(() => {
    if (accountingTypes?.length > 0) {
      getRequiredData();
    }
  }, [accountingTypes]);

  const getRequiredData = async () => {
    const [accountingsData, personsData, stocksData] = await Promise.all([
      getAccountings(),
      getPersons(),
      getStocks(),
    ]);

    console.log("accountingsData", accountingsData);
    console.log("personsData", personsData);
    console.log("stocksData", stocksData);

    setPersons(personsData);
    setStocks(stocksData);
    setTableData({ ...initialTableData, data: accountingsData });
  };

  const confirmAddAccounting = async (values) => {
    setAccountingModal(false);

    alert("xx");
    await addAccounting(values, async () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_accounting_created",
        type: "success",
        duration: 3000,
      });

      await addStock(
        {
          product_id: values.product_id,
          amount: values.piece,
          created_by: values.created_by,
          type: "out",
        },
        () => {
          toastMessage({
            title: "success",
            text: "message_stock_dropped",
            type: "success",
            duration: 3000,
          });
        }
      );
    });
  };

  const confirmUpdateAccounting = async (values) => {
    setAccountingModal(false);
    setAccountingModalData(null);
    await updateAccounting(values, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_accounting_updated",
        type: "success",
        duration: 3000,
      });
    });
  };

  const confirmDeleteAccounting = async () => {
    setAccountingDeleteModal(false);
    await removeAccountingById(selectedAccounting.id, () => {
      getRequiredData();
      toastMessage({
        title: "success",
        text: "message_accounting_deleted",
        type: "success",
        duration: 3000,
      });
    });
  };

  useEffect(() => {
    if (accountingModalData) {
      setAccountingModal(true);
    }
  }, [accountingModalData]);

  return (
    <PageLayout>
      <AccountingModal
        stocks={stocks}
        data={accountingModalData}
        title={accountingModalData ? t("edit_accounting") : t("new_accounting")}
        visibility={accountingModal}
        onCancel={() => {
          setAccountingModal(false);
          setAccountingModalData(null);
        }}
        onSave={(values) =>
          accountingModalData
            ? confirmUpdateAccounting(values)
            : confirmAddAccounting(values)
        }
        persons={persons}
      />
      <ConfirmModal
        title={t("delete_accounting")}
        visibility={accountingDeleteModal}
        close={() => setAccountingDeleteModal(false)}
        message={t("message_sure_to_delete")}
        buttons={[
          {
            label: t("no"),
            onClick: () => setAccountingDeleteModal(false),
            icon: <AiOutlineClose size={20} />,
          },
          {
            label: t("yes"),
            onClick: () => confirmDeleteAccounting(),
            icon: <LuCheck size={20} />,
          },
        ]}
      />

      <PageRow className="col-12">
        <PageColumn className="col-6">
          <TitleLabel label={t("accounting_list")} />
        </PageColumn>
        <PageColumn className="col-6 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            icon={<LuPlus size={20} />}
            onClick={() => setAccountingModal(true)}
          />
          {selectedAccounting && (
            <>
              <BasicButton
                label={t("edit")}
                icon={<LuPen size={15} />}
                onClick={() => {
                  setAccountingModalData(selectedAccounting);
                }}
              />
              <BasicButton
                label={t("delete")}
                icon={<LuTrash size={20} />}
                onClick={() => setAccountingDeleteModal(true)}
              />
            </>
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table tableOptions={tableData} tableTitle="Kişi Listesi" />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AccountingList;
