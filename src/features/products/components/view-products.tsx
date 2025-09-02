import { Edit, Eye, Trash } from "lucide-react";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import type { Product } from "@/features/products";
import { sampleProducts } from "@/features/products/constants";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export const ViewProducts = () => {
  const { confirm } = useConfirmDialog();

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
        hideable: true,
      },
      {
        id: "selling_price",
        accessorKey: "selling_price",
        mutationKey: "selling_price",
        header: "Selling Price",
        type: "text",
      },
      {
        id: "bought_price",
        accessorKey: "bought_price",
        mutationKey: "bought_price",
        header: "Bought Price",
        type: "text",
      },
      {
        id: "unit_weight",
        accessorKey: "unit_weight",
        mutationKey: "unit_weight",
        header: "Unit Weight",
        type: "text",
      },
      {
        id: "actions",
        accessorKey: "id",
        mutationKey: "id",
        header: "Actions",
        type: "icon-buttons",
        iconButtons: [
          {
            Icon: Eye,
            tooltip: "View Product",
            onClick: (row) => console.log("View", row),
            variant: "outline",
          },
          {
            Icon: Edit,
            tooltip: "Edit Product",
            onClick: (row) => console.log("Edit", row),
            variant: "outline",
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
        },
      },
    },
  };
  return <ConfigurableTable config={config} isFetching={false} />;
};
