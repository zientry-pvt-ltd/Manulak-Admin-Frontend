import { CurrencyLocaleMap } from "@/constants";
import type { CurrencyCode } from "@/types";

export const formatCurrency = (
  value: number,
  currency: CurrencyCode = "LKR",
): string => {
  const locale = CurrencyLocaleMap[currency] || "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
