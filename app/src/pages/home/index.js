import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";

import PersonsList from "../persons/personsList";
import PersonsDetail from "../persons/personsDetail";

import AppointmentCalendar from "../appointment/appointmentCalendar";
import AppointmentList from "../appointment/appointmentList";

import NotesList from "../notes/notesList";

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
  LuStickyNote,
  LuPackage,
} from "react-icons/lu";
import { useTranslation } from "react-i18next";
import StockContent from "../stock/stockContent";
import StockMovements from "../stock/stockMovements";
import {
  getEnumPersonTypes,
  getEnumGenderTypes,
  getEnumCities,
  getEnumAppointmentTypes,
} from "../../services/enums";
import { useDispatch } from "react-redux";
import {
  setPersonTypes,
  setGenderTypes,
  setAppointmentTypes,
  setCities,
} from "../../redux/app/enums/enumsSlice";

const Home = () => {
  const [isExtended, setIsExtended] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    getEnums();
  }, []);

  const getEnums = async () => {
    const [enumPersonTypes, enumGenderTypes, enumCities, enumAppointmentTypes] =
      await Promise.all([
        getEnumPersonTypes(),
        getEnumGenderTypes(),
        getEnumCities(),
        getEnumAppointmentTypes(),
      ]);

    dispatch(setPersonTypes(enumPersonTypes));
    dispatch(setGenderTypes(enumGenderTypes));
    dispatch(setCities(enumCities));
    dispatch(setAppointmentTypes(enumAppointmentTypes));
  };

  const sampleMenu = [
    {
      id: "persons",
      label: t("persons"),
      link: "/persons-list",
      icon: <LuUser2 />,
    },
    {
      id: "appointment",
      label: t("appointment"),
      link: "/appointment",
      icon: <LuCalendarDays />,
      children: [
        {
          id: "appointment_list",
          label: t("appointment_list"),
          link: "/appointment-list",
        },
        {
          id: "appointment_calendar",
          label: t("appointment_calendar"),
          link: "/appointment-calendar",
        },
      ],
    },
    {
      id: "notes",
      label: t("notes"),
      link: "/notes",
      icon: <LuStickyNote />,
    },
    {
      id: "stock",
      label: t("stock"),
      link: "/stock",
      icon: <LuPackage />,
      children: [
        {
          id: "stock_content",
          label: t("stock_content"),
          link: "/stock-content",
        },
        {
          id: "stock_movements",
          label: t("stock_movements"),
          link: "/stock-movements",
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
          id: "product_definitions",
          label: t("product_definitions"),
          link: "/product-definitions",
        },
        {
          id: "product_list",
          label: t("product_list"),
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
          <Route
            path="/persons-detail/:person_id"
            element={<PersonsDetail />}
          />

          {/* appointment routes */}
          <Route path="/appointment-list" element={<AppointmentList />} />
          <Route
            path="/appointment-calendar"
            element={<AppointmentCalendar />}
          />

          {/* notes routes */}
          <Route path="/notes" element={<NotesList />} />

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
