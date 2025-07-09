/* eslint-disable no-unused-vars */
import type { ColumnDef } from "@tanstack/react-table";

export interface IAppTableState {
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  isDataUpdating: boolean;
}

export interface EditableCellProps<TData = any> {
  getValue: () => any;
  rowIndex: number;
  columnId: string;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
  onSave?: (value: any) => Promise<void> | void;
  type?: "text" | "number" | "date" | "select" | "multi-select";
  options?: { label: string; value: any }[];
  disabled: boolean;
}

export type ReusableTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  onDataChange?: (data: TData[]) => void;
  enableColumnResizing?: boolean;
  enableEditing?: boolean;
  isSaving?: boolean;
  className?: string;
  // Pagination
  enablePagination?: boolean;
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number;
  onPageChange?: (newPageIndex: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
};

export type ISelectOption = {
  label: string;
  value: string | number;
};
