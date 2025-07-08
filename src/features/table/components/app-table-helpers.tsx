import type { CellContext, ColumnDef } from "@tanstack/react-table";

import EditableCell from "@/features/table/components/app-table-editable-cell";

export const createEditableColumn = <TData,>(
  accessorKey: keyof TData,
  header: string,
  options?: {
    size?: number;
    minSize?: number;
    maxSize?: number;
    type?: "text" | "number" | "date" | "select" | "multi-select";
    selectOptions?: { label: string; value: string | number }[];
    // eslint-disable-next-line no-unused-vars
    onSave?: (value: any) => Promise<void> | void;
  },
): ColumnDef<TData> => ({
  accessorKey,
  header,
  size: options?.size || 200,
  minSize: options?.minSize || 300,
  maxSize: options?.maxSize || 400,
  cell: (props: CellContext<TData, unknown>) => (
    <EditableCell
      getValue={props.getValue}
      rowIndex={props.row.index}
      columnId={props.column.id}
      updateData={props.table.options.meta?.updateData || (() => {})}
      onSave={options?.onSave}
      type={options?.type || "text"}
      options={options?.selectOptions || []}
      disabled={!(props.table.options.meta as any)?.enableEditing}
    />
  ),
});

export const createDisplayColumn = <TData,>(
  accessorKey: keyof TData,
  header: string,
  options?: {
    size?: number;
    minSize?: number;
    maxSize?: number;
    // eslint-disable-next-line no-unused-vars
    formatter?: (value: any) => React.ReactNode;
  },
): ColumnDef<TData> => ({
  accessorKey,
  header,
  size: options?.size || 200,
  minSize: options?.minSize || 100,
  maxSize: options?.maxSize || 400,
  cell: (props: CellContext<TData, unknown>) => {
    const value = props.getValue();
    return options?.formatter ? (
      options.formatter(value)
    ) : (
      <span>{String(value)}</span>
    );
  },
});
