import type { DateFormatPatterns } from "@/constants";

export type DateFormat =
  | "YYYY-MM-DD"
  | "YYYY/MM/DD"
  | "DD-MM-YYYY"
  | "DD/MM/YYYY"
  | "YYYY-MM-DD HH:mm"
  | "YYYY-MM-DD HH:mm:ss"
  | "HH:mm"
  | "HH:mm:ss"
  | "MMM DD, YYYY"
  | "dddd, MMMM Do YYYY";

export type DateFormatKey = keyof typeof DateFormatPatterns;
