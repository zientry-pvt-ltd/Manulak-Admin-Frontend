import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { AppText } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ColumnResizer from "@/features/table/components/app-table-column-resizer";
import type { ReusableTableProps } from "@/features/table/types/appConfig.type";

// Extend the TableMeta interface
declare module "@tanstack/react-table" {
  // eslint-disable-next-line no-unused-vars
  interface TableMeta<TData extends unknown> {
    // eslint-disable-next-line no-unused-vars
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    enableEditing: boolean;
  }
}

const ReusableTable = <TData,>({
  data,
  columns,
  onDataChange,
  enableColumnResizing = true,
  enableEditing = true,
  className = "",
  enablePagination = false,
  pageIndex = 0,
  pageSize = 10,
  totalCount = 0,
  onPageChange,
  onPageSizeChange,
}: ReusableTableProps<TData>) => {
  const [tableData, setTableData] = useState(data);

  // Update internal data when prop changes
  useMemo(() => {
    setTableData(data);
  }, [data]);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    const newData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnId]: value };
      }
      return row;
    });

    setTableData(newData);
    onDataChange?.(newData);
  };

  if (
    enablePagination &&
    (pageIndex === undefined ||
      pageSize === undefined ||
      totalCount === undefined ||
      !onPageChange ||
      !onPageSizeChange)
  ) {
    console.error(
      "ReusableTable: When `enablePagination` is true, you must provide `pageIndex`, `pageSize`, `totalCount`, `onPageChange`, and `onPageSizeChange`.",
    );

    return (
      <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded">
        Pagination is enabled, but required pagination props are missing.
      </div>
    );
  }

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    enableColumnResizing,
    meta: {
      updateData,
      enableEditing,
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-auto max-h-[600px]">
        <Table className="table-fixed min-w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="relative group border-b bg-gray-50"
                    style={{
                      width: header.getSize(),
                      cursor: header.column.getIsResizing()
                        ? "col-resize"
                        : undefined,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <AppText className="font-medium">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </AppText>
                    )}
                    {enableColumnResizing && (
                      <ColumnResizer
                        isResizing={header.column.getIsResizing()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="pb-4">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow className="h-0.5">
              <TableCell colSpan={table.getAllColumns().length} />
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          {/* Rows per page dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize">Rows per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(pageIndex - 1)}
              disabled={pageIndex === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize)}
            </span>
            <button
              onClick={() => onPageChange?.(pageIndex + 1)}
              disabled={(pageIndex + 1) * pageSize >= totalCount}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
