import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { sampleProducts } from "@/features/products/constants";
import type { Product } from "@/features/products/types/product.type";

export type ProductCategoryType = "electronics" | "clothing" | "home" | "books";

type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
};

const initialState: ProductState = {
  products: sampleProducts,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct =
        state.products.find((p) => p.id === action.payload) || null;
    },
    updateSelectedProduct(state, action: PayloadAction<Partial<Product>>) {
      if (state.selectedProduct)
        state.selectedProduct = { ...state.selectedProduct, ...action.payload };
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null;
      }
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.products[idx] = action.payload;
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      }
    },
  },
});

export const {
  setProducts,
  selectProduct,
  clearSelectedProduct,
  addProduct,
  removeProduct,
  updateProduct,
  updateSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
