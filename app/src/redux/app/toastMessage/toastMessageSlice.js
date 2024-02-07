import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const toastMessageSlice = createSlice({
  name: "enums",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage } = toastMessageSlice.actions;
export default toastMessageSlice.reducer;
