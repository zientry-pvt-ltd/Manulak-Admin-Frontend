import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IUserInfo } from "@/features/auth";
import { authApi } from "@/services";

interface AuthState {
  accessToken: string | null;
  userInfo: IUserInfo | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.userInfo = action.payload.data.user;
        state.isAuthenticated = true;
      },
    );

    builder.addMatcher(
      authApi.endpoints.refreshAccessToken.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.userInfo = action.payload.data.user;
        state.isAuthenticated = true;
      },
    );
  },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
