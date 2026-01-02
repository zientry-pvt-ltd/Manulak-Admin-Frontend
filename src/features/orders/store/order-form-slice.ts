import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";
import type { ProductCategory } from "@/features/products/constants";

type SelectedProduct = {
  productId: string;
  productName: string;
  productPrice: number;
  productCategory: ProductCategory;
  quantity: number;
};

type SelectedProductsGroup = {
  subtotal: number;
  list: SelectedProduct[];
};

type OrderFormState = {
  selectedProducts: SelectedProductsGroup;
  hasPlants: boolean;
};

const initialState: OrderFormState = {
  selectedProducts: {
    subtotal: 0,
    list: [],
  },
  hasPlants: false,
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
        productCategory: ProductCategory;
        quantity: number;
        availableQuantity: number;
      }>,
    ) => {
      const {
        productId,
        productName,
        productPrice,
        quantity,
        availableQuantity,
        productCategory,
      } = action.payload;

      const existing = state.selectedProducts.list.find(
        (p) => p.productId === productId,
      );

      if (existing) {
        const newQuantity = existing.quantity + quantity;
        existing.quantity =
          newQuantity > availableQuantity ? availableQuantity : newQuantity;
      } else {
        const addQuantity =
          quantity > availableQuantity ? availableQuantity : quantity;
        state.selectedProducts.list.push({
          productId,
          productName,
          productPrice,
          quantity: addQuantity,
          productCategory,
        });
      }

      state.selectedProducts.subtotal = state.selectedProducts.list.reduce(
        (sum, p) => sum + p.productPrice * p.quantity,
        0,
      );

      state.hasPlants = state.selectedProducts.list.some(
        (p) => p.productCategory === "PLANTS",
      );
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        availableQuantity: number;
      }>,
    ) => {
      const { productId, quantity, availableQuantity } = action.payload;
      const existing = state.selectedProducts.list.find(
        (p) => p.productId === productId,
      );
      if (existing) {
        existing.quantity =
          quantity > availableQuantity ? availableQuantity : quantity;
      }

      state.selectedProducts.subtotal = state.selectedProducts.list.reduce(
        (sum, p) => sum + p.productPrice * p.quantity,
        0,
      );

      state.hasPlants = state.selectedProducts.list.some(
        (p) => p.productCategory === "PLANTS",
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

      state.hasPlants = state.selectedProducts.list.some(
        (p) => p.productCategory === "PLANTS",
      );
    },

    clearSelectedProducts: (state) => {
      state.selectedProducts = {
        subtotal: 0,
        list: [],
      };

      state.hasPlants = false;
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
