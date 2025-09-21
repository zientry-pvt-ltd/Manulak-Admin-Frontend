import { ENDPOINTS } from "@/constants";
import type {
  IProductCreateRequest,
  IProductListResponse,
  IProductResponse,
  IUpdateProductRequest,
} from "@/features/products/types/product.type";
import { api } from "@/services/api";
import type { ResourceListQueryParams, ResponseDTO } from "@/types";

export function productToFormData(product: IProductCreateRequest): FormData {
  const formData = new FormData();
  formData.append("product_name", product.product_name);
  formData.append("product_desc", product.product_desc);
  formData.append("product_category", product.product_category);
  formData.append("bought_price", product.bought_price.toString());
  formData.append("selling_price", product.selling_price.toString());
  formData.append("unit_weight", product.unit_weight.toString());
  formData.append(
    "courier_chargers_1kg",
    product.courier_chargers_1kg.toString(),
  );
  formData.append(
    "courier_chargers_more_than_1kg",
    product.courier_chargers_more_than_1kg.toString(),
  );
  return formData;
}

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
    createProduct: builder.mutation<
      ResponseDTO<{ id: string }>,
      IProductCreateRequest
    >({
      query: (body) => ({
        url: ENDPOINTS.PRODUCT.CREATE,
        method: "POST",
        body: productToFormData(body),
      }),
    }),
    addProductImage: builder.mutation<
      IProductResponse,
      { id: string; file: File }
    >({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: ENDPOINTS.PRODUCT.ADD_IMAGE(id),
          method: "POST",
          body: formData,
        };
      },
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
  useAddProductImageMutation,
} = productApi;
