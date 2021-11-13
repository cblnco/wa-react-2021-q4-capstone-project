import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
