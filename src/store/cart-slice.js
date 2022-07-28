import { createSlice } from "@reduxjs/toolkit";

const calculateTotalAmount = () => {
  
}

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
      if (existingItem) {
        let hasSameAttributes = true;
        for (let i = 0; i < addedItem.selectedAttributes.length; i++) {
          if (
            addedItem.selectedAttributes[i].attributeItemId !==
            existingItem.selectedAttributes[i].attributeItemId
          ) {
            hasSameAttributes = false;
            state.items.push({ itemCount: 1, ...addedItem });
            break;
          }
        }
        if (hasSameAttributes) {
          existingItem.itemCount++;
        }
      } else {
        state.items.push({ itemCount: 1, ...addedItem });
      }
      state.totalItems++;
    },

    removeItem(state, action) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
