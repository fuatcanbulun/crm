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

  useEffect(() => {
    if (accountingTypes?.length > 0) {
      getRequiredData();
    }
  }, [accountingTypes]);

  const getRequiredData = async () => {
    const [accountingsData, personsData, test] = await Promise.all([
      getAccountings(),
      getPersons(),
      getAccountingsByDate("2024-03-01", "2024-04-01"),
    ]);

    console.log("test", test);
    // console.log("accountingsData", accountingsData);
    // setPersons(personsData);
    // setAccountings(accountingsData);
  };

  // Chart 1
  const chart1Options = {
    chart: {
      id: "chart1",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };
  const chart1Series = [
    {
      name: "series1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  // Chart 2
  const chart2Options = {
    chart: {
      type: "donut",
    },
  };
  const chart2Series = [44, 55, 41, 17, 15];

  // Chart 3
  const chart3Options = {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  const chart3Series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  // Chart 4
  const chart4Options = {
    chart: {
      type: "donut",
    },
  };
  const chart4Series = [44, 55, 41, 17, 15];

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("accounting_analysis")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-6">
          <Chart
            options={chart1Options}
            series={chart1Series}
            height={320}
            type="bar"
          />
        </PageColumn>
        <PageColumn className="col-6">
          <Chart
            options={chart3Options}
            series={chart3Series}
            height={320}
            type="area"
          />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-6">
          <Chart
            options={chart2Options}
            series={chart2Series}
            height={320}
            type="donut"
          />
        </PageColumn>
        <PageColumn className="col-6">
          <Chart
            options={chart2Options}
            series={chart2Series}
            height={320}
            type="donut"
          />
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AccountingAnalysis;
