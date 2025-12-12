import { ENDPOINTS } from "@/constants";
import type {
  IProductCreateRequest,
  IProductListResponse,
  IProductResponse,
  IProductSearchListResponse,
  IUpdateProductRequest,
} from "@/features/products/types/product.type";
import { api } from "@/services/api";
import type { ResourceListQueryParams, ResponseDTO } from "@/types";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductListResponse, ResourceListQueryParams>({
      query: (body) => ({
        url: ENDPOINTS.PRODUCT.ALL,
        method: "POST",
        body,
      }),
      providesTags: ["Product"],
    }),

    getProductById: builder.query<IProductResponse, string>({
      query: (id) => ({
        url: ENDPOINTS.PRODUCT.SINGLE(id),
        method: "GET",
      }),
    }),

    searchProducts: builder.mutation<IProductSearchListResponse, string>({
      query: (productName) => ({
        url: ENDPOINTS.PRODUCT.SEARCH,
        method: "POST",
        body: { productName },
      }),
    }),

    createProduct: builder.mutation<
      ResponseDTO<{ id: string }>,
      IProductCreateRequest
    >({
      query: (body) => ({
        url: ENDPOINTS.PRODUCT.CREATE,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Product"],
    }),

    addProductImage: builder.mutation<
      IProductResponse,
      { id: string; file: File }
    >({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("product-image", file);
        return {
          url: ENDPOINTS.PRODUCT.ADD_IMAGE(id),
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<IProductResponse, IUpdateProductRequest>({
      query: ({ id, ...body }) => ({
        url: ENDPOINTS.PRODUCT.UPDATE(id),
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: ENDPOINTS.PRODUCT.DELETE(id),
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductImageMutation,
} = productApi;
