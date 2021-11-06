import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoppingCart: {},
  totalUnits: 0,
  totalPrice: 0,
};

export const CART_NAME = 'cart';

export const cartSlice = createSlice({
  name: CART_NAME,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { cartProduct } = action.payload;
      let newProduct = { ...cartProduct };
      const currentProduct = state.shoppingCart[cartProduct.id] || null;

      if (currentProduct) {
        const quantity = currentProduct.quantity + newProduct.quantity;
        const subtotal = quantity * currentProduct.price;
        newProduct = { ...currentProduct, quantity, subtotal };
      }

      state.shoppingCart = {
        ...state.shoppingCart,
        [cartProduct.id]: newProduct,
      };
      state.totalUnits += cartProduct.quantity;
      state.totalPrice += cartProduct.subtotal;

      console.log(state.shoppingCart);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
