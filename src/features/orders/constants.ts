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
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;
export type SellingMethod = keyof typeof SELLING_METHODS;
export type PaymentMethod = keyof typeof PAYMENT_METHODS;

export const PAYMENT_METHOD_OPTIONS = [
  {
    label: "CoD",
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

export const ORDER_STATUS_OPTIONS = [
  {
    label: "Pending",
    value: ORDER_STATUSES.PENDING,
  },
  {
    label: "Confirmed",
    value: ORDER_STATUSES.CONFIRMED,
  },
  {
    label: "Shipped",
    value: ORDER_STATUSES.SHIPPED,
  },
  {
    label: "Delivered",
    value: ORDER_STATUSES.DELIVERED,
  },
  {
    label: "Cancelled",
    value: ORDER_STATUSES.CANCELLED,
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
