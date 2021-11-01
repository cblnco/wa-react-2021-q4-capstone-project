import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isLoading: true,
};

export const PRODUCTS_NAME = 'products';

export const productsSlice = createSlice({
  name: PRODUCTS_NAME,
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      const { data, isLoading } = action.payload;
      state.data = data;
      state.isLoading = isLoading;
    },
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
