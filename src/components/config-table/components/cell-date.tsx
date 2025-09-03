import { Edit } from "lucide-react";

import { ConfigTableInlineEditor } from "@/components/config-table/components";
import type {
  ColumnConfig,
  MetaCellData,
} from "@/components/config-table/types";
import { Button } from "@/components/ui/button";

export const DateCell = <TData, TKey extends keyof TData>({
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
        type="date"
      />
    );
  }

  if (!value) {
    return (
      <div className="flex items-center justify-between group">
        <span>-</span>
        {columnConfig?.editable && onEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onEdit}
          >
            <Edit className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  const date = new Date(String(value));
  return (
    <div className="flex items-center justify-between group">
      <span className="text-sm">{date.toLocaleDateString()}</span>
      {columnConfig?.editable && onEdit && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onEdit}
        >
          <Edit className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
