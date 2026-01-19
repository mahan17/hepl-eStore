import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './uiLogin';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import addressReducer from './addressSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
    cart: cartReducer,
    search: searchReducer,
    address: addressReducer,
  },
});

export default store;