import type { IProductInfo } from "@/features/products/types/product.type";
import type { StockOperations } from "@/features/stock/constants";
import type { ApiResource, ApiResourceList } from "@/types";

export type StockOperationType = keyof typeof StockOperations;

export type IStockInfo = Pick<
  IProductInfo,
  "product_name" | "product_category" | "quantity" | "bought_price"
>;

export type IUpdateStockQuantityRequest = {
  operation: StockOperationType;
  quantity: number;
};

export type IStockListResponse = ApiResourceList<IStockInfo>;

export type IStockResponse = ApiResource<IStockInfo>;

export type IStockNetWorthResponse = ApiResource<number>;

export type ICreateStockRequest = {
  product_id: string;
  quantity: number;
};
