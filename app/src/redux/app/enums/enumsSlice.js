import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personTypes: [],
  genderTypes: [],
  cities: [],
  appointmentTypes: [],
  productTypes: [],
  stockMovementTypes: [],
  accountingTypes: [],
  currencyTypes: [],
  incomeTypes: [],
  expenseTypes: [],
  paymentTypes: [],
  appointmentStatusTypes: [],
};

export const enumsSlice = createSlice({
  name: "enums",
  initialState,
  reducers: {
    setPersonTypes: (state, action) => {
      state.personTypes = action.payload;
    },
    setGenderTypes: (state, action) => {
      state.genderTypes = action.payload;
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setAppointmentTypes: (state, action) => {
      state.appointmentTypes = action.payload;
    },
    setProductTypes: (state, action) => {
      state.productTypes = action.payload;
    },
    setStockMovementTypes: (state, action) => {
      state.stockMovementTypes = action.payload;
    },
    setAccountingTypes: (state, action) => {
      state.accountingTypes = action.payload;
    },
    setCurrencyTypes: (state, action) => {
      state.currencyTypes = action.payload;
    },
    setIncomeTypes: (state, action) => {
      state.incomeTypes = action.payload;
    },
    setExpenseTypes: (state, action) => {
      state.expenseTypes = action.payload;
    },
    setPaymentTypes: (state, action) => {
      state.paymentTypes = action.payload;
    },
    setAppointmentStatusTypes: (state, action) => {
      state.appointmentStatusTypes = action.payload;
    },
  },
});

export const {
  setPersonTypes,
  setGenderTypes,
  setCities,
  setAppointmentTypes,
  setProductTypes,
  setStockMovementTypes,
  setAccountingTypes,
  setCurrencyTypes,
  setIncomeTypes,
  setExpenseTypes,
  setPaymentTypes,
  setAppointmentStatusTypes,
} = enumsSlice.actions;
export default enumsSlice.reducer;
