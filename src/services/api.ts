import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

import { env } from "@/config/env";
import { API_TAG_TYPES, ENDPOINTS } from "@/constants";
import { logout, tokenReceived } from "@/features/auth/store/authSlice";
import type { IRefreshAccessTokenResponse } from "@/features/auth/types/auth.types";
import type { RootState } from "@/store";

const baseQuery = fetchBaseQuery({
  baseUrl: env.APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      ENDPOINTS.AUTH.REFRESH,
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // store the new token
      const refreshData = refreshResult.data as IRefreshAccessTokenResponse;
      api.dispatch(
        tokenReceived({
          access_token: refreshData.data.access_token,
          user: refreshData.data.user,
        }),
      );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "apiOne",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: API_TAG_TYPES,
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => "test",
  }),
});
