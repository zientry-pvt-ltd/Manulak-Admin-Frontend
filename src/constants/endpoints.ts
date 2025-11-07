export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  PRODUCT: {
    ALL: "/product/get-all-products",
    CREATE: "/product/create-product",
    SEARCH: "/product/get-product-by-productName",
    SINGLE: (id: string | number) => `/product/get-product-by-id/${id}`,
    UPDATE: (id: string | number) => `/product/update-product/${id}`,
    DELETE: (id: string | number) => `/product/delete-product/${id}`,
    ADD_IMAGE: (id: string | number) => `/product/upload-product-image/${id}`,
  },
  STOCK: {
    STOCK_NET_WORTH: "/stock/get-stock-networth",
    UPDATE_QUANTITY: (id: string) => `/stock/${id}`,
  },
  ORDERS: {
    ALL: "/order/get-all-orders",
    CREATE_ORDER: "/order/create-order",
    GET_ORDER: (id: string | number) => `/order/get-order/${id}`,
    UPDATE_ORDER: (id: string | number) => `/order/update-order/${id}`,
    DELETE_ORDER: (id: string | number) => `/order/delete-order/${id}`,
    GET_ORDER_METADATA: (id: string | number | null) =>
      `/order/get-order-meta-data-by-id/${id}`,
    GET_ORDER_ITEMS: (id: string | number | null) =>
      `/order/get-all-order-items-by-id/${id}`,
    GET_ORDER_PAYMENT_TRANSACTIONS: (id: string | null) =>
      `/order/get-all-payment-transactions-by-id/${id}`,
    UPLOAD_PAYMENT_SLIP: (id: string) => `/order/upload-payment-slip/${id}`,
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;

export const SLICES = {
  AUTH: "auth",
  PRODUCT: "product",
  ORDER: "order",
  STOCK: "stock",
  DASHBOARD: "dashboard",
  ORDER_FORM: "orderForm",
} as const;

export const API_TAG_TYPES = ["Product", "StockNetWorth"];
