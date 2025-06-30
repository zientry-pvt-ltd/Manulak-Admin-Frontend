import { createAsyncThunk } from "@reduxjs/toolkit";

import type { ILoginResponsePayload } from "@/features/auth";
import { AUTH_ENDPOINTS, AUTH_SLICE } from "@/features/auth/constants";
import { setAuth } from "@/features/auth/store/slices/authSlice";
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

      const { refreshToken } = response.data.data;

      if (!refreshToken) return rejectWithValue("No refresh token received");
      // if (!profile) return rejectWithValue("No user data received");
      dispatch(
        setUserProfile({
          email: "arundeshan@gmail.com",
          firstName: "Arun",
          lastName: "Deshan",
          role: "ADMIN",
          profileUrl:
            "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          id: "1",
        }),
      );
      dispatch(setAuth(true));
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
