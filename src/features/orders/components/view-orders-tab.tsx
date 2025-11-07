import { Download, Edit, Eye, Trash } from "lucide-react";
import { useCallback } from "react";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import {
  OrderEditViewTabs,
  OrderPlacementMenu,
  OrderReceiptView,
} from "@/features/orders";
import {
  ORDER_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  SELLING_METHODS_OPTIONS,
} from "@/features/orders/constants";
import { setSelectedOrderId } from "@/features/orders/store/order-slice";
import type { ModifiedOrder } from "@/features/orders/types/order.type";
import { useAppDialog, useConfirmDialog } from "@/providers";
import { useGetOrdersQuery } from "@/services/orders";
import { useGetProductsQuery } from "@/services/product";
import { useAppDispatch } from "@/store/utils";

export const ViewOrdersTab = () => {
  const dispatch = useAppDispatch();
  const { confirm } = useConfirmDialog();
  const { openAppDialog } = useAppDialog();
  useGetProductsQuery({
    filters: {
      query: "",
    },
    paging: { pageNo: 1, pageSize: 1000 },
    sorting: { columnName: "created_at", sortOrder: -1 },
  });

  const { data, isLoading } = useGetOrdersQuery({
    paging: { pageNo: 1, pageSize: 100 },
    sorting: { columnName: "created_at", sortOrder: -1 },
    filters: { query: "" },
  });

  const handleDeleteOrder = useCallback(
    (orderId: string) => {
      confirm({
        title: "Delete Order",
        description:
          "You're going to delete your Order. This action is irreversible. Are you sure you want to continue?",
        variant: "destructive",
        confirmText: "Yes, Delete!",
        cancelText: "No, keep it",
        onSubmit: () => {
          console.log("Deleting order with ID:", orderId);
        },
      });
    },
    [confirm],
  );

  const config: TableConfig<ModifiedOrder> = {
    data: data?.data.entities || [],
    columns: [
      {
        header: "Customer Name",
        accessorKey: "full_name",
        id: "customer_name",
        mutationKey: "full_name",
        type: "text",
      },
      {
        header: "Customer Phone",
        accessorKey: "primary_phone_number",
        id: "customer_phone",
        mutationKey: "primary_phone_number",
        type: "text",
      },
      {
        header: "Selling Method",
        accessorKey: "selling_method",
        id: "selling_method",
        mutationKey: "selling_method",
        type: "single-select",
        options: SELLING_METHODS_OPTIONS,
      },
      {
        header: "Order Status",
        accessorKey: "status",
        id: "order_status",
        mutationKey: "status",
        type: "single-select",
        options: ORDER_STATUS_OPTIONS,
      },
      {
        header: "Order Value",
        accessorKey: "order_value",
        id: "order_value",
        mutationKey: "order_value",
        type: "number",
      },
      {
        header: "Payment Method",
        accessorKey: "payment_method",
        id: "payment_method",
        mutationKey: "payment_method",
        type: "single-select",
        options: PAYMENT_METHOD_OPTIONS,
      },
      {
        header: "Actions",
        accessorKey: "order_id",
        id: "actions",
        mutationKey: "order_id",
        type: "icon-buttons",
        iconButtons: [
          {
            Icon: Eye,
            tooltip: "View Order Details",
            variant: "outline",
            onClick: (row) => {
              dispatch(setSelectedOrderId(row.order_id));
              openAppDialog({
                title: "Order Details",
                description: `Viewing details for order with ID: ${row.order_id}`,
                disableFooter: true,
                content: <OrderEditViewTabs mode="view" />,
              });
            },
          },
          {
            Icon: Edit,
            tooltip: "Edit Order",
            variant: "outline",
            onClick: (row) => {
              dispatch(setSelectedOrderId(row.order_id));
              openAppDialog({
                title: "Edit Order",
                description: `Editing order with ID: ${row.order_id}`,
                disableFooter: true,
                content: <OrderEditViewTabs mode="edit" />,
              });
            },
          },
          {
            Icon: Download,
            tooltip: "Order Receipt",
            variant: "outline",
            onClick: (row) => {
              openAppDialog({
                title: "Order Receipt",
                disableFooter: true,
                content: <OrderReceiptView orderId={row.order_id} />,
              });
            },
          },
          {
            Icon: Trash,
            tooltip: "Delete Order",
            variant: "destructive",
            onClick: (row) => handleDeleteOrder(row.order_id),
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
    customToolBar: OrderPlacementMenu,
  };
  return <ConfigurableTable config={config} isFetching={isLoading} />;
};
