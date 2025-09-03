import { ConfigTableInlineEditor } from "@/components/config-table/components";
import type {
  ColumnConfig,
  MetaCellData,
  SelectOption,
} from "@/components/config-table/types";
import { Badge } from "@/components/ui/badge";

export const SingleSelectCell = <TData, TKey extends keyof TData>({
  value,
  options,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  columnConfig,
}: {
  value: string | string[] | number | boolean;
  options: SelectOption[];
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
        type="single-select"
        options={options}
      />
    );
  }

  const option = options.find((opt) => opt.value === value.toString());

  return (
    <div
      className={`p-2 min-h-[32px] flex items-center cursor-pointer ${
        columnConfig?.editable ? "border border-transparent" : ""
      }`}
      onClick={columnConfig?.editable ? onEdit : undefined}
    >
      <Badge
        variant={option ? "secondary" : "outline"}
        className="text-xs font-normal"
        style={{
          backgroundColor: option?.color?.background,
          color: option?.color?.text,
        }}
      >
        {option?.icon && <option.icon className="mr-0.5 h-3 w-3" />}
        {option?.label || value || "-"}
      </Badge>
    </div>
  );
};
