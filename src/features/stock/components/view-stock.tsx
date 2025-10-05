import { MinusCircle, PlusCircle } from "lucide-react";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import { CATEGORIES } from "@/features/products/constants";
import type { IProductInfo } from "@/features/products/types/product.type";
import { ExistingStockIndicator, QuantityForm } from "@/features/stock";
import type { StockOperationType } from "@/features/stock/types/stock.type";
import { useAppDialog } from "@/providers";
import { useGetProductsQuery } from "@/services/product";
import { useUpdateStockQuantityMutation } from "@/services/stock";
import { selectProducts } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export const ViewStock = () => {
  const { openAppDialog, closeAppDialog } = useAppDialog();
  const { products } = useAppSelector(selectProducts);

  const [updateStockQuantity] = useUpdateStockQuantityMutation();

  const handleUpdateProductQuantity = useCallback(
    async ({
      productId,
      action,
      quantity,
    }: {
      action: StockOperationType;
      productId: string;
      quantity: number;
    }) => {
      try {
        await updateStockQuantity({
          productId: productId,
          body: {
            operation: action,
            quantity: quantity,
          },
        }).unwrap();

        toast.success("Stock quantity update successfully");

        setTimeout(() => {
          closeAppDialog();
        }, 1000);
      } catch (error) {
        const message = normalizeError(error);
        toast.error(`Failed to update quantity: ${message.message}`);
        console.error("Product update failed:", error);
      }
    },
    [closeAppDialog, updateStockQuantity],
  );

  const { isLoading } = useGetProductsQuery({
    filters: {
      query: "",
    },
    paging: { pageNo: 1, pageSize: 10 },
    sorting: { columnName: "created_at", sortOrder: -1 },
  });

  const config: TableConfig<IProductInfo> = useMemo(
    () => ({
      data: products,
      columns: [
        {
          id: "name",
          accessorKey: "product_name",
          header: "Product Name",
          mutationKey: "product_name",
          type: "text",
          hideable: true,
          filtering: {
            enabled: true,
            filterType: "text",
          },
        },
        {
          id: "category",
          accessorKey: "product_category",
          header: "Category",
          mutationKey: "product_category",
          type: "single-select",
          hideable: true,
          options: CATEGORIES,
        },
        {
          id: "quantity",
          accessorKey: "quantity",
          header: "Quantity",
          mutationKey: "quantity",
          type: "number",
          hideable: true,
        },
        {
          id: "unit_price",
          accessorKey: "bought_price",
          header: "Unit Price ($)",
          mutationKey: "bought_price",
          type: "number",
          hideable: true,
        },
        {
          id: "actions",
          header: "Actions",
          accessorKey: "id",
          mutationKey: "id",
          type: "icon-buttons",
          iconButtons: [
            {
              Icon: PlusCircle,
              variant: "outline",
              tooltip: "Add Stock",
              onClick: (row) => {
                openAppDialog({
                  title: "Change of Stock Quantity",
                  description: "Add stock to the existing quantity.",
                  formId: "quantity-add-form",
                  content: (
                    <QuantityForm
                      formId="quantity-add-form"
                      action="ADD"
                      productId={row.id}
                      onSubmit={handleUpdateProductQuantity}
                    />
                  ),
                });
              },
            },
            {
              Icon: MinusCircle,
              variant: "outline",
              tooltip: "Remove Stock",
              onClick: (row) => {
                openAppDialog({
                  title: "Change of Stock Quantity",
                  formId: "quantity-remove-form",
                  description: "Remove stock from the existing quantity.",
                  content: (
                    <QuantityForm
                      formId="quantity-remove-form"
                      action="REMOVE"
                      productId={row.id}
                      onSubmit={handleUpdateProductQuantity}
                    />
                  ),
                });
              },
            },
          ],
        },
      ],
      pagination: {
        enabled: true,
      },
      filtering: {
        enabled: true,
      },
      columnVisibility: {
        enabled: true,
      },
      customToolBar: () => <ExistingStockIndicator />,
    }),
    [handleUpdateProductQuantity, openAppDialog, products],
  );
  return <ConfigurableTable config={config} isFetching={isLoading} />;
};
