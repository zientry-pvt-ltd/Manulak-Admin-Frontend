import type {
  OrderStatus,
  PaymentMethod,
  SellingMethod,
} from "@/features/orders/constants";
import type { IProductInfo } from "@/features/products/types/product.type";
import type { ApiResource, ApiResourceList } from "@/types";

export type Order = {
  order_id: string;
  selling_method: SellingMethod;
  order_value: number;
  payment_method: PaymentMethod;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  is_deleted: boolean;
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  postal_code: number;
  primary_phone_number: string;
  company_name: string | null;
  email: string | null;
  alternate_phone_number_1: string | null;
  alternate_phone_number_2: string | null;
  status: OrderStatus; // use literal types if you know all possible statuses
};

export type ModifiedOrder = Order & {
  id: string;
  full_name: string;
};

export type OrderBasicInfo = {
  id: string;
  customer_name: string;
  customer_phone: string;
  selling_method: string;
  order_status: string;
  order_value: number;
  payment_method: string;
};

// Order Metadata Interface
export interface OrderMetaData {
  first_name: string;
  last_name: string;
  selling_method: SellingMethod;
  order_value: number;
  address_line_1: string;
  address_line_2?: string;
  address_line_3?: string;
  postal_code: number;
  primary_phone_number: string;
  status: OrderStatus;
}

export interface OrderTransactionHistoryItem {
  order_id: string;
  paid_amount: number;
  payment_date: string;
  payment_id: string;
  payment_slip_number: string;
  payment_slip_url: string;
}

export interface OrderProductListItem {
  order_details_id: string;
  product_id: string;
  required_quantity: number;
  order_id: string;
  product: IProductInfo;
}

// Order Item Interface
export interface OrderItem {
  product_id: string;
  required_quantity: number;
}

// Payment Data Interface
export interface PaymentData {
  payment_date: string; // ISO 8601 format (e.g., "2025-10-15T10:00:00Z")
  paid_amount: number;
  payment_slip_number: string;
  payment_method?: PaymentMethod;
}

// Full Order Interface (combines all)
export interface FullOrder {
  orderMetaData: OrderMetaData;
  paymentData: PaymentData;
  "payment-slip"?: File;
}

export type ICreateOrderRequest = FullOrder;

export type IOrderCreateResponse = ApiResource<
  Order & { order_id: string; paymentId: string }
>;

export type IOrderTransactionSlipUploadResponse = ApiResource<{
  payment_id: string;
  payment_date: string;
  paid_amount: number;
  payment_slip_number: string;
  payment_slip_url: string;
  order_id: string;
}>;

export type IOrdersResponse = ApiResourceList<ModifiedOrder>;

export type IOrderProductListResponse = ApiResource<OrderProductListItem[]>;

export type IOrderTransactionHistoryResponse = ApiResource<
  OrderTransactionHistoryItem[]
>;

export type IOrderMetadataResponse = ApiResource<Order>;
