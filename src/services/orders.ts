import { ENDPOINTS } from "@/constants";
import type {
  ICreateOrderRequest,
  IOrderMetadataResponse,
  IOrderProductListResponse,
  IOrderResponse,
  Order,
} from "@/features/orders/types/order.type";
import { api } from "@/services/api";
import type { ResourceListQueryParams } from "@/types";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IOrderResponse, ResourceListQueryParams>({
      query: (body) => ({
        url: ENDPOINTS.ORDERS.ALL,
        method: "POST",
        body,
      }),
      transformResponse: (response: IOrderResponse) => {
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
    getOrderMetadata: builder.query<IOrderMetadataResponse, string>({
      query: (id) => ({
        url: ENDPOINTS.ORDERS.GET_ORDER_METADATA(id),
        method: "GET",
      }),
    }),
    getOrderProducts: builder.query<IOrderProductListResponse, string>({
      query: (id) => ({
        url: ENDPOINTS.ORDERS.GET_ORDER_ITEMS(id),
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<Order, ICreateOrderRequest>({
      query: (body) => {
        const formData = new FormData();

        if (body.orderMetaData) {
          formData.append("orderMetaData", JSON.stringify(body.orderMetaData));
        }

        if (body.orderItemsData) {
          formData.append(
            "orderItemsData",
            JSON.stringify(body.orderItemsData),
          );
        }

        if (body.paymentData) {
          formData.append("paymentData", JSON.stringify(body.paymentData));
        }

        const paymentSlip = (body as any)["payment-slip"];
        if (paymentSlip) {
          formData.append("payment-slip", paymentSlip);
        }

        return {
          url: ENDPOINTS.ORDERS.CREATE_ORDER,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderMetadataQuery,
  useGetOrderProductsQuery,
} = orderApi;
