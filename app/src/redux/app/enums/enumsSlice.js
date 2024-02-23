import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personTypes: [],
  genderTypes: [],
  cities: [],
  appointmentTypes: [],
  productTypes: [],
  stockMovementTypes: [],
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
  },
});

export const {
  setPersonTypes,
  setGenderTypes,
  setCities,
  setAppointmentTypes,
  setProductTypes,
  setStockMovementTypes,
} = enumsSlice.actions;
export default enumsSlice.reducer;
