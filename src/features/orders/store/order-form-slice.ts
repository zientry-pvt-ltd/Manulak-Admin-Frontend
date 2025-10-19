import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";

type SelectedProduct = {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
};

type SelectedProductsGroup = {
  subtotal: number;
  list: SelectedProduct[];
};

type OrderFormState = {
  selectedProducts: SelectedProductsGroup;
};

const initialState: OrderFormState = {
  selectedProducts: {
    subtotal: 0,
    list: [],
  },
};

const orderFormSlice = createSlice({
  name: SLICES.ORDER_FORM,
  initialState,
  reducers: {
    addProductToList: (
      state,
      action: PayloadAction<{
        productId: string;
        productName: string;
        productPrice: number;
        quantity?: number;
      }>,
    ) => {
      const {
        productId,
        productName,
        productPrice,
        quantity = 1,
      } = action.payload;

      const existing = state.selectedProducts.list.find(
        (p) => p.productId === productId,
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.selectedProducts.list.push({
          productId,
          productName,
          productPrice,
          quantity,
        });
      }

      // Recalculate subtotal
      state.selectedProducts.subtotal = state.selectedProducts.list.reduce(
        (sum, p) => sum + p.productPrice * p.quantity,
        0,
      );
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const { productId, quantity } = action.payload;
      const existing = state.selectedProducts.list.find(
        (p) => p.productId === productId,
      );
      if (existing) {
        existing.quantity = quantity;
      }

      state.selectedProducts.subtotal = state.selectedProducts.list.reduce(
        (sum, p) => sum + p.productPrice * p.quantity,
        0,
      );
    },

    removeProductFromList: (state, action: PayloadAction<string>) => {
      state.selectedProducts.list = state.selectedProducts.list.filter(
        (p) => p.productId !== action.payload,
      );

      state.selectedProducts.subtotal = state.selectedProducts.list.reduce(
        (sum, p) => sum + p.productPrice * p.quantity,
        0,
      );
    },

    clearSelectedProducts: (state) => {
      state.selectedProducts = {
        subtotal: 0,
        list: [],
      };
    },
  },
});

export const {
  addProductToList,
  updateProductQuantity,
  removeProductFromList,
  clearSelectedProducts,
} = orderFormSlice.actions;

export default orderFormSlice.reducer;
