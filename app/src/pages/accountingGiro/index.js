import React from "react";
import PageRow from "../../ui/rows/pageRow";
import PageColumn from "../../ui/columns/pageColumn";
import TitleLabel from "../../ui/labels/titleLabel";
import PageLayout from "../../ui/layouts/pageLayout";

const AccountingGiro = ({}) => {
  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label="Ciro" />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AccountingGiro;
