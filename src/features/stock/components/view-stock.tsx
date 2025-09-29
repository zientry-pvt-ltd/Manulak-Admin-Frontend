import { MinusCircle, PlusCircle } from "lucide-react";
import { useMemo } from "react";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import { ExistingStockIndicator, QuantityForm } from "@/features/stock";
import type { IStockInfo } from "@/features/stock/types/stock.type";
import { useAppDialog } from "@/providers";

export const ViewStock = () => {
  const { openAppDialog } = useAppDialog();

  const config: TableConfig<IStockInfo> = useMemo(
    () => ({
      data: [
        {
          id: "1",
          product_name: "Wireless Headphones",
          category: "Electronics",
          quantity: 25,
          unit_price: 89.99,
          net_worth: 2249.75,
        },
        {
          id: "2",
          product_name: "Coffee Beans",
          category: "Food & Beverages",
          quantity: 50,
          unit_price: 12.5,
          net_worth: 625.0,
        },
        {
          id: "3",
          product_name: "Office Chair",
          category: "Furniture",
          quantity: 8,
          unit_price: 199.99,
          net_worth: 1599.92,
        },
        {
          id: "4",
          product_name: "Running Shoes",
          category: "Sports & Outdoors",
          quantity: 15,
          unit_price: 129.95,
          net_worth: 1949.25,
        },
        {
          id: "5",
          product_name: "Notebook Set",
          category: "Stationery",
          quantity: 100,
          unit_price: 4.99,
          net_worth: 499.0,
        },
      ],
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
          accessorKey: "category",
          header: "Category",
          mutationKey: "category",
          type: "text",
          hideable: true,
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
          accessorKey: "unit_price",
          header: "Unit Price ($)",
          mutationKey: "unit_price",
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
              onClick: () => {
                openAppDialog({
                  title: "Change of Stock Quantity",
                  description: "Add stock to the existing quantity.",
                  content: <QuantityForm action="add" />,
                });
              },
            },
            {
              Icon: MinusCircle,
              variant: "outline",
              tooltip: "Remove Stock",
              onClick: () => {
                openAppDialog({
                  title: "Change of Stock Quantity",
                  description: "Remove stock from the existing quantity.",
                  content: <QuantityForm action="remove" />,
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
    [openAppDialog],
  );
  return <ConfigurableTable config={config} isFetching={false} />;
};
