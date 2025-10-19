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
    ALL: "/stock/get-all-stock-items",
    STOCK_NET_WORTH: "/stock/stock-net-worth",
    UPDATE_QUANTITY: (id: string) => `/stock/update-stock-quantity/${id}`,
  },
  ORDERS: {
    ALL: "/order/get-all-orders",
    CREATE_ORDER: "/order/create-order",
    GET_ORDER: (id: string | number) => `/order/get-order/${id}`,
    UPDATE_ORDER: (id: string | number) => `/order/update-order/${id}`,
    DELETE_ORDER: (id: string | number) => `/order/delete-order/${id}`,
    GET_ORDER_METADATA: (id: string | number) =>
      `/order/get-order-meta-data-by-id/${id}`,
    GET_ORDER_ITEMS: (id: string | number) =>
      `/order/get-all-order-items-by-id/${id}`,
    GET_ORDER_PAYMENT_TRANSACTIONS: (id: string | number) =>
      `/order/get-all-payment-transactions-by-id/${id}`,
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
  ORDER_FORM: "orderForm",
} as const;
