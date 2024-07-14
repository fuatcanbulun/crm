import React, { useEffect, useState } from "react";
import PageRow from "../../../ui/rows/pageRow";
import PageColumn from "../../../ui/columns/pageColumn";
import SubTitleLabel from "../../../ui/labels/subTitleLabel";
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
import InfoLine from "../../../ui/info/infoLine";
import HSeperator from "../../../ui/seperators/hSeperator";

const AccountingAnalysis = ({}) => {
  const { t } = useTranslation();
  const { accountingTypes } = useSelector((state) => state.enums);
  const [persons, setPersons] = useState([]);
  const [accountings, setAccountings] = useState([]);
  const [monthlyChart1, setMonthlyChart1] = useState({});
  const [monthlyChart2, setMonthlyChart2] = useState({});

  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [dailyExpense, setDailyExpense] = useState(0);
  const currentMonth = moment().format("MMMM YYYY");

  useEffect(() => {
    getRequiredData();
  }, []);

  const getRequiredData = async () => {
    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
    const firstDayOfCurrentMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    const firstDayOfNextMonth = moment()
      .add(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    const [accountingsToday, accountingsThisMonth] = await Promise.all([
      getAccountingsByDate(today, tomorrow),
      getAccountingsByDate(firstDayOfCurrentMonth, firstDayOfNextMonth),
    ]);
    const calculateTotalAmountByDate = (data) => {
      return data.reduce((totalAmountByDate, accounting) => {
        const date = accounting.date;
        const amount = Number(accounting.amount);
        totalAmountByDate[date] = (totalAmountByDate[date] || 0) + amount;
        return totalAmountByDate;
      }, {});
    };

    const totalAmountByDate = calculateTotalAmountByDate(accountingsThisMonth);
    const categories = Object.keys(totalAmountByDate);
    const categoriesData = categories.map((date) => totalAmountByDate[date]);

    console.log("accountingsToday", accountingsToday);
    console.log("accountingsThisMonth", accountingsThisMonth);

    const chart1Options = {
      chart: {
        id: "monthlyChart",
      },
      xaxis: {
        categories: categories,
      },
    };
    const chart1Series = [
      {
        name: "series1",
        data: categoriesData,
      },
    ];

    const monthIncome = accountingsThisMonth
      .filter(
        (item) =>
          item.accounting_type_id == "61a4bfd9-9027-43b8-8e06-e0e60c31eee3"
      )
      .reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.amount);
      }, 0);

    const dayIncome = accountingsToday
      .filter(
        (item) =>
          item.accounting_type_id == "61a4bfd9-9027-43b8-8e06-e0e60c31eee3"
      )
      .reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.amount);
      }, 0);

    const monthExpense = accountingsThisMonth
      .filter(
        (item) =>
          item.accounting_type_id == "eab33cee-bfc8-4ac9-8c45-452dfda79d2e"
      )
      .reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.amount);
      }, 0);

    const dayExpense = accountingsToday
      .filter(
        (item) =>
          item.accounting_type_id == "eab33cee-bfc8-4ac9-8c45-452dfda79d2e"
      )
      .reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.amount);
      }, 0);

    let monthlyHairCare = 0;
    let monthlyProductSale = 0;
    let monthlyApplication = 0;

    for (const accounting of accountingsThisMonth) {
      if (
        accounting.accounting_model_id ===
        "d9683b4b-5d25-4a67-9029-233b8479beda"
      ) {
        monthlyHairCare = monthlyHairCare + Number(accounting.amount);
      } else if (
        accounting.accounting_model_id ===
        "909e3de1-7e05-42bd-9ddb-8695bfc387f6"
      ) {
        monthlyProductSale = monthlyProductSale + Number(accounting.amount);
      } else if (
        accounting.accounting_model_id ===
        "cde29726-ff77-4d3c-831b-0cc1e734311a"
      ) {
        monthlyApplication = monthlyApplication + Number(accounting.amount);
      }
    }

    const chart2Options = {
      chart: {
        type: "donut",
      },
      labels: [t("hair_care"), t("product_sale"), t("hair_application")],
      legend: {
        show: true,
        position: "bottom",
      },
    };
    const chart2Series = [
      monthlyHairCare,
      monthlyProductSale,
      monthlyApplication,
    ];

    setMonthlyChart1({ options: chart1Options, series: chart1Series });
    setMonthlyChart2({ options: chart2Options, series: chart2Series });
    setMonthlyIncome(monthIncome);
    setDailyIncome(dayIncome);
    setMonthlyExpense(monthExpense);
    setDailyExpense(dayExpense);
  };

  return (
    <PageLayout>
      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("accounting_analysis")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <HSeperator />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-4">
          <SubTitleLabel label={t("income")} />
          <InfoLine label={t("daily_income")} value={dailyIncome} />
          <InfoLine
            label={`${t("monthly_income")} (${currentMonth})`}
            value={monthlyIncome}
          />
        </PageColumn>
        <PageColumn className="col-2"></PageColumn>
        <PageColumn className="col-4">
          <SubTitleLabel label={t("expense")} />
          <InfoLine label={t("daily_expense")} value={dailyExpense} />
          <InfoLine
            label={`${t("monthly_expense")} (${currentMonth})`}
            value={monthlyExpense}
          />
        </PageColumn>
        <PageColumn className="col-2"></PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <HSeperator />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-12">
          <TitleLabel label={t("monthly_income_distribution")} />
        </PageColumn>
      </PageRow>

      <PageRow className="col-12">
        <PageColumn className="col-3">
          {monthlyChart2?.options && (
            <Chart
              options={monthlyChart2.options}
              series={monthlyChart2.series}
              height={320}
              type="donut"
            />
          )}
        </PageColumn>
        <PageColumn className="col-9">
          {monthlyChart1?.options && (
            <Chart
              options={monthlyChart1.options}
              series={monthlyChart1.series}
              height={320}
              type="bar"
            />
          )}
        </PageColumn>
      </PageRow>
    </PageLayout>
  );
};

export default AccountingAnalysis;
