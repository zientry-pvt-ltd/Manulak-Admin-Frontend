import { MinusCircle, PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import { INITIAL_PAGING, INITIAL_SORTING } from "@/constants";
import { CATEGORIES_OPTIONS } from "@/features/products/constants";
import type { IProductInfo } from "@/features/products/types/product.type";
import { ExistingStockIndicator, QuantityForm } from "@/features/stock";
import { useAppDialog } from "@/providers";
import { productApi, useGetProductsQuery } from "@/services/product";
import { store } from "@/store";
import type { ResourceListQueryParams } from "@/types";
import { formatCurrencyInput } from "@/utils/Formatting";

type ModifiedTableData = Omit<IProductInfo, "selling_price"> & {
  selling_price: string;
};

const transFormProductData = (products: IProductInfo[]) => {
  return products.map((product) => ({
    ...product,
    selling_price: formatCurrencyInput(product.selling_price.toString()),
  }));
};

export const ViewStock = () => {
  const { openAppDialog } = useAppDialog();

  const [filters, setFilters] = useState<ResourceListQueryParams["filters"]>(
    [],
  );
  const [pagination, setPagination] =
    useState<ResourceListQueryParams["paging"]>(INITIAL_PAGING);

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    filters: filters,
    paging: pagination,
    sorting: INITIAL_SORTING,
  });

  const config: TableConfig<ModifiedTableData> = useMemo(
    () => ({
      data: transFormProductData(productData?.data.entities || []) || [],
      columns: [
        {
          id: "product_name",
          accessorKey: "product_name",
          header: "Product Name",
          mutationKey: "product_name",
          type: "text",
          hideable: true,
          filtering: {
            enabled: true,
            filterType: "auto-complete",
            asyncOptions: {
              fetchOptions: async (query: string) => {
                const result = await store.dispatch(
                  productApi.endpoints.getProducts.initiate({
                    paging: INITIAL_PAGING,
                    sorting: INITIAL_SORTING,
                    filters: [
                      {
                        query_attribute: "product_name",
                        query: query,
                      },
                    ],
                  }),
                );

                if (result.data) {
                  return result.data.data.entities.map((product) => ({
                    label: product.product_name,
                    value: product.product_name,
                  }));
                }

                return [];
              },
            },
          },
        },
        {
          id: "category",
          accessorKey: "product_category",
          header: "Category",
          mutationKey: "product_category",
          type: "single-select",
          hideable: true,
          options: CATEGORIES_OPTIONS,
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
          id: "selling_price",
          accessorKey: "selling_price",
          header: "Selling Price (Rs)",
          mutationKey: "selling_price",
          type: "text",
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
                  disableFooter: true,
                  content: (
                    <QuantityForm
                      formId="quantity-add-form"
                      action="ADD"
                      productId={row.id}
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
                  disableFooter: true,
                  content: (
                    <QuantityForm
                      formId="quantity-remove-form"
                      action="REMOVE"
                      productId={row.id}
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
        initialState: {
          pageIndex: pagination.pageNo - 1,
          pageSize: pagination.pageSize,
        },
        onPaginationChange(value) {
          setPagination({
            pageNo: value.pageIndex + 1,
            pageSize: value.pageSize,
          });
        },
      },
      filtering: {
        enabled: true,
        onColumnFilterChange(value) {
          const newFilters = value.map((filter) => ({
            query_attribute: filter.id,
            query: String(filter.value),
          }));
          setFilters(newFilters);
        },
      },
      columnVisibility: {
        enabled: true,
      },
      customToolBar: () => <ExistingStockIndicator />,
    }),
    [
      openAppDialog,
      pagination.pageNo,
      pagination.pageSize,
      productData?.data.entities,
    ],
  );
  return (
    <ConfigurableTable config={config} isFetching={isLoading || isFetching} />
  );
};
