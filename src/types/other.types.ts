export type FormIds =
  | "product-form"
  | "quantity-add-form"
  | "quantity-remove-form"
  | "online-order-placement-form"
  | "plant-nursery-order-placement-form"
  | "quantity-remove-form";

export type InputSanitizerType =
  | "numbers-only"
  | "numbers-with-decimal"
  | "letters-only"
  | "alphanumeric"
  | "phone"
  | "email"
  | "no-special-chars";

export interface SanitizerConfig {
  type: InputSanitizerType;
  maxLength?: number;
  pattern?: RegExp;
}
