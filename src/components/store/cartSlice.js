import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* 🔹 FETCH USER CART */
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (username) => {
    console.log("Fetching cart for: ", username);
    const res = await fetch(
      `http://localhost:5000/api/cart/${encodeURIComponent(username)}`
    );
    return await res.json();
  }
);

/* 🔹 SAVE USER CART */
export const saveUserCart = createAsyncThunk(
  "cart/saveUserCart",
  async ({ username, items }) => {
    const res = await fetch(
      `http://localhost:5000/api/cart/${encodeURIComponent(username)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }
    );
    return await res.json();
  }
);

// !Updating cart and removing
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ username, productId, type }) => {
    const res = await fetch(
      `http://localhost:5000/api/cart/${encodeURIComponent(username)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, type }),
      }
    );
    return await res.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
    },
    setCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(saveUserCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
      });
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
