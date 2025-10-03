import type { FormFieldValues } from "@/features/products/components/product-form";
import type { ApiResource, ApiResourceList } from "@/types";

export type ProductCategoryType =
  | "flower-seeds"
  | "vegetable-seeds"
  | "saplings"
  | "gardening-tools"
  | "eco-products";

export type IProductInfo = {
  id: string;
  product_name: string;
  product_desc: string;
  product_category: string;
  bought_price: number;
  selling_price: number;
  unit_weight: number;
  quantity: number;
  courier_chargers_1kg: number;
  courier_chargers_more_than_1kg: number;
  product_image_urls: string[];
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};

export type IUpdateProductRequest = Partial<IProductInfo> & { id: string };

export type IProductCreateRequest = FormFieldValues;

export type IProductListResponse = ApiResourceList<IProductInfo>;

export type IProductResponse = ApiResource<IProductInfo>;
