import { z } from "zod";

import {
  ORDER_STATUSES,
  PAYMENT_METHODS,
  SELLING_METHODS,
} from "@/features/orders/constants";

const PaymentMethodSchema = z.nativeEnum(PAYMENT_METHODS);
const OrderStatusSchema = z.nativeEnum(ORDER_STATUSES);
const SellingMethodSchema = z.nativeEnum(SELLING_METHODS);

export const orderMetaDataSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  selling_method: SellingMethodSchema,
  order_value: z.number().min(0, "Order value must be at least 0"),
  address_line_1: z.string().min(1, "Address line 1 is required"),
  address_line_2: z.string().optional(),
  address_line_3: z.string().optional(),
  postal_code: z.number().min(10000, "Postal code is required"),
  primary_phone_number: z.string().min(10, "Primary phone number is required"),
  status: OrderStatusSchema,
  payment_method: PaymentMethodSchema,
  email: z.string().email("Invalid email address").optional(),
  alternate_phone_number_1: z
    .string()
    .min(10, "Alternate phone number 1 is required")
    .optional(),
  alternate_phone_number_2: z
    .string()
    .min(10, "Alternate phone number 2 is required")
    .optional(),
  company_name: z.string().optional(),
});

export const orderItemsDataSchema = z
  .array(
    z.object({
      product_id: z.string().min(1, "Product ID is required"),
      required_quantity: z
        .number()
        .min(1, "Required quantity must be at least 1"),
    }),
  )
  .min(1, "At least one product is required");

export const paymentDataSchema = z.object({
  payment_date: z.string().min(1, "Payment date is required"),
  paid_amount: z.number().min(100, "Paid amount must be at least 100"),
  payment_slip_number: z.string().min(1, "Payment slip number is required"),
});

export const fullOrderSchema = z.object({
  orderMetaData: orderMetaDataSchema,
  orderItemsData: orderItemsDataSchema,
  paymentData: paymentDataSchema,
});

export const plantNurseryOrderSchema = z.object({
  orderMetaData: orderMetaDataSchema,
  orderItemsData: orderItemsDataSchema,
  paymentData: paymentDataSchema,
});
