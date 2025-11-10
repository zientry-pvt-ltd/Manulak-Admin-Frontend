import { createSlice } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";

type StockState = {
  todayRevenue?: number | null;
};

const initialState: StockState = {
  todayRevenue: null,
};

const dashboardSlice = createSlice({
  name: SLICES.DASHBOARD,
  initialState,
  reducers: {
    setTodayRevenue(state, action: { payload: number | null }) {
      state.todayRevenue = action.payload;
    },
  },
  extraReducers() {},
});

export const { setTodayRevenue } = dashboardSlice.actions;

export default dashboardSlice.reducer;
