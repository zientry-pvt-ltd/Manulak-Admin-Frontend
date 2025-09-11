export type ProductCategoryType =
  | "flower-seeds"
  | "vegetable-seeds"
  | "saplings"
  | "gardening-tools"
  | "eco-products";

export type Product = {
  id: string;
  product_name: string;
  product_desc: string;
  product_category: string;
  bought_price: string;
  selling_price: string;
  unit_weight: string;
  courier_chargers_1kg: string;
  courier_chargers_more_than_1kg: string;
  product_image_urls: string[];
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};
