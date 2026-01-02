export const PRODUCT_CATEGORIES = {
  PLANTS: "PLANTS",
  SEEDS: "SEEDS",
  TOOLS: "TOOLS",
  FERTILIZER: "FERTILIZER",
  POTS: "POTS",
  POLYTHENE_AND_NETS: "POLYTHENE_AND_NETS",
  OTHER: "OTHER",
} as const;

export const CATEGORIES_OPTIONS = [
  { label: "Plants", value: PRODUCT_CATEGORIES.PLANTS },
  { label: "Seeds", value: PRODUCT_CATEGORIES.SEEDS },
  { label: "Tools", value: PRODUCT_CATEGORIES.TOOLS },
  { label: "Fertilizer", value: PRODUCT_CATEGORIES.FERTILIZER },
  { label: "Pots", value: PRODUCT_CATEGORIES.POTS },
  { label: "Polythene and Nets", value: PRODUCT_CATEGORIES.POLYTHENE_AND_NETS },
  { label: "Other", value: PRODUCT_CATEGORIES.OTHER },
];

export const CATEGORY_LABELS: string[] = CATEGORIES_OPTIONS.map(
  (cat) => cat.value,
);

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];
