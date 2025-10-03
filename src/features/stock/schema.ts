import { z } from "zod";

export const stockSchema = z.object({
  quantity: z.number().min(1, "Minimum quantity value should be 1"),
});
