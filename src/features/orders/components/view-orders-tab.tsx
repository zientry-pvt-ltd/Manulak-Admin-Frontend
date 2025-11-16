import { Download, Edit, Eye, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import { INITIAL_PAGING, INITIAL_SORTING } from "@/constants";
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
import {
  orderApi,
  useGetOrdersQuery,
  useUpdateOrderMetaDataMutation,
} from "@/services/orders";
import { store } from "@/store";
import { useAppDispatch } from "@/store/utils";
import type { ResourceListQueryParams } from "@/types";
import { normalizeError } from "@/utils/error-handler";

export const ViewOrdersTab = () => {
  const dispatch = useAppDispatch();
  const { confirm } = useConfirmDialog();
  const { openAppDialog } = useAppDialog();
  const [deleteFullOrder] = useUpdateOrderMetaDataMutation();

  const [filters, setFilters] = useState<ResourceListQueryParams["filters"]>(
    [],
  );
  const [pagination, setPagination] =
    useState<ResourceListQueryParams["paging"]>(INITIAL_PAGING);

  const { data, isLoading, isFetching } = useGetOrdersQuery({
    paging: pagination,
    filters: filters,
    sorting: INITIAL_SORTING,
  });

  const handleDeleteOrder = useCallback(
    async (orderId: string) => {
      try {
        await deleteFullOrder({
          id: orderId,
          data: { status: "CANCELLED" },
        }).unwrap();
        toast.success("Order deleted successfully");
      } catch (error) {
        const message = normalizeError(error);
        toast.error(`Failed to delete order: ${message.message}`);
        console.error("Error deleting order:", error);
      }
    },
    [deleteFullOrder],
  );

  const handleConfirmDeleteOrder = useCallback(
    (orderId: string) => {
      confirm({
        title: "Delete Order",
        description:
          "You're going to delete your Order. This action is irreversible. Are you sure you want to continue?",
        variant: "destructive",
        confirmText: "Yes, Delete!",
        cancelText: "No, keep it",
        onSubmit: () => handleDeleteOrder(orderId),
      });
    },
    [confirm, handleDeleteOrder],
  );

  const config: TableConfig<ModifiedOrder> = {
    data: data?.data.entities || [],
    columns: [
      {
        header: "Customer F Name",
        accessorKey: "first_name",
        id: "first_name",
        mutationKey: "first_name",
        type: "text",
        filtering: {
          enabled: true,
          filterType: "auto-complete",
          asyncOptions: {
            fetchOptions: async (query: string) => {
              const result = await store.dispatch(
                orderApi.endpoints.getOrders.initiate({
                  paging: INITIAL_PAGING,
                  sorting: INITIAL_SORTING,
                  filters: [
                    {
                      query_attribute: "first_name",
                      query: query,
                    },
                  ],
                }),
              );

              if (result.data) {
                return result.data.data.entities.map((order) => ({
                  label: `${order.first_name} ${order.last_name}`,
                  value: order.first_name,
                }));
              }

              return [];
            },
          },
        },
      },
      {
        header: "Customer L Name",
        accessorKey: "last_name",
        id: "last_name",
        mutationKey: "last_name",
        type: "text",
        filtering: {
          enabled: true,
          filterType: "auto-complete",
          asyncOptions: {
            fetchOptions: async (query: string) => {
              const result = await store.dispatch(
                orderApi.endpoints.getOrders.initiate({
                  paging: INITIAL_PAGING,
                  sorting: INITIAL_SORTING,
                  filters: [
                    {
                      query_attribute: "last_name",
                      query: query,
                    },
                  ],
                }),
              );

              if (result.data) {
                return result.data.data.entities.map((order) => ({
                  label: `${order.first_name} ${order.last_name}`,
                  value: order.last_name,
                }));
              }

              return [];
            },
          },
        },
      },
      {
        header: "Customer Phone",
        accessorKey: "primary_phone_number",
        id: "primary_phone_number",
        mutationKey: "primary_phone_number",
        type: "text",
        filtering: {
          enabled: true,
          filterType: "text",
        },
      },
      {
        header: "Selling Method",
        accessorKey: "selling_method",
        id: "selling_method",
        mutationKey: "selling_method",
        type: "single-select",
        options: SELLING_METHODS_OPTIONS,
        filtering: {
          enabled: true,
          filterType: "single-select",
          filterOptions: SELLING_METHODS_OPTIONS,
        },
      },
      {
        header: "Order Status",
        accessorKey: "status",
        id: "status",
        mutationKey: "status",
        type: "single-select",
        options: ORDER_STATUS_OPTIONS,
        filtering: {
          enabled: true,
          filterType: "single-select",
          filterOptions: ORDER_STATUS_OPTIONS,
        },
      },
      {
        header: "Payment Method",
        accessorKey: "payment_method",
        id: "payment_method",
        mutationKey: "payment_method",
        type: "single-select",
        options: PAYMENT_METHOD_OPTIONS,
        filtering: {
          enabled: true,
          filterType: "single-select",
          filterOptions: PAYMENT_METHOD_OPTIONS,
        },
      },
      {
        header: "Order Value",
        accessorKey: "order_value",
        id: "order_value",
        mutationKey: "order_value",
        type: "number",
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
              dispatch(setSelectedOrderId(row.order_id));
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
            onClick: (row) => handleConfirmDeleteOrder(row.order_id),
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
    customToolBar: OrderPlacementMenu,
  };
  return (
    <ConfigurableTable config={config} isFetching={isLoading || isFetching} />
  );
};
