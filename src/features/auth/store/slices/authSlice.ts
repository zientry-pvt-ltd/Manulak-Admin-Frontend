import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IAuthState } from "@/features/auth";
import { AUTH_SLICE } from "@/features/auth/constants";
import {
  login,
  refreshAccessToken,
} from "@/features/auth/store/thunks/authThunk";

const initialState: IAuthState = {
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: AUTH_SLICE.NAME,
  initialState,
  reducers: {
    logout(state) {
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { refreshToken } = action.payload;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.isLoading = false;
      })

      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.refreshToken = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload ?? null;
        state.isLoading = false;
      });
  },
});

export const { logout, setError, setAuth } = authSlice.actions;
export default authSlice.reducer;
