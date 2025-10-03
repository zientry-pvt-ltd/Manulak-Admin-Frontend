export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  PRODUCT: {
    ALL: "/product/get-all-products",
    CREATE: "/product/create-product",
    SINGLE: (id: string | number) => `/product/get-product-by-id/${id}`,
    UPDATE: (id: string | number) => `/product/update-product/${id}`,
    DELETE: (id: string | number) => `/product/delete-product/${id}`,
    ADD_IMAGE: (id: string | number) => `/product/upload-product-image/${id}`,
  },
  STOCK: {
    STOCK_NET_WORTH: "/stock/stock-net-worth",
    UPDATE_QUANTITY: (id: string) => `/stock/${id}`,
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;

export const SLICES = {
  AUTH: "auth",
  PRODUCT: "product",
  STOCK: "stock",
  DASHBOARD: "dashboard",
} as const;

export const API_TAG_TYPES = ["Product", "StockNetWorth"];
