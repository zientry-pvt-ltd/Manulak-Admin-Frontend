export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    LIST: "/users",
    DETAILS: (id: string | number) => `/users/${id}`,
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;
