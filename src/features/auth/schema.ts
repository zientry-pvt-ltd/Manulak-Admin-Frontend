import { z } from "zod";

export const loginInputSchema = z.object({
  password: z.string().min(5, "Required"),
  user_name: z
    .string()
    .min(5, "Required")
    .max(30, "Must be 30 characters or less"),
});
