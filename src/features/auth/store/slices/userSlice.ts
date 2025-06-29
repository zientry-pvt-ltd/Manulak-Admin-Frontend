import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ILoginResponsePayload, IUserState } from "@/features/auth";
import { USER_SLICE } from "@/features/auth/constants";

const initialState: IUserState = {
  profile: {
    email: "arun",
    firstName: "Arun",
    lastName: "Kumar",
    id: "1",
    profileUrl: "https://example.com/profile.jpg",
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
