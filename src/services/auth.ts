import { ENDPOINTS } from "@/constants";
import type {
  ILoginRequest,
  ILoginResponse,
  IRefreshAccessTokenResponse,
} from "@/features/auth/types/auth.types";
import { api } from "@/services/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
    }),
    refreshAccessToken: builder.mutation<IRefreshAccessTokenResponse, void>({
      query: () => ({
        url: ENDPOINTS.AUTH.REFRESH,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRefreshAccessTokenMutation } = authApi;
