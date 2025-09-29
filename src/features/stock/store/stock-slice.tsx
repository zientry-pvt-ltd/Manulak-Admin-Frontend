import { createSlice } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";
import type { IStockInfo } from "@/features/stock/types/stock.type";

type StockState = {
  stocks: IStockInfo[];
  existingSNW: number | null;
};

const initialState: StockState = {
  stocks: [],
  existingSNW: null,
};

const stockSlice = createSlice({
  name: SLICES.STOCK,
  initialState,
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
    addStock: (state, action) => {
      state.stocks.push(action.payload);
    },
    updateStock: (state, action) => {
      const index = state.stocks.findIndex(
        (stock) => stock.id === action.payload.id,
      );
      if (index !== -1) {
        state.stocks[index] = action.payload;
      }
    },
    removeStock: (state, action) => {
      state.stocks = state.stocks.filter(
        (stock) => stock.id !== action.payload,
      );
    },
    setExistingSNW: (state, action) => {
      state.existingSNW = action.payload;
    },
    clearStocks: (state) => {
      state.stocks = [];
    },
    clearExistingSNW: (state) => {
      state.existingSNW = null;
    },
  },
  extraReducers() {},
});

export const { setStocks, setExistingSNW, clearStocks, clearExistingSNW } =
  stockSlice.actions;

export default stockSlice.reducer;
