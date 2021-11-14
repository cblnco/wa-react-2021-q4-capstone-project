import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
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
    },
    updateQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const newProduct = { ...state.shoppingCart[id] };

      newProduct.quantity += increment;
      newProduct.subtotal = newProduct.quantity * newProduct.price;

      if (newProduct.quantity > 0) {
        state.shoppingCart = {
          ...state.shoppingCart,
          [id]: newProduct,
        };
      } else {
        delete state.shoppingCart[id];
      }

      state.totalUnits += increment;
      state.totalPrice += newProduct.price * increment;
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      const { quantity, subtotal } = state.shoppingCart[id];

      state.totalUnits -= quantity;
      state.totalPrice -= subtotal;
      delete state.shoppingCart[id];
    },
  },
});

export const { addToCart, updateQuantity, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
