import { ConfigTableInlineEditor } from "@/components/config-table/components";
import type {
  ColumnConfig,
  MetaCellData,
} from "@/components/config-table/types";

export const NumberCell = <TData, TKey extends keyof TData>({
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  columnConfig,
}: {
  value: string | string[] | number | boolean;
  isEditing?: boolean;
  onEdit?: () => void;
  // eslint-disable-next-line no-unused-vars
  onSave: ((newValue: MetaCellData) => Promise<void>) | undefined;
  onCancel?: () => void;
  columnConfig?: ColumnConfig<TData, TKey>;
}) => {
  if (isEditing && onSave && onCancel) {
    return (
      <ConfigTableInlineEditor
        value={value}
        onSave={onSave}
        onCancel={onCancel}
        type="number"
        validation={columnConfig?.validation}
      />
    );
  }

  return (
    <div
      className={`text-sm text-right p-2 min-h-[32px] flex items-center cursor-pointer ${
        columnConfig?.editable ? "border border-transparent" : ""
      }`}
      onClick={columnConfig?.editable ? onEdit : undefined}
    >
      {typeof value === "number" ? value.toLocaleString() : "-"}
    </div>
  );
};
