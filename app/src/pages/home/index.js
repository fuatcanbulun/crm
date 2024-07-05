import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
import {
  getEnumPersonTypes,
  getEnumGenderTypes,
  getEnumCities,
  getEnumAppointmentTypes,
  getEnumProductTypes,
  getEnumStockMovementTypes,
  getEnumAccountingTypes,
  getEnumCurrencyTypes,
  getEnumPaymentTypes,
  getEnumIncomeTypes,
  getEnumExpenseTypes,
  getEnumAppointmentStatusTypes,
} from "../../services/enums";
import { useDispatch } from "react-redux";
import {
  setPersonTypes,
  setGenderTypes,
  setAppointmentTypes,
  setCities,
  setProductTypes,
  setStockMovementTypes,
  setAccountingTypes,
  setCurrencyTypes,
  setPaymentTypes,
  setIncomeTypes,
  setExpenseTypes,
  setAppointmentStatusTypes,
} from "../../redux/app/enums/enumsSlice";
import { setUserInfo } from "../../redux/app/user/userSlice";
import { jwtDecode } from "jwt-decode";

// pages
import PersonsList from "../persons/personsList";
import PersonsDetail from "../persons/personsDetail";
import AppointmentCalendar from "../appointment/appointmentCalendar";
import AppointmentList from "../appointment/appointmentList";
import NotesList from "../notes/notesList";
import ProductsList from "../products/productsList";
import ProductsBrands from "../products/productsBrands";
import AccountingAnalysis from "../accounting/accountingAnalysis";
import AccountingList from "../accounting/accountingList";
import StocksList from "../stocks/stocksList";
import StocksMovements from "../stocks/stocksMovements";

const Home = () => {
  const [isExtended, setIsExtended] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("access_token");
  const decoded = jwtDecode(token);

  useEffect(() => {
    getEnums();
  }, []);

  const getEnums = async () => {
    const [
      enumPersonTypes,
      enumGenderTypes,
      enumCities,
      enumAppointmentTypes,
      enumProductTypes,
      enumStockMovementTypes,
      enumAccountingTypes,
      enumCurrencyTypes,
      enumPaymentTypes,
      enumIncomeTypes,
      enumExpenseTypes,
      enumAppointmentStatusTypes,
    ] = await Promise.all([
      getEnumPersonTypes(),
      getEnumGenderTypes(),
      getEnumCities(),
      getEnumAppointmentTypes(),
      getEnumProductTypes(),
      getEnumStockMovementTypes(),
      getEnumAccountingTypes(),
      getEnumCurrencyTypes(),
      getEnumPaymentTypes(),
      getEnumIncomeTypes(),
      getEnumExpenseTypes(),
      getEnumAppointmentStatusTypes(),
    ]);

    console.log("enumAppointmentStatusTypes", enumAppointmentStatusTypes);

    dispatch(setPersonTypes(enumPersonTypes));
    dispatch(setGenderTypes(enumGenderTypes));
    dispatch(setCities(enumCities));
    dispatch(setAppointmentTypes(enumAppointmentTypes));
    dispatch(setProductTypes(enumProductTypes));
    dispatch(setStockMovementTypes(enumStockMovementTypes));
    dispatch(setAccountingTypes(enumAccountingTypes));
    dispatch(setCurrencyTypes(enumCurrencyTypes));
    dispatch(setPaymentTypes(enumPaymentTypes));
    dispatch(setIncomeTypes(enumIncomeTypes));
    dispatch(setExpenseTypes(enumExpenseTypes));
    dispatch(setAppointmentStatusTypes(enumAppointmentStatusTypes));
    dispatch(
      setUserInfo({ user_name: decoded.first_name + " " + decoded.last_name })
    );
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
          id: "stock_list",
          label: t("stock_list"),
          link: "/stock-list",
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
          id: "accounting_list",
          label: t("accounting_list"),
          link: "/accounting-list",
        },
        {
          id: "accounting_analysis",
          label: t("accounting_analysis"),
          link: "/accounting-analysis",
        },
      ],
    },
    {
      id: "products",
      label: t("products"),
      icon: <LuSpade />,
      children: [
        {
          id: "products_list",
          label: t("product_list"),
          link: "/products-list",
        },
        {
          id: "products_brands",
          label: t("brands"),
          link: "/products-brands",
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
        <HeaderLayout
          isExtended={isExtended}
          setIsExtended={setIsExtended}
        ></HeaderLayout>

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
          <Route path="/stock-list" element={<StocksList />} />
          <Route path="/stock-movements" element={<StocksMovements />} />

          {/* product routes */}
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/products-brands" element={<ProductsBrands />} />

          {/* accounting routes */}
          <Route path="/accounting-analysis" element={<AccountingAnalysis />} />
          <Route path="/accounting-list" element={<AccountingList />} />
        </Routes>
      </ContentLayout>
    </ContainerLayout>
  );
};

export default Home;
