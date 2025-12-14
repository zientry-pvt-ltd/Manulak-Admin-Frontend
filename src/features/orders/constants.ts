import type { SelectOption } from "@/components/config-table/types";

export const SELLING_METHODS = {
  ONLINE: "ONLINE",
  PLANT_NURSERY: "PLANT_NURSERY",
} as const;

export const PAYMENT_METHODS = {
  COD: "COD",
  FULL_PAYMENT: "FULL_PAYMENT",
  PARTIAL_PAYMENT: "PARTIAL_PAYMENT",
} as const;

export const ORDER_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  COMPLETE: "COMPLETE",
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;
export type SellingMethod = keyof typeof SELLING_METHODS;
export type PaymentMethod = keyof typeof PAYMENT_METHODS;

export const PAYMENT_METHOD_OPTIONS = [
  {
    label: "Cash on Delivery",
    value: PAYMENT_METHODS.COD,
  },
  {
    label: "Full Payment",
    value: PAYMENT_METHODS.FULL_PAYMENT,
  },
  {
    label: "Partial Payment",
    value: PAYMENT_METHODS.PARTIAL_PAYMENT,
  },
];

export const ORDER_STATUS_OPTIONS: SelectOption[] = [
  {
    label: "Pending",
    value: ORDER_STATUSES.PENDING,
    color: {
      background: "#FFF3E0",
      text: "#FF6D00",
    },
  },
  {
    label: "Confirmed",
    value: ORDER_STATUSES.CONFIRMED,
    color: {
      background: "#E3F2FD",
      text: "#1976D2",
    },
  },
  {
    label: "Shipped",
    value: ORDER_STATUSES.SHIPPED,
    color: {
      background: "#E8F5E9",
      text: "#388E3C",
    },
  },
  {
    label: "Delivered",
    value: ORDER_STATUSES.DELIVERED,
    color: {
      background: "#F3E5F5",
      text: "#8E24AA",
    },
  },
  {
    label: "Cancelled",
    value: ORDER_STATUSES.CANCELLED,
    color: {
      background: "#FFEBEE",
      text: "#D32F2F",
    },
  },
  {
    label: "Complete",
    value: ORDER_STATUSES.COMPLETE,
    color: {
      background: "#E0F2F1",
      text: "#00796B",
    },
  },
];

export const SELLING_METHODS_OPTIONS = [
  {
    label: "Online",
    value: SELLING_METHODS.ONLINE,
  },
  {
    label: "Plant Nursery",
    value: SELLING_METHODS.PLANT_NURSERY,
  },
];
