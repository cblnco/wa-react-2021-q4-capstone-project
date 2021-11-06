import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import cartReducer from './slices/cart';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
