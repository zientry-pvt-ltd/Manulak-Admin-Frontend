import { ENDPOINTS } from "@/constants";
import type {
  ICreateOrderRequest,
  ICreatePaymentRecordRequest,
  ICreatePaymentRecordResponse,
  IOrderCreateResponse,
  IOrderMetadataResponse,
  IOrderProductListResponse,
  IOrdersResponse,
  IOrderTransactionHistoryResponse,
  IOrderTransactionSlipUploadResponse,
  IUpdateOrderMetaDataRequest,
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
      providesTags: ["PaymentHistory"],
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

    createPaymentRecord: builder.mutation<
      ICreatePaymentRecordResponse,
      { id: string; data: ICreatePaymentRecordRequest }
    >({
      query: ({ id, data }) => {
        return {
          url: ENDPOINTS.ORDERS.CREATE_PAYMENT_RECORD(id),
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["PaymentHistory"],
    }),

    updateOrderMetaData: builder.mutation<
      any,
      { id: string; data: IUpdateOrderMetaDataRequest }
    >({
      query: ({ id, data }) => {
        return {
          url: ENDPOINTS.ORDERS.UPDATE_ORDER_META_DATA(id),
          method: "PUT",
          body: data,
        };
      },
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
      invalidatesTags: ["PaymentHistory"],
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
  useUpdateOrderMetaDataMutation,
  useCreatePaymentRecordMutation,
} = orderApi;
