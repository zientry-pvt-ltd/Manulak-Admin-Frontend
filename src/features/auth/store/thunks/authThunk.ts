import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ILoginResponsePayload } from "@/features/auth";
import { AUTH_ENDPOINTS, AUTH_SLICE } from "@/features/auth/constants";
import { setUserProfile } from "@/features/auth/store/slices/userSlice";
import { AxiosPrivateService } from "@/services/AxiosPrivateService";
import { AxiosPublicService } from "@/services/AxiosPublicService";
import type { CommonResponseDTO } from "@/types";

export const login = createAsyncThunk<
  ILoginResponsePayload,
  { email: string; password: string },
  { rejectValue: string }
>(
  AUTH_SLICE.ACTIONS.LOGIN,
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await AxiosPublicService.getInstance().post<
        CommonResponseDTO<ILoginResponsePayload>
      >(AUTH_ENDPOINTS.LOGIN, credentials);

      const { refreshToken, profile } = response.data.data;

      if (!refreshToken) return rejectWithValue("No refresh token received");
      if (!profile) return rejectWithValue("No user data received");

      dispatch(setUserProfile(profile));
      AxiosPrivateService.updateToken(refreshToken);

      return response.data.data;
    } catch (error: any) {
      let message = "Login failed";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }

      return rejectWithValue(message);
    }
  },
);

export const refreshAccessToken = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>(AUTH_SLICE.ACTIONS.REFRESH_TOKEN, async (_, { rejectWithValue }) => {
  try {
    const response = await AxiosPublicService.getInstance().get<
      CommonResponseDTO<string>
    >(AUTH_ENDPOINTS.REFRESH_TOKEN);

    const accessToken = response.data.data;

    if (!accessToken) return rejectWithValue("No access token received");

    AxiosPrivateService.updateToken(accessToken);

    return accessToken;
  } catch (error: any) {
    let message = "Failed to refresh access token";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    return rejectWithValue(message);
  }
});
