import { createSlice } from "@reduxjs/toolkit";

const hasSameAttributes = (attributesArray1, attributesArray2) => {
  for (let i = 0; i < attributesArray1.length; i++) {
    if (
      attributesArray1[i].attributeItemId !==
      attributesArray2[i].attributeItemId
    ) {
      return false;
    }
  }
  return true;
};

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
        if (
          hasSameAttributes(
            addedItem.selectedAttributes,
            existingItem.selectedAttributes
          )
        ) {
          existingItem.itemCount++;
        } else {
          state.items.push({ itemCount: 1, ...addedItem });
        }
      } else {
        state.items.push({ itemCount: 1, ...addedItem });
      }
      state.totalItems++;
    },

    removeItem(state, action) {
      const itemToRemove = action.payload;
      const itemCartIndex = state.items.findIndex(
        (item) =>
          item.id === itemToRemove.id &&
          hasSameAttributes(
            item.selectedAttributes,
            itemToRemove.selectedAttributes
          )
      );
      if (state.items[itemCartIndex].itemCount === 1) {
        state.items.splice(itemCartIndex, 1);
      } else {
        state.items[itemCartIndex].itemCount--;
      }
      state.totalItems--;
    },

    changeItem(state, action) {
      const newAttributes = action.payload.newAttributes;
      const itemToChange = action.payload.item;
      const existingItem = state.items.find(
        (item) =>
          item.id === itemToChange.id &&
          hasSameAttributes(
            item.selectedAttributes,
            itemToChange.selectedAttributes
          )
      );
      const attributeToChange = existingItem.selectedAttributes.find(
        (attr) => attr.attributeId === newAttributes.attrId
      );
      attributeToChange.attributeItemId = newAttributes.itemId;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
