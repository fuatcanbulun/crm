import React, { useEffect, useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import TitleLabel from "../../../ui/labels/titleLabel";
import PageLayout from "../../../ui/layouts/pageLayout";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { getPersons } from "../../../services/persons";
import { useSelector } from "react-redux";
import {
  getAccountings,
  getAccountingsByDate,
} from "../../../services/accountings";
import moment from "moment/moment";

const AccountingAnalysis = ({}) => {
  const { t } = useTranslation();
  const { accountingTypes } = useSelector((state) => state.enums);
  const [persons, setPersons] = useState([]);
  const [accountings, setAccountings] = useState([]);
  const [chart1Data, setChart1Data] = useState([]);

  useEffect(() => {
    getChart1Data();
  }, []);

  const getChart1Data = async () => {
    const firstDayOfCurrentMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    const firstDayOfNextMonth = moment()
      .add(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    const [chartData] = await Promise.all([
      getAccountingsByDate(firstDayOfCurrentMonth, firstDayOfNextMonth),
    ]);

    const options = {
      chart: {
        id: "chart1",
      },
      xaxis: {
        categories: chartData.categories,
      },
    };
    const series = [
      {
        name: "series1",
        data: chartData.data,
      },
    ];

    setChart1Data({ options: options, series: series });
  };

  // Chart 1

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("accounting_analysis")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-6">
          {chart1Data?.options && (
            <Chart
              options={chart1Data.options}
              series={chart1Data.series}
              height={320}
              type="bar"
            />
          )}
        </PageColumn>
        <PageColumn className="col-6">
          {/* <Chart
            options={chart3Options}
            series={chart3Series}
            height={320}
            type="area"
          /> */}
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AccountingAnalysis;
