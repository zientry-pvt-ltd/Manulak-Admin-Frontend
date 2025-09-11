import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";
import type { IProductInfo } from "@/features/products/types/product.type";
import { productApi } from "@/services/product";

export type ProductCategoryType = "electronics" | "clothing" | "home" | "books";

type ProductState = {
  products: IProductInfo[];
  selectedProduct: IProductInfo | null;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: SLICES.PRODUCT,
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProductInfo[]>) {
      state.products = action.payload;
    },
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct =
        state.products.find((p) => p.id === action.payload) || null;
    },
    updateSelectedProduct(state, action: PayloadAction<Partial<IProductInfo>>) {
      if (state.selectedProduct)
        state.selectedProduct = { ...state.selectedProduct, ...action.payload };
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    addProduct(state, action: PayloadAction<IProductInfo>) {
      state.products.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      if (state.selectedProduct?.id === action.payload) {
        state.selectedProduct = null;
      }
    },
    updateProduct(state, action: PayloadAction<IProductInfo>) {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.products[idx] = action.payload;
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload.data.entities;
      },
    );
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
