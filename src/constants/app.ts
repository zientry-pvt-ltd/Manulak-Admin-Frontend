import type { CurrencyCode } from "@/types";

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  SUPER_ADMIN: "SUPER_ADMIN",
  GUEST: "GUEST",
} as const;

export const DateFormatPatterns = {
  DATE_ISO: "YYYY-MM-DD",
  DATE_SLASH: "YYYY/MM/DD",
  DATE_DD_MM_YYYY: "DD-MM-YYYY",
  DATE_DD_SLASH: "DD/MM/YYYY",
  DATETIME_SHORT: "YYYY-MM-DD HH:mm",
  DATETIME_LONG: "YYYY-MM-DD HH:mm:ss",
  TIME_SHORT: "HH:mm",
  TIME_LONG: "HH:mm:ss",
  HUMAN_READABLE: "MMM DD, YYYY",
  FULL_READABLE: "dddd, MMMM Do YYYY",
} as const;

export const CurrencyLocaleMap: Record<CurrencyCode, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  LKR: "en-LK",
  JPY: "ja-JP",
  AUD: "en-AU",
  CAD: "en-CA",
};
