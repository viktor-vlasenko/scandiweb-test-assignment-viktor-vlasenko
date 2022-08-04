import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    label: undefined,
    symbol: undefined,
  },
  reducers: {
    switchCurrency(state, action) {
      state.label = action.payload.label;
      state.symbol = action.payload.symbol;
    },
  },
});

export const currencyActions = currencySlice.actions;

export default currencySlice;
