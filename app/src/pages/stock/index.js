import React, { useState } from "react";
import PageRow from "../../ui/rows/pageRow";
import PageColumn from "../../ui/columns/pageColumn";
import TitleLabel from "../../ui/labels/titleLabel";
import PageLayout from "../../ui/layouts/pageLayout";
import Tabs from "../../ui/tabs";
import StockContent from "./stockContent";
import StockMovements from "./stockMovements";

const tabsOptions = [
  {
    icon: "",
    label: "stock_content",
    value: "stock_content",
  },
  {
    icon: "",
    label: "stock_movements",
    value: "stock_movements",
  },
];

const Stock = ({}) => {
  const [selectedTab, setSelectedTab] = useState(tabsOptions[0].value);

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Stok" />
        </PageColumn>
      </PageRow>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <Tabs
            className="mt10"
            options={tabsOptions}
            value={selectedTab}
            onChange={(val) => setSelectedTab(val)}
          />
        </PageColumn>
      </PageRow>

      {selectedTab == "stock_content" && <StockContent />}
      {selectedTab == "stock_movements" && <StockMovements />}
    </PageLayout>
  );
};

export default Stock;
