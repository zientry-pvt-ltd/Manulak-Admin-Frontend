import { ENDPOINTS } from "@/constants";
import type {
  IStockListResponse,
  IStockResponse,
  IUpdateStockQuantityRequest,
} from "@/features/stock/types/stock.type";
import { api } from "@/services/api";
import type { ResourceListQueryParams } from "@/types";

export const stockApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query<IStockListResponse, ResourceListQueryParams>({
      query: (body) => ({
        url: ENDPOINTS.STOCK.ALL,
        method: "POST",
        body,
      }),
    }),
    getStockNetWorth: builder.query<{ net_worth: number }, void>({
      query: () => ({
        url: ENDPOINTS.STOCK.STOCK_NET_WORTH,
        method: "GET",
      }),
    }),
    updateStockQuantity: builder.mutation<
      IStockResponse,
      IUpdateStockQuantityRequest
    >({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.STOCK.UPDATE_QUANTITY(id),
        method: "PATCH",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStocksQuery,
  useUpdateStockQuantityMutation,
  useGetStockNetWorthQuery,
} = stockApi;
