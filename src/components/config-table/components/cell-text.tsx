import { ConfigTableInlineEditor } from "@/components/config-table/components";
import type {
  ColumnConfig,
  MetaCellData,
} from "@/components/config-table/types";

export const TextCell = <TData, TKey extends keyof TData>({
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
        type="text"
        validation={columnConfig?.validation}
        placeholder={columnConfig?.placeholder}
      />
    );
  }

  return (
    <span
      className={`text-xs p-2 min-h-[32px] flex items-center cursor-pointer font-normal h-auto flex-wrap break-words whitespace-pre-line ${
        columnConfig?.editable ? "border border-transparent" : ""
      }`}
      style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
      onClick={columnConfig?.editable ? onEdit : undefined}
    >
      <>{value || "-"}</>
    </span>
  );
};
