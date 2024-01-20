import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import PersonsList from "../persons/personsList";
import PersonsDetail from "../persons/personsDetail";

import AppointmentCalendar from "../appointment/appointmentCalendar";
import AppointmentList from "../appointment/appointmentList";

import Stock from "../stock";
import ProductDescriptions from "../productDescriptions";
import ProductList from "../productList";
import AccountingGiro from "../accountingGiro";
import AccountingRecord from "../accountingRecord";
import SideLayout from "../../ui/layouts/sideLayout";
import ContainerLayout from "../../ui/layouts/containerLayout";
import ContentLayout from "../../ui/layouts/contentLayout";
import HeaderLayout from "../../ui/layouts/headerLayout";
import {
  LuUser2,
  LuCalendarDays,
  LuSpade,
  LuWallet2,
  LuPackage,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import StockContent from "../stock/stockContent";
import StockMovements from "../stock/stockMovements";

const Home = () => {
  const [isExtended, setIsExtended] = useState(true);
  const { t } = useTranslation();

  const sampleMenu = [
    {
      id: "persons",
      label: t("persons"),
      link: "/persons",
      icon: <LuUser2 />,
      children: [
        {
          id: "personsList",
          label: t("personsList"),
          link: "/persons-list",
        },
      ],
    },
    {
      id: "appointment",
      label: t("appointment"),
      link: "/appointment",
      icon: <LuCalendarDays />,
      children: [
        {
          id: "appointmentList",
          label: t("appointmentList"),
          link: "/appointment-list",
        },
        {
          id: "appointmentCalendar",
          label: t("appointmentCalendar"),
          link: "/appointment-calendar",
        },
      ],
    },
    {
      id: "stock",
      label: t("stock"),
      link: "/stock",
      icon: <LuPackage />,
      children: [
        {
          id: "stockContent",
          label: t("stockContent"),
          link: "/stock-content",
        },
        {
          id: "stockMovements",
          label: t("stockMovements"),
          link: "/appointment-calendar",
        },
      ],
    },
    {
      id: "accounting",
      label: t("accounting"),
      icon: <LuWallet2 />,
      children: [
        {
          id: "giro",
          label: t("giro"),
          link: "/giro",
        },
        {
          id: "incomeExpense",
          label: t("incomeExpense"),
          link: "/income-expense",
        },
      ],
    },
    {
      id: "products",
      label: t("products"),
      icon: <LuSpade />,
      children: [
        {
          id: "productDefinitions",
          label: t("productDefinitions"),
          link: "/product-definitions",
        },
        {
          id: "productList",
          label: t("productList"),
          link: "/product-list",
        },
      ],
    },
  ];

  return (
    <ContainerLayout>
      <SideLayout
        menuData={sampleMenu}
        isExtended={isExtended}
        setIsExtended={setIsExtended}
      />

      <ContentLayout isExtended={isExtended}>
        <HeaderLayout></HeaderLayout>

        <Routes>
          {/* person routes */}
          <Route path="/persons-list" element={<PersonsList />} />
          <Route path="/persons-detail/:id" element={<PersonsDetail />} />

          {/* appointment routes */}
          <Route path="/appointment-list" element={<AppointmentList />} />
          <Route
            path="/appointment-calendar"
            element={<AppointmentCalendar />}
          />

          {/* stock routes */}
          <Route path="/stock-content" element={<StockContent />} />
          <Route path="/stock-movements" element={<StockMovements />} />

          <Route
            path="/product-descriptions"
            element={<ProductDescriptions />}
          />

          <Route path="/product-list" element={<ProductList />} />
          <Route path="/accounting-giro" element={<AccountingGiro />} />
          <Route path="/accounting-record" element={<AccountingRecord />} />
        </Routes>
      </ContentLayout>
    </ContainerLayout>
  );
};

export default Home;
