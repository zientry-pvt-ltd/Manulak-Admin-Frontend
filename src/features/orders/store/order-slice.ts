import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";

type OrderState = {
  selectedOrderId: string | null;
};
const initialState: OrderState = {
  selectedOrderId: null,
};

const orderSlice = createSlice({
  name: SLICES.ORDER,
  initialState,
  reducers: {
    setSelectedOrderId(state, action: PayloadAction<string | null>) {
      state.selectedOrderId = action.payload;
    },
  },
});

export const { setSelectedOrderId } = orderSlice.actions;
export default orderSlice.reducer;
