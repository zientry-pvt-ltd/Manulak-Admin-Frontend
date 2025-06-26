import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { CommonResponseDTO } from "@/customTypes/api.types";
import type {
  IAuthState,
  ILoginResponsePayload,
} from "@/customTypes/auth.types";
import { AxiosPrivateService } from "@/services/AxiosPrivateService";
import { AxiosPublicService } from "@/services/AxiosPublicService";
import { SLICE_ACTIONS } from "@/store/constants/actionTypes";
import { ENDPOINTS } from "@/store/constants/apiTypes";

const initialState: IAuthState = {
  userInfo: {
    firstName: "Arun",
    lastName: "Deshan",
    role: "ADMIN",
  },
  refreshToken: null,
  isAuthenticated: false,
  error: null,
};
export const login = createAsyncThunk<
  ILoginResponsePayload,
  { email: string; password: string },
  { rejectValue: string }
>(SLICE_ACTIONS.AUTH.LOGIN, async (credentials, { rejectWithValue }) => {
  try {
    const response = await AxiosPublicService.getInstance().post<
      CommonResponseDTO<ILoginResponsePayload>
    >("/auth/login", credentials);

    const { refreshToken } = response.data.data;
    if (!refreshToken) return rejectWithValue("No refresh token received");

    AxiosPrivateService.updateToken(refreshToken);
    return response.data.data;
  } catch (error: any) {
    let message = "Login failed";

    if (error.response && error.response.data) {
      message = error.response.data.message || message;
    } else if (error.message) {
      message = error.message;
    }

    return rejectWithValue(message);
  }
});

export const fetchUserProfile = createAsyncThunk<
  { fullName: string; email: string; role: string }, // Return type
  void, // No arguments needed
  { rejectValue: string }
>(SLICE_ACTIONS.AUTH.FETCH_PROFILE, async (_, { rejectWithValue }) => {
  try {
    const response = await AxiosPrivateService.getInstance().get<
      CommonResponseDTO<{ fullName: string; email: string; role: string }>
    >(ENDPOINTS.AUTH.FETCH_PROFILE);

    return response.data.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch profile";
    return rejectWithValue(message);
  }
});

export const refreshAccessToken = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>(SLICE_ACTIONS.AUTH.REFRESH_TOKEN, async (_, { rejectWithValue }) => {
  try {
    const response = await AxiosPublicService.getInstance().get<
      CommonResponseDTO<string>
    >(ENDPOINTS.AUTH.REFRESH_TOKEN);
    const accessToken = response.data.data;

    if (!accessToken) return rejectWithValue("No access token received");
    AxiosPrivateService.updateToken(accessToken);

    return accessToken;
  } catch (error: any) {
    let message = "Failed to refresh access token";
    if (error.response && error.response.data) {
      message = error.response.data.message || message;
    } else if (error.message) {
      message = error.message;
    }

    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: SLICE_ACTIONS.AUTH.SLICE,
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
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
      .addCase(login.pending, () => {})
      .addCase(login.fulfilled, (state, action) => {
        const { refreshToken, userInfo } = action.payload;
        state.userInfo = userInfo;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? null;
      })

      .addCase(refreshAccessToken.pending, () => {})
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.refreshToken = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload ?? null;
      });
  },
});

export const { logout, setError, setAuth } = authSlice.actions;
export default authSlice.reducer;
