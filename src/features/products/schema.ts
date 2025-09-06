import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Electronics", "Clothing", "Books", "Other"]),
  selling_price: z.number().min(0, "Selling price must be positive"),
  bought_price: z.number().min(0, "Bought price must be positive"),
  unit_weight: z.number().min(0, "Unit weight must be positive"),
  courier_charge_for_1st_kg: z.number().min(0),
  courier_charge_for_other_kg: z.number().min(0),
  image_urls: z.array(z.string().url("Must be valid URL")).optional(),
});
