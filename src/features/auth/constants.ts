export const AUTH_SLICE = {
  NAME: "auth",
  ACTIONS: {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    REFRESH_TOKEN: "auth/refreshToken",
  },
} as const;

export const USER_SLICE = {
  NAME: "user",
  ACTIONS: {
    SET_PROFILE: "user/setProfile",
  },
} as const;

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh",
  USER_PROFILE: "/auth/user-profile",
} as const;

export const USER_ENDPOINTS = {
  GET_PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/update-profile",
} as const;

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_NOT_FOUND: "User account not found.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
};
