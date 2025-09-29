import type { ApiResource, ApiResourceList } from "@/types";

export type IStockInfo = {
  id: string;
  product_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  net_worth: number;
};

export type IUpdateStockQuantityRequest = Partial<IStockInfo> & { id: string };

export type IStockListResponse = ApiResourceList<IStockInfo>;

export type IStockResponse = ApiResource<IStockInfo>;
