import { configureStore } from "@reduxjs/toolkit/";

import cartSlice from "./cart-slice";
import currencySlice from "./currency-slice";

const store = configureStore({
  reducer: { currency: currencySlice.reducer, cart: cartSlice.reducer },
});

export default store;
