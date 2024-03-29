import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (!state.products) state.products = initialState.products;
      const p = state.products?.find((p) => p.id === action.payload.id);
      if (p) {
        p.quantity += action.payload.quantity;
      } else {
        state.products = [...state.products, action.payload];
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload.id);
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
