import { ENDPOINTS } from "@/constants";
import type {
  ICreateOrderRequest,
  IOrderCreateResponse,
  IOrderMetadataResponse,
  IOrderProductListResponse,
  IOrdersResponse,
  IOrderTransactionHistoryResponse,
  IOrderTransactionSlipUploadResponse,
} from "@/features/orders/types/order.type";
import { api } from "@/services/api";
import type { ResourceListQueryParams } from "@/types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrdersResponse, ResourceListQueryParams>({
      query: (body) => ({
        url: ENDPOINTS.ORDERS.ALL,
        method: "POST",
        body,
      }),
      transformResponse: (response: IOrdersResponse) => {
        return {
          ...response,
          data: {
            ...response.data,
            entities: response.data.entities.map((order) => ({
              ...order,
              id: order.order_id,
              full_name: `${order.first_name} ${order.last_name}`,
            })),
          },
        };
      },
      providesTags: ["Order"],
    }),
    getOrderMetadata: builder.query<IOrderMetadataResponse, string | null>({
      query: (id) => ({
        url: ENDPOINTS.ORDERS.GET_ORDER_METADATA(id),
        method: "GET",
      }),
    }),
    getOrderProducts: builder.query<IOrderProductListResponse, string | null>({
      query: (id) => ({
        url: ENDPOINTS.ORDERS.GET_ORDER_ITEMS(id),
        method: "GET",
      }),
    }),
    getOrderPaymentHistory: builder.query<
      IOrderTransactionHistoryResponse,
      string | null
    >({
      query: (id) => ({
        url: ENDPOINTS.ORDERS.GET_ORDER_PAYMENT_TRANSACTIONS(id),
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<IOrderCreateResponse, ICreateOrderRequest>({
      query: (body) => {
        return {
          url: ENDPOINTS.ORDERS.CREATE_ORDER,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    uploadPaymentSlip: builder.mutation<
      IOrderTransactionSlipUploadResponse,
      { id: string; file: File }
    >({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("payment-slip", file);
        return {
          url: ENDPOINTS.ORDERS.UPLOAD_PAYMENT_SLIP(id),
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderMetadataQuery,
  useGetOrderProductsQuery,
  useGetOrderPaymentHistoryQuery,
  useUploadPaymentSlipMutation,
} = orderApi;
