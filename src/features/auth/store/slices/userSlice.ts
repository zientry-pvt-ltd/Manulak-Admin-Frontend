import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ILoginResponsePayload, IUserState } from "@/features/auth";
import { USER_SLICE } from "@/features/auth/constants";

const initialState: IUserState = {
  profile: {
    email: "arun",
    firstName: "Arun",
    lastName: "Deshan",
    id: "1",
    profileUrl:
      "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "ADMIN",
  },
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: USER_SLICE.NAME,
  initialState,
  reducers: {
    setUserProfile(
      state,
      action: PayloadAction<ILoginResponsePayload["profile"]>,
    ) {
      state.profile = action.payload;
    },
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
