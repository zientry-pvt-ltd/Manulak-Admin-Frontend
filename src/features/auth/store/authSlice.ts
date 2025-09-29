import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { SLICES } from "@/constants";
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
  name: SLICES.AUTH,
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
    tokenReceived(
      state,
      action: PayloadAction<{ access_token: string; user: IUserInfo }>,
    ) {
      state.accessToken = action.payload.access_token;
      state.userInfo = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.data.access_token;
        state.userInfo = action.payload.data.user;
        state.isAuthenticated = true;
      },
    );

    builder.addMatcher(
      authApi.endpoints.refreshAccessToken.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.data.access_token;
        state.userInfo = action.payload.data.user;
        state.isAuthenticated = true;
      },
    );

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.userInfo = null;
    });
  },
});

export const { logout, setAuth, tokenReceived } = authSlice.actions;
export default authSlice.reducer;
