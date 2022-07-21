import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0, totalItems: 0 },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.totalItems = action.payload.totalItems;
    },
    addItem(state, action) {
      const addedItem = action.payload;
      const existingItem = state.items.find((item) => item.id === addedItem.id);
      
      state.items.push(addedItem);
      state.totalItems++;
    },
    removeItem(state, action) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
