import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalItems: 0 },
  reducers: {
    replaceCart(state) {
      const loadedCart = loadSavedCart();
      state.items = loadedCart.items;
      state.totalItems = loadedCart.totalItems;
    },

    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      saveCartLocally(state);
    },

    addItem(state, action) {
      const addedItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === addedItem.id &&
          hasSameAttributes(
            addedItem.selectedAttributes,
            item.selectedAttributes
          )
      );
      if (existingItem) {
        existingItem.itemCount++;
      } else {
        state.items.push({ itemCount: 1, ...addedItem });
      }
      state.totalItems++;
      saveCartLocally(state);
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
      saveCartLocally(state);
    },
  },
});

/**
 * Helping function to determine whether 2 products in the cart have the same selected attributes.
 */
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

/**
 * Saves cart in local storage
 */
const saveCartLocally = (cart) => {
  localStorage.setItem("Cart", JSON.stringify(cart));
};

/**
 * Loads cart from local storage
 */
const loadSavedCart = () => {
  return JSON.parse(localStorage.getItem("Cart"));
};

export const cartActions = cartSlice.actions;

export default cartSlice;
