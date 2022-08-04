import { createSlice } from "@reduxjs/toolkit";

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

    // Changes attribute value in cart
    changeItem(state, action) {
      const newAttributes = action.payload.newAttributes;
      const itemToChange = action.payload.item;
      
      // Selecting item in the cart
      const existingItem = state.items.find(
        (item) =>
          item.id === itemToChange.id &&
          hasSameAttributes(
            item.selectedAttributes,
            itemToChange.selectedAttributes
          )
      );
      // Selecting and changing attribute in the selected item
      const attributeToChange = existingItem.selectedAttributes.find(
        (attr) => attr.attributeId === newAttributes.attrId
      );
      attributeToChange.attributeItemId = newAttributes.itemId;

      // After attributes change. Finding out whether there is another item in the cart with the same attributes.
      const sameAttributesItemIndex = state.items.findIndex(
        (item) =>
          item !== existingItem &&
          item.id === existingItem.id &&
          hasSameAttributes(
            item.selectedAttributes,
            existingItem.selectedAttributes
          )
      );
      // If there is such an item, merging it with existingItem
      if (sameAttributesItemIndex >= 0) {
        existingItem.itemCount +=
          state.items[sameAttributesItemIndex].itemCount;
        state.items.splice(sameAttributesItemIndex, 1);
      }
      saveCartLocally(state);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
