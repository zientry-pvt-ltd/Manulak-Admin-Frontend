export type ProductCategoryType =
  | "flower-seeds"
  | "vegetable-seeds"
  | "saplings"
  | "gardening-tools"
  | "eco-products";

type Product = {
  id: string;
  name: string;
  description: string;
  category: ProductCategoryType;
  selling_price: number;
  bought_price: number;
  unit_weight: number;
  courier_charge_for_1st_kg: number;
  courier_charge_for_other_kg: number;
  image_urls: string[];
};

export type { Product };
