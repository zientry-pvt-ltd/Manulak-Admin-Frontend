export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
  },
  PRODUCT: {
    ALL: "/product/get-all-products",
    CREATE: "/product/create-product",
    SINGLE: (id: string | number) => `/product/get-product-by-id/${id}`,
    UPDATE: (id: string | number) => `/product/update-product/${id}`,
    DELETE: (id: string | number) => `/product/delete-product/${id}`,
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;

export const SLICES = {
  AUTH: "auth",
  PRODUCT: "product",
  DASHBOARD: "dashboard",
} as const;
