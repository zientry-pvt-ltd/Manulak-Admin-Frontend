export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/v1/auth/login",
    LOGOUT: "/v1/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    FETCH_PROFILE: "/v1/auth/user",
  },
  APP: {
    INIT: "/v1/app/init",
    RESET: "/v1/app/reset",
  },
} as const;
