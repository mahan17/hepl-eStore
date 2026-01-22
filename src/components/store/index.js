import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './uiLogin';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import addressReducer from './addressSlice';
import adminProductsReducer from './adminProductSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
    cart: cartReducer,
    search: searchReducer,
    address: addressReducer,
    adminProducts: adminProductsReducer,
  },
});

export default store;
