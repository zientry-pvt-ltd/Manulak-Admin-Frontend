import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";
import type { IProductInfo } from "@/features/products/types/product.type";
import { productApi } from "@/services/product";

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
    updateProductImageUrls(
      state,
      action: PayloadAction<{ id: string; imageUrl: string }>,
    ) {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.product_image_urls.push(action.payload.imageUrl);
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct.product_image_urls.push(
            action.payload.imageUrl,
          );
        }
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
    builder.addMatcher(
      productApi.endpoints.createProduct.matchFulfilled,
      (state, action) => {
        const newProduct = action.payload.data as IProductInfo;
        state.products.push(newProduct);
      },
    );
    builder.addMatcher(
      productApi.endpoints.addProductImage.matchFulfilled,
      (state, action) => {
        const updatedProduct = action.payload.data;
        const product = state.products.find((p) => p.id === updatedProduct.id);
        if (product) {
          product.product_image_urls = updatedProduct.product_image_urls;
          if (state.selectedProduct?.id === updatedProduct.id) {
            state.selectedProduct.product_image_urls =
              updatedProduct.product_image_urls;
          }
        }
      },
    );
    builder.addMatcher(
      productApi.endpoints.updateProduct.matchFulfilled,
      (state, action) => {
        const updatedProduct = action.payload.data;
        const idx = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (idx !== -1) {
          state.products[idx] = updatedProduct;
          if (state.selectedProduct?.id === updatedProduct.id) {
            state.selectedProduct = updatedProduct;
          }
        }
      },
    );
    builder.addMatcher(
      productApi.endpoints.deleteProduct.matchFulfilled,
      (state, action) => {
        const deletedProductId = action.meta.arg.originalArgs;
        state.products = state.products.filter(
          (p) => p.id !== deletedProductId,
        );
        if (state.selectedProduct?.id === deletedProductId) {
          state.selectedProduct = null;
        }
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
