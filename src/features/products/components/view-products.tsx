import { Edit, Eye, Trash } from "lucide-react";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import type { Product } from "@/features/products";
import ProductForm, {
  type ExtendedFormValues,
  type ProductFormMode,
} from "@/features/products/components/product-form";
import { CATEGORIES, sampleProducts } from "@/features/products/constants";
import { selectProduct } from "@/features/products/store/product-slice";
import { useAppDialog, useConfirmDialog } from "@/providers";
import { useAppDispatch } from "@/store/utils";

export const ViewProducts = () => {
  const dispatch = useAppDispatch();
  const { confirm } = useConfirmDialog();
  const { openAppDialog } = useAppDialog();

  const handleDeleteProduct = () => {
    confirm({
      title: "Delete Product",
      description: "You're going to delete your Product",
      variant: "destructive",
      confirmText: "Yes, Delete!",
      cancelText: "No, keep it",
      onSubmit: async () => {},
    });
  };

  const handleAddProductSubmit = async ({
    data,
    mode,
  }: {
    data: ExtendedFormValues;
    mode: ProductFormMode;
  }) => {
    console.log("Adding product:", data, mode);
  };

  const handleEditProductSubmit = async ({
    data,
    mode,
  }: {
    data: ExtendedFormValues;
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

  const config: TableConfig<Product> = {
    data: sampleProducts,
    tableName: "Product",
    columns: [
      {
        id: "id",
        accessorKey: "id",
        mutationKey: "id",
        header: "ID",
        type: "id",
      },
      {
        id: "name",
        accessorKey: "name",
        mutationKey: "name",
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
        accessorKey: "description",
        mutationKey: "description",
        header: "Description",
        type: "text",
        hideable: true,
      },
      {
        id: "category",
        accessorKey: "category",
        mutationKey: "category",
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
                title: `View Product - ${row.name}`,
                description: `Details for product ${row.name}`,
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
                title: `Edit Product - ${row.name}`,
                description: `Edit details for product ${row.name}`,
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
            onClick: () => handleDeleteProduct(),
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
