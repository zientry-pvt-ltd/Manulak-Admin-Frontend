import { CurrencyLocaleMap } from "@/constants";
import type {
  CurrencyCode,
  InputSanitizerType,
  SanitizerConfig,
} from "@/types";

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

/**
 * Creates a sanitizer function based on type
 * @param config - Configuration object with type and optional pattern
 * @returns Function to sanitize input
 */
export const createInputSanitizer = (config: SanitizerConfig) => {
  const patterns: Record<InputSanitizerType, RegExp> = {
    "numbers-only": /[^0-9]/g,
    "numbers-with-decimal": /[^0-9.]/g,
    "letters-only": /[^a-zA-Z]/g,
    alphanumeric: /[^a-zA-Z0-9]/g,
    phone: /[^0-9+\-()]/g,
    // eslint-disable-next-line no-useless-escape
    email: /[^a-zA-Z0-9@._\-]/g,
    "no-special-chars": /[^a-zA-Z0-9\s]/g,
  };

  const pattern = config.pattern || patterns[config.type];

  return (value: string): string => {
    let sanitized = value.replace(pattern, "");

    if (config.maxLength) {
      sanitized = sanitized.slice(0, config.maxLength);
    }

    return sanitized;
  };
};
