import { configureStore } from "@reduxjs/toolkit";
import enumsReducer from "./enums/enumsSlice";
import toastMessageReducer from "./toastMessage/toastMessageSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    enums: enumsReducer,
    toastMessage: toastMessageReducer,
    user: userReducer,
  },
});

export default store;
