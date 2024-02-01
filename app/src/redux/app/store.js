import { configureStore } from "@reduxjs/toolkit";
import enumsReducer from "./enums/enumsSlice";

const store = configureStore({
  reducer: {
    enums: enumsReducer,
  },
});

export default store;
