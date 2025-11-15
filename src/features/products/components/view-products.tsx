import type { PaginationState, SortingState } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import type { z } from "zod";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import { ProductCustomIdCell } from "@/features/products/components/product-custom-id-cell";
import ProductForm, {
  type ProductFormMode,
  type ProductFormSubmitData,
} from "@/features/products/components/product-form";
import { CATEGORIES } from "@/features/products/constants";
import type { productSchema } from "@/features/products/schema";
import { selectProduct } from "@/features/products/store/product-slice";
import type { IProductInfo } from "@/features/products/types/product.type";
import { useAppDialog, useConfirmDialog } from "@/providers";
import {
  useAddProductImageMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useUpdateProductMutation,
} from "@/services/product";
import { selectProducts } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

const getChangedFields = (
  before: IProductInfo,
  after: z.infer<typeof productSchema>,
): Partial<IProductInfo> => {
  const changes: Partial<IProductInfo> = {};

  for (const key of Object.keys(after) as (keyof z.infer<
    typeof productSchema
  >)[]) {
    const beforeValue = before[key as keyof IProductInfo];
    const afterValue = after[key];

    if (afterValue !== undefined && beforeValue !== afterValue) {
      (changes as any)[key] = afterValue;
    }
  }

  return changes;
};

export const ViewProducts = () => {
  const dispatch = useAppDispatch();
  const { confirm } = useConfirmDialog();
  const { openAppDialog, closeAppDialog } = useAppDialog();
  const { products } = useAppSelector(selectProducts);

  const { isFetching } = useGetProductsQuery({
    filters: {
      query: "",
    },
    paging: { pageNo: 1, pageSize: 10 },
    sorting: { columnName: "created_at", sortOrder: -1 },
  });

  const [createProduct] = useCreateProductMutation();
  const [addProductImage] = useAddProductImageMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [trigger] = useLazyGetProductsQuery();

  const handlePaginationChange = (value: PaginationState) => {
    trigger({
      filters: {
        query: "",
      },
      paging: {
        pageNo: value.pageIndex + 1,
        pageSize: value.pageSize,
      },
      sorting: { columnName: "created_at", sortOrder: -1 },
    });
  };

  const handleSortingChange = (sorting: SortingState) => {
    if (sorting.length > 0) {
      const sort = sorting[0];
      trigger({
        filters: {
          query: "",
        },
        paging: { pageNo: 1, pageSize: 10 },
        sorting: {
          columnName: sort.id,
          sortOrder: sort.desc ? -1 : 1,
        },
      });
    } else {
      trigger({
        filters: {
          query: "",
        },
        paging: { pageNo: 1, pageSize: 10 },
        sorting: { columnName: "created_at", sortOrder: -1 },
      });
    }
  };

  const handleDeleteProduct = useCallback(
    (productId: string) => {
      confirm({
        title: "Delete Product",
        description: "You're going to delete your Product",
        variant: "destructive",
        confirmText: "Yes, Delete!",
        cancelText: "No, keep it",
        onSubmit: async () => {
          try {
            await deleteProduct(productId);
            toast.success("Product deleted successfully");
          } catch (error) {
            const message = normalizeError(error);
            toast.error(message.message);
          }
        },
      });
    },
    [confirm, deleteProduct],
  );

  const handleImageUpload = useCallback(
    async (
      productId: string,
      data: ProductFormSubmitData,
      loadingToastId: string | number,
      mode: "edit" | "new",
    ) => {
      const isNewProduct = mode === "new";
      // Step 2: Upload images if they exist
      if (data.imageData && data.imageData.length > 0) {
        const totalImages = data.imageData.length;

        // Update toast to show image upload progress
        toast.loading(
          `Product ${isNewProduct ? "created" : "updated"}! Uploading images (0/${totalImages})...`,
          {
            id: loadingToastId,
          },
        );

        let uploadedCount = 0;
        let failedCount = 0;
        const uploadResults = [];

        // Upload images one by one using a for loop
        for (let index = 0; index < data.imageData.length; index++) {
          const image = data.imageData[index];

          try {
            await addProductImage({
              id: productId,
              file: image,
            }).unwrap();

            uploadedCount++;

            // Update progress toast after each successful upload
            toast.loading(
              `Product created! Uploading images (${uploadedCount}/${totalImages})...`,
              { id: loadingToastId },
            );

            uploadResults.push({
              success: true,
              index: index + 1,
            });
          } catch (error) {
            failedCount++;
            console.error(`Failed to upload image ${index + 1}:`, error);

            // Update progress even for failed uploads
            const processedCount = uploadedCount + failedCount;
            toast.loading(
              `Product ${isNewProduct ? "created" : "updated"}! Processing images (${processedCount}/${totalImages})...`,
              { id: loadingToastId },
            );

            uploadResults.push({
              success: false,
              error: true,
              index: index + 1,
              message: normalizeError(error).message,
            });
          }
        }

        // Count final results
        const successful = uploadResults.filter(
          (result) => result.success,
        ).length;
        const failed = uploadResults.filter((result) => result.error).length;

        // Dismiss loading toast and show final result
        toast.dismiss(loadingToastId);

        if (failed === 0) {
          // All images uploaded successfully
          toast.success(
            `Product ${isNewProduct ? "created" : "updated"} successfully with ${successful}/${totalImages} image${totalImages !== 1 ? "s" : ""}!`,
          );
        } else if (successful > 0) {
          // Some images failed
          toast.warning(
            `Product  ${isNewProduct ? "created" : "updated"}! ${successful}/${totalImages} image${totalImages !== 1 ? "s" : ""} uploaded successfully, ${failed} failed.`,
          );
        } else {
          // All images failed but product was created
          toast.warning(
            `Product ${isNewProduct ? "created" : "updated"} successfully, but failed to upload all ${totalImages} image${totalImages !== 1 ? "s" : ""}. You can add images later.`,
          );
        }
      } else {
        // No images to upload
        toast.dismiss(loadingToastId);
        toast.success(
          `Product ${isNewProduct ? "created" : "updated"} successfully!`,
        );
      }
    },
    [addProductImage],
  );

  const handleAddProductSubmit = async ({
    data,
  }: {
    data: ProductFormSubmitData;
  }) => {
    // Show initial loading toast
    const loadingToastId = toast.loading("Creating product...");

    try {
      // Step 1: Create the product first
      const result = await createProduct(data.fieldData).unwrap();
      const productId = result.data.id;

      await handleImageUpload(productId, data, loadingToastId, "new");

      setTimeout(() => {
        closeAppDialog();
      }, 700);
    } catch (error) {
      toast.dismiss(loadingToastId);
      const message = normalizeError(error);
      toast.error(`Failed to create product: ${message.message}`);
      console.error("Product creation failed:", error);
    }
  };

  const handleEditProductSubmit = async ({
    data,
    mode,
  }: {
    data: ProductFormSubmitData;
    mode: ProductFormMode;
  }) => {
    const loadingToastId = toast.loading("Updating product...");

    const productId = data.fieldData.id;
    const updatedProduct = data.fieldData;
    const productBeforeUpdate = products?.find(
      (p) => p.id === updatedProduct.id,
    );

    if (!productId) {
      toast.error("Product ID is missing. Cannot update the product.");
      return;
    }

    if (mode !== "edit" || !updatedProduct || !productBeforeUpdate) {
      toast.error("Invalid operation: No product selected for editing.");
      return;
    }

    const changes = getChangedFields(productBeforeUpdate, updatedProduct);

    if (Object.keys(changes).length === 0) {
      console.warn("No changes detected, skipping patch");
      return;
    }

    try {
      await updateProduct({
        id: productId,
        ...changes,
      });

      await handleImageUpload(productId, data, loadingToastId, "edit");

      setTimeout(() => {
        closeAppDialog();
      }, 700);
    } catch (error) {
      const message = normalizeError(error);
      toast.dismiss(loadingToastId);
      toast.error(`Failed to update product: ${message.message}`);
      console.error("Product update failed:", error);
    }
  };

  const handleAddProduct = () => {
    openAppDialog({
      title: "Add New Product",
      description: "Fill the form to add a new product",
      formId: "product-form",
      content: <ProductForm mode="new" onSubmit={handleAddProductSubmit} />,
    });
  };

  const config: TableConfig<IProductInfo> = {
    data: products || [],
    tableName: "Product",
    columns: [
      {
        id: "id",
        accessorKey: "id",
        mutationKey: "id",
        header: "Product ID",
        type: "custom",
        sortable: false,
        hideable: true,
        CustomCell: ProductCustomIdCell,
      },
      {
        id: "name",
        accessorKey: "product_name",
        mutationKey: "product_name",
        header: "Name",
        type: "text",
        sortable: true,
        hideable: true,
        filtering: {
          enabled: true,
          filterType: "text",
        },
      },
      {
        id: "description",
        accessorKey: "product_desc",
        mutationKey: "product_desc",
        header: "Description",
        type: "text",
        hideable: true,
      },
      {
        id: "category",
        accessorKey: "product_category",
        mutationKey: "product_category",
        header: "Category",
        type: "single-select",
        options: CATEGORIES,
        hideable: true,
      },
      {
        id: "selling_price",
        accessorKey: "selling_price",
        mutationKey: "selling_price",
        header: "Selling Price(Rs)",
        type: "text",
        hideable: true,
      },
      {
        id: "bought_price",
        accessorKey: "bought_price",
        mutationKey: "bought_price",
        header: "Bought Price(Rs)",
        type: "text",
        hideable: true,
      },
      {
        id: "unit_weight",
        accessorKey: "unit_weight",
        mutationKey: "unit_weight",
        header: "Unit Weight(kg)",
        type: "text",
        hideable: true,
      },
      {
        id: "actions",
        accessorKey: "id",
        mutationKey: "id",
        header: "Actions",
        type: "icon-buttons",
        hideable: true,
        iconButtons: [
          {
            Icon: Eye,
            tooltip: "View Product",
            variant: "outline",
            onClick: (row) => {
              dispatch(selectProduct(row.id));
              openAppDialog({
                title: `View Product - ${row.product_name}`,
                description: `Details for product ${row.product_name}`,
                content: <ProductForm mode="view" />,
                disableFooter: true,
              });
            },
          },
          {
            Icon: Edit,
            tooltip: "Edit Product",
            variant: "outline",
            onClick: (row) => {
              dispatch(selectProduct(row.id));
              openAppDialog({
                title: `Edit Product - ${row.product_name}`,
                description: `Edit details for product ${row.product_name}`,
                formId: "product-form",
                content: (
                  <ProductForm mode="edit" onSubmit={handleEditProductSubmit} />
                ),
              });
            },
          },
          {
            Icon: Trash,
            tooltip: "Delete Product",
            onClick: (row) => handleDeleteProduct(row.id),
            variant: "destructive",
          },
        ],
      },
    ],
    filtering: {
      enabled: true,
      onColumnFilterChange(value) {
        console.log("Column Filter Changed: ", value);
      },
    },
    pagination: {
      enabled: true,
      onPaginationChange: handlePaginationChange,
    },
    sorting: {
      enabled: true,
      onColumnSortingChange: handleSortingChange,
    },
    columnVisibility: {
      enabled: true,
    },
    editing: {
      enabled: true,
      rowCreating: {
        enabled: true,
        autoSave: true,
        addDummyRow: handleAddProduct,
      },
    },
  };
  return <ConfigurableTable config={config} isFetching={isFetching} />;
};
