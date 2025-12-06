import type { ResourceListQueryParams } from "@/types";

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
    CREATE_PAYMENT_RECORD: (id: string) => `/order/create-payment-record/${id}`,
    CREATE_ORDER_ITEM_RECORD: (id: string) =>
      `/order/create-order-item-record/${id}`,
    GET_ORDER: (id: string | number) => `/order/get-order/${id}`,
    CREATE_ORDER_BY_MESSAGE: "/order/create-order-by-message",
    UPDATE_ORDER_META_DATA: (id: string | number) =>
      `/order/update-order-meta-data-by-id/${id}`,
    UPDATE_ORDER_ITEM_RECORD: (itemId: string) =>
      `/order/update-order-item-record/${itemId}`,
    DELETE_ORDER: (orderId: string | number) =>
      `/order/delete-full-order/${orderId}`,
    DELETE_ORDER_ITEM_RECORD: (itemId: string) =>
      `/order/delete-single-order-item/${itemId}`,
    GET_ORDER_METADATA: (id: string | number | null) =>
      `/order/get-order-meta-data-by-id/${id}`,
    GET_ORDER_ITEMS: (id: string | number | null) =>
      `/order/get-all-order-items-by-id/${id}`,
    GET_ORDER_PAYMENT_TRANSACTIONS: (id: string | null) =>
      `/order/get-all-payment-transactions-by-id/${id}`,
    UPLOAD_PAYMENT_SLIP: (id: string) => `/order/upload-payment-slip/${id}`,
    CALCULATE_ORDER_VALUE: () => "/order/calculate-order-value",
  },
  DASHBOARD: {
    GET_TOTAL_SALES_BY_TIME_PERIOD: "/dashboard/get-total-sales",
    GET_TOTAL_REVENUE_BY_TIME_PERIOD: "/dashboard/get-total-revenue",
    GET_MOST_SOLD_ITEM_BY_TIME_PERIOD: "dashboard/most-sold-items",
    GET_PROFIT_BY_ITEM_PERIOD: "dashboard/get-profit",
    GET_TOTAL_SALES_BY_SELLING_METHOD:
      "dashboard/get-total-sales-by-selling-method",
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

export const API_TAG_TYPES = [
  "Product",
  "StockNetWorth",
  "Order",
  "PaymentHistory",
  "OrderProducts",
] as const;

export const INITIAL_PAGING = {
  pageNo: 1,
  pageSize: 10,
};

export const INITIAL_SORTING = {
  columnName: "created_at",
  sortOrder: -1,
} as ResourceListQueryParams["sorting"];
