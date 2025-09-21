import { Edit, Eye, Trash } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import ProductForm, {
  type ProductFormMode,
  type ProductFormSubmitData,
} from "@/features/products/components/product-form";
import { CATEGORIES } from "@/features/products/constants";
import { selectProduct } from "@/features/products/store/product-slice";
import type { IProductInfo } from "@/features/products/types/product.type";
import { useAppDialog, useConfirmDialog } from "@/providers";
import {
  useAddProductImageMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/services/product";
import { useAppDispatch } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export const ViewProducts = () => {
  const dispatch = useAppDispatch();
  const { confirm } = useConfirmDialog();
  const { openAppDialog } = useAppDialog();

  const { data: products } = useGetProductsQuery({
    filters: {
      query: "",
    },
    paging: { pageNo: 1, pageSize: 10 },
    sorting: { columnName: "created_at", sortOrder: -1 },
  });

  const [createProduct] = useCreateProductMutation();
  const [addProductImage] = useAddProductImageMutation();
  const [deleteProduct] = useDeleteProductMutation();

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

      // Step 2: Upload images if they exist
      if (data.imageData && data.imageData.length > 0) {
        const totalImages = data.imageData.length;

        // Update toast to show image upload progress
        toast.loading(
          `Product created! Uploading images (0/${totalImages})...`,
          {
            id: loadingToastId,
          },
        );

        let uploadedCount = 0;
        let failedCount = 0;

        // Create array of image upload promises with progress tracking
        const imageUploadPromises = data.imageData.map(
          async (image: File, index: number) => {
            try {
              await addProductImage({
                id: productId,
                file: image,
              }).unwrap();

              uploadedCount++;

              // Update progress toast
              toast.loading(
                `Product created! Uploading images (${uploadedCount}/${totalImages})...`,
                { id: loadingToastId },
              );

              return { success: true, index: index + 1 };
            } catch (error) {
              failedCount++;
              console.error(`Failed to upload image ${index + 1}:`, error);

              // Still update progress even for failed uploads
              const processedCount = uploadedCount + failedCount;
              toast.loading(
                `Product created! Processing images (${processedCount}/${totalImages})...`,
                { id: loadingToastId },
              );

              return {
                success: false,
                error: true,
                index: index + 1,
                message: normalizeError(error).message,
              };
            }
          },
        );

        // Wait for all image uploads to complete
        const uploadResults = await Promise.all(imageUploadPromises);

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
            `Product created successfully with ${successful}/${totalImages} image${totalImages !== 1 ? "s" : ""}!`,
          );
        } else if (successful > 0) {
          // Some images failed
          toast.warning(
            `Product created! ${successful}/${totalImages} image${totalImages !== 1 ? "s" : ""} uploaded successfully, ${failed} failed.`,
          );
        } else {
          // All images failed but product was created
          toast.warning(
            `Product created successfully, but failed to upload all ${totalImages} image${totalImages !== 1 ? "s" : ""}. You can add images later.`,
          );
        }
      } else {
        // No images to upload
        toast.dismiss(loadingToastId);
        toast.success("Product created successfully!");
      }

      // Close the dialog on successful creation
      // Note: You might need to pass a close function or handle this differently based on your dialog implementation
    } catch (error) {
      // Handle product creation failure
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
    console.log("editing product:", data, mode);
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
    data: products?.data.entities ?? [],
    tableName: "Product",
    columns: [
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
      onPaginationChange(value) {
        console.log("Pagination Changed: ", value);
      },
    },
    columnVisibility: {
      enabled: true,
    },
    editing: {
      enabled: true,
      rowCreating: {
        enabled: true,
        autoSave: true,
        addDummyRow: () => {
          console.log("Add Dummy Row");
          handleAddProduct();
        },
      },
    },
  };
  return <ConfigurableTable config={config} isFetching={false} />;
};
