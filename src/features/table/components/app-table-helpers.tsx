import type { CellContext, ColumnDef } from "@tanstack/react-table";

import AppTableChip from "@/features/table/components/app-table-chip";
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
    enableEditing?: boolean | undefined;
    // eslint-disable-next-line no-unused-vars
    onSave?: (value: any) => Promise<void> | void;
  },
): ColumnDef<TData> => ({
  accessorKey,
  header,
  size: options?.size || 200,
  minSize: options?.minSize || 200,
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
      disabled={
        options?.enableEditing === false ||
        !props.table.options.meta?.enableEditing
      }
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
    type?: "default" | "chip";
    chipOptions?: Record<string | number, { label: string; color: string }>;
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

    if (options?.type === "chip" && options.chipOptions) {
      return (
        <AppTableChip value={String(value)} variantMap={options.chipOptions} />
      );
    }

    // Default rendering
    return options?.formatter ? (
      options.formatter(value)
    ) : (
      <span className="text-xs">{String(value)}</span>
    );
  },
});
