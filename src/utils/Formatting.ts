import { CurrencyLocaleMap } from "@/constants";
import type {
  CurrencyCode,
  InputSanitizerType,
  SanitizerConfig,
} from "@/types";

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

export const formatCurrencyInput = (
  value: string,
  currency: CurrencyCode = "LKR",
  hideSymbol = true,
): string => {
  const locale = CurrencyLocaleMap[currency] || "en-US";
  const numberValue = Number(value.replace(/[^0-9.-]+/g, ""));
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);

  if (hideSymbol) {
    return formatted.replace(/[^0-9.,-]+/g, "").trim();
  }

  return formatted;
};
