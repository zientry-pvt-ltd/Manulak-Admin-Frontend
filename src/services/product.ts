import { ENDPOINTS } from "@/constants";
import type {
  IProductListResponse,
  IProductResponse,
  IUpdateProductRequest,
} from "@/features/products/types/product.type";
import { api } from "@/services/api";
import type { ResourceListQueryParams } from "@/types";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductListResponse, ResourceListQueryParams>({
      query: (body) => ({
        url: ENDPOINTS.PRODUCT.ALL,
        method: "POST",
        body,
      }),
    }),
    getProductById: builder.query<IProductResponse, string>({
      query: (id) => ({
        url: ENDPOINTS.PRODUCT.SINGLE(id),
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<string, string>({
      query: (body) => ({
        url: ENDPOINTS.PRODUCT.CREATE,
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation<IProductResponse, IUpdateProductRequest>({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.PRODUCT.UPDATE(id),
        method: "PATCH",
        body,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.PRODUCT.DELETE(id),
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
