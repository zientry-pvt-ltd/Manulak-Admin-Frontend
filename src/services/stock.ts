import { ENDPOINTS } from "@/constants";
import type {
  IStockNetWorthResponse,
  IStockResponse,
  IUpdateStockQuantityRequest,
} from "@/features/stock/types/stock.type";
import { api } from "@/services/api";

export const stockApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStockNetWorth: builder.query<IStockNetWorthResponse, void>({
      query: () => ({
        url: ENDPOINTS.STOCK.STOCK_NET_WORTH,
        method: "GET",
      }),
    }),
    updateStockQuantity: builder.mutation<
      IStockResponse,
      { productId: string; body: IUpdateStockQuantityRequest }
    >({
      query: ({ productId, body }) => ({
        url: ENDPOINTS.STOCK.UPDATE_QUANTITY(productId),
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product", "StockNetWorth"],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateStockQuantityMutation, useGetStockNetWorthQuery } =
  stockApi;
