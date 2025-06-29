import { z } from "zod";

export const loginInputSchema = z.object({
  password: z.string().min(5, "Required"),
  userName: z
    .string()
    .min(1, "Required")
    .max(20, "Must be 20 characters or less"),
});
