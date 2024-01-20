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
    label: "stockContent",
    value: "stockContent",
  },
  {
    icon: "",
    label: "stockMovements",
    value: "stockMovements",
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

      {selectedTab == "stockContent" && <StockContent />}
      {selectedTab == "stockMovements" && <StockMovements />}
    </PageLayout>
  );
};

export default Stock;
