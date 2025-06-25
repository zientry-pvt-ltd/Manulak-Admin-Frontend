export const SLICE_ACTIONS = {
  AUTH: {
    SLICE: "auth",
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    REFRESH_TOKEN: "auth/refreshToken",
    FETCH_PROFILE: "auth/fetchProfile",
  },
  APP: {
    SLICE: "app",
    INIT: "app/init",
    RESET: "app/reset",
  },
} as const;
