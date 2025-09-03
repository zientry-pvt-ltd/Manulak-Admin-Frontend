import type { ColumnConfig } from "@/components/config-table/types";
import AppIconButton from "@/components/ui/app-icon-button";

export const CellIconButtons = <TData, TKey extends keyof TData>({
  columnConfig,
  row,
}: {
  columnConfig?: ColumnConfig<TData, TKey>;
  row: TData;
}) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {columnConfig?.iconButtons?.map((btn, i) => {
        const Btn = btn.Icon;
        return (
          <AppIconButton
            key={i}
            onClick={() => btn.onClick(row)}
            disabled={btn.disabled?.(row)}
            title={btn.tooltip}
            Icon={Btn}
            size="sm"
            variant={btn.variant || "ghost"}
          />
        );
      })}
    </div>
  );
};
