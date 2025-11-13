import type { ApiResource } from "@/types";

export type DashboardViewDays = 1 | 7 | 30 | 90;

type MostSoldItem = {
  product_id: string;
  product_name: string;
  total_required_quantity: number;
  total_stock: number;
  selling_efficiency: number;
};

export type DashboardViewDaysRequest = {
  dashboard_view_days: DashboardViewDays;
};

export type GetTotalSaleByTimeResponse = ApiResource<number>;
export type GetTotalRevenueByTimeResponse = ApiResource<number>;
export type GetProfitByTimeResponse = ApiResource<number>;
export type GetMostSoldSoldItemsByTimeResponse = ApiResource<MostSoldItem[]>;
