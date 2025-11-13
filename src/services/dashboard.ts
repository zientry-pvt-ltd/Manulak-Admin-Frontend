import { ENDPOINTS } from "@/constants";
import type {
  DashboardViewDaysRequest,
  GetMostSoldSoldItemsByTimeResponse,
  GetProfitByTimeResponse,
  GetTotalRevenueByTimeResponse,
  GetTotalSaleByTimeResponse,
} from "@/features/dashboard/types/stock.type";
import { api } from "@/services/api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTotalSalesByTimePeriod: builder.query<
      GetTotalSaleByTimeResponse,
      DashboardViewDaysRequest
    >({
      query: ({ dashboard_view_days }) => ({
        url: ENDPOINTS.DASHBOARD.GET_TOTAL_SALES_BY_TIME_PERIOD,
        method: "GET",
        params: { dashboard_view_days },
      }),
    }),
    getTotalRevenueByTimePeriod: builder.query<
      GetTotalRevenueByTimeResponse,
      DashboardViewDaysRequest
    >({
      query: ({ dashboard_view_days }) => ({
        url: ENDPOINTS.DASHBOARD.GET_TOTAL_REVENUE_BY_TIME_PERIOD,
        method: "GET",
        params: { dashboard_view_days },
      }),
    }),
    getMostSoldItemByTimePeriod: builder.query<
      GetMostSoldSoldItemsByTimeResponse,
      DashboardViewDaysRequest
    >({
      query: ({ dashboard_view_days }) => ({
        url: ENDPOINTS.DASHBOARD.GET_MOST_SOLD_ITEM_BY_TIME_PERIOD,
        method: "GET",
        params: { dashboard_view_days },
      }),
    }),
    getProfitByTimePeriod: builder.query<
      GetProfitByTimeResponse,
      DashboardViewDaysRequest
    >({
      query: ({ dashboard_view_days }) => ({
        url: ENDPOINTS.DASHBOARD.GET_PROFIT_BY_ITEM_PERIOD,
        method: "GET",
        params: { dashboard_view_days },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTotalSalesByTimePeriodQuery,
  useGetTotalRevenueByTimePeriodQuery,
  useGetMostSoldItemByTimePeriodQuery,
  useGetProfitByTimePeriodQuery,
} = dashboardApi;
