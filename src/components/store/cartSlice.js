import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    isInitialized: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity || 0;
      state.isInitialized = true;
    },

    addToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        item => item._id === newItem._id
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          category: newItem.category,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find(
        item => item._id === id
      );

      if (!existingItem) return;

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          item => item._id !== id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      console.log("Removing ID:", action.payload);
    }

  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
