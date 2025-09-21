import { z } from "zod";

import { CATEGORY_LABELS } from "@/features/products/constants";

export const productSchema = z.object({
  id: z.string().optional(),
  product_name: z.string().min(1, "Name is required"),
  product_desc: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  product_category: z.enum([...CATEGORY_LABELS] as [string, ...string[]]),
  bought_price: z.number().min(1, "Bought price is required"),
  selling_price: z.number().min(1, "Selling price is required"),
  unit_weight: z.number().min(1, "Unit weight is required"),
  courier_chargers_1kg: z
    .number()
    .min(1, "Courier charge for 1st kg is required"),
  courier_chargers_more_than_1kg: z
    .number()
    .min(1, "Courier charge for other kg is required"),
  product_image_urls: z.array(z.string().url("Must be valid URL")).optional(),
});
