import React, { useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import Table from "../../../ui/table";
import PageLayout from "../../../ui/layouts/pageLayout";
import TitleLabel from "../../../ui/labels/titleLabel";
import BasicButton from "../../../ui/buttons/basicButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { productTypes } from "../../../constants/types";
import FormModal from "../../../ui/modals/formModal";
import FormRow from "../../../ui/rows/formRow";
import FormColumn from "../../../ui/columns/formColumn";
import FormField from "../../../ui/fields/formField";
import FormLabel from "../../../ui/labels/formLabel";
import TextInput from "../../../ui/inputs/textInput";
import SingleSelectInput from "../../../ui/inputs/singleSelectInput";
import TextArea from "../../../ui/inputs/textArea";
import { brandsData, productsData } from "../../../constants/data";

const stock_content = ({}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stockContentModal, setStockContentModal] = useState(false);
  const [selectedStockContent, setSelectedStockContent] = useState(null);

  const [formValues, setFormValues] = useState({
    product_type: "",
  });

  const initialTableData = {
    tableId: "stock_content",
    isSelectionMode: true,
    selectionMode: "single",
    getSelectionValue: (selectedData) => setSelectedStockContent(selectedData),
    columns: [
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
      {
        field: "lastModifiedAt",
        header: t("lastModifiedAt"),
        dataType: "date",
      },
    ],
    data: [
      {
        id: 1,
        product_type: 1,
        brand: 1,
        definition: "Lorem Ipsum",
        amount: "10",
        unit: "piece",
        lastModifiedAt: "14/01/2024 15:30",
      },
    ],
  };

  const stockContentFormBody = () => {
    return (
      <FormRow className="col-12">
        <FormColumn className="col-6">
          <FormField>
            <FormLabel label={t("product_type")} />
            <SingleSelectInput
              options={productTypes.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: t(item.label),
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, product_type: val })
              }
              value={formValues.product_type}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("brand")} />
            <SingleSelectInput
              options={brandsData.map((item) => {
                return {
                  ...item,
                  value: item.id,
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, productsData: val })
              }
              value={formValues.product}
            />
          </FormField>
        </FormColumn>
        <FormColumn className="col-6">
          <FormField className="mt10">
            <FormLabel label={t("product")} />
            <SingleSelectInput
              options={productsData.map((item) => {
                return {
                  ...item,
                  value: item.id,
                  label: item.definition,
                };
              })}
              onChange={(val) =>
                setFormValues({ ...formValues, productsData: val })
              }
              value={formValues.product}
            />
          </FormField>
          <FormField className="mt10">
            <FormLabel label={t("amount")} />
            <TextInput
              id="amount"
              value={formValues.amount}
              onChange={(val) => setFormValues({ ...formValues, amount: val })}
            />
          </FormField>
        </FormColumn>
      </FormRow>
    );
  };

  const [tableData, setTableData] = useState(initialTableData);

  return (
    <PageLayout>
      <FormModal
        title={t("stock_content")}
        visibility={stockContentModal}
        body={stockContentFormBody()}
        buttons={[
          {
            label: t("save"),
            onClick: () => console.log(formValues),
          },
          { label: t("cancel"), onClick: () => setStockContentModal(false) },
        ]}
      />

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("stock_content")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12 flex justify-content-flex-end gap5">
          <BasicButton
            label={t("new")}
            className="mt10"
            onClick={() => setStockContentModal(true)}
          />
          {selectedStockContent && (
            <BasicButton
              label={t("detail")}
              className="mt10"
              onClick={() =>
                navigate(`/persons-detail/${selectedStockContent.id}`)
              }
            />
          )}
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Table
            tableOptions={tableData}
            tableTitle="stock_content"
            className="mt10"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default stock_content;
