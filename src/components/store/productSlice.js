import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('http://localhost:5000/api/products');
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    selectedCategory: 'all',
    status: 'idle',
  },
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;

        // Protect against empty DB
        state.categories = [
          'all',
          ...new Set(action.payload.map(p => p.category || 'others')),
        ];

        state.status = 'success';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setCategory } = productsSlice.actions;
export default productsSlice.reducer;