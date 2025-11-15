import { useState } from "react";

import { Card } from "@/components";
import { ConfigurableTable } from "@/components/config-table/components";
import type { TableConfig } from "@/components/config-table/types";
import { INITIAL_PAGING, INITIAL_SORTING } from "@/constants";
import {
  ORDER_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  SELLING_METHODS_OPTIONS,
} from "@/features/orders/constants";
import type { ModifiedOrder } from "@/features/orders/types/order.type";
import { useGetOrdersQuery } from "@/services/orders";
import type { ResourceListQueryParams } from "@/types";

export const LatestOrderTable = () => {
  const [pagination, setPagination] =
    useState<ResourceListQueryParams["paging"]>(INITIAL_PAGING);

  const { data, isLoading, isFetching } = useGetOrdersQuery({
    paging: pagination,
    sorting: INITIAL_SORTING,
  });

  const config: TableConfig<ModifiedOrder> = {
    data: data?.data.entities || [],
    columns: [
      {
        header: "Date",
        accessorKey: "created_at",
        id: "order_date",
        mutationKey: "created_at",
        type: "date",
      },
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
    },
    columnVisibility: {
      enabled: true,
    },
  };
  return (
    <Card className="shadow-none h-auto flex flex-col p-0 pb-2 px-2 rounded-lg">
      <ConfigurableTable config={config} isFetching={isLoading || isFetching} />
    </Card>
  );
};
