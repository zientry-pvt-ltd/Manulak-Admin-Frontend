import { ENDPOINTS } from "@/constants";
import type {
  ICreateOrderItemResponse,
  ICreateOrderRequest,
  ICreatePaymentRecordRequest,
  ICreatePaymentRecordResponse,
  IOrderCreateResponse,
  IOrderItemCreateRequest,
  IOrderMetadataResponse,
  IOrderProductListResponse,
  IOrdersResponse,
  IOrderTransactionHistoryResponse,
  IOrderTransactionSlipUploadResponse,
  IUpdateOrderMetaDataRequest,
  IUpdateOrderMetaDataResponse,
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
      providesTags(result) {
        return result
          ? [{ type: "Order", id: result.data.order_id }]
          : ["Order"];
      },
    }),

    getOrderProducts: builder.query<IOrderProductListResponse, string | null>({
      query: (id) => ({
        url: ENDPOINTS.ORDERS.GET_ORDER_ITEMS(id),
        method: "GET",
      }),
      providesTags: ["OrderProducts"],
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

    createOrderItem: builder.mutation<
      ICreateOrderItemResponse,
      { orderId: string; data: IOrderItemCreateRequest }
    >({
      query: ({ orderId, data }) => ({
        url: ENDPOINTS.ORDERS.CREATE_ORDER_ITEM_RECORD(orderId),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OrderProducts"],
    }),

    createOrderByMessage: builder.mutation<
      IOrderCreateResponse,
      { orderMessage: string }
    >({
      query: ({ orderMessage }) => {
        return {
          url: ENDPOINTS.ORDERS.CREATE_ORDER_BY_MESSAGE,
          method: "POST",
          body: { orderMessage },
        };
      },
      invalidatesTags: ["Order"],
    }),

    updateOrderItemRecord: builder.mutation<
      any,
      {
        itemId: string;
        data: {
          modified_required_qunatity: number;
        };
      }
    >({
      query: ({ itemId, data }) => {
        return {
          url: ENDPOINTS.ORDERS.UPDATE_ORDER_ITEM_RECORD(itemId),
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["OrderProducts"],
    }),

    updateOrderMetaData: builder.mutation<
      IUpdateOrderMetaDataResponse,
      { id: string; data: IUpdateOrderMetaDataRequest }
    >({
      query: ({ id, data }) => {
        return {
          url: ENDPOINTS.ORDERS.UPDATE_ORDER_META_DATA(id),
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags(result) {
        return result
          ? [{ type: "Order", id: result.data.order_id }, "Order"]
          : ["Order"];
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

    deleteOrderItemRecord: builder.mutation<void, string>({
      query: (itemId) => {
        return {
          url: ENDPOINTS.ORDERS.DELETE_ORDER_ITEM_RECORD(itemId),
          method: "DELETE",
        };
      },
      invalidatesTags: ["OrderProducts"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  useGetOrderMetadataQuery,
  useGetOrderProductsQuery,
  useGetOrderPaymentHistoryQuery,
  useCreateOrderMutation,
  useCreateOrderItemMutation,
  useUploadPaymentSlipMutation,
  useUpdateOrderMetaDataMutation,
  useCreatePaymentRecordMutation,
  useCreateOrderByMessageMutation,
  useUpdateOrderItemRecordMutation,
  useDeleteOrderItemRecordMutation,
} = orderApi;
