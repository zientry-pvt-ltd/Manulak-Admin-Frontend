import { Copy } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { AppIconButton, AppText } from "@/components";

type ProductCustomIdCellProps = {
  value: string | number | boolean | string[];
};

export const ProductCustomIdCell = ({ value }: ProductCustomIdCellProps) => {
  const text =
    value == null ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
      ? "N/A"
      : Array.isArray(value)
        ? value.join(", ")
        : String(value);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text: ", error);
      toast.error("Failed to copy");
    }
  }, [text]);

  return (
    <div className="flex items-center gap-x-3">
      <AppText size="text-xs" className="truncate max-w-[170px]">
        {text}
      </AppText>

      <AppIconButton
        variant={"outline"}
        Icon={Copy}
        size="sm"
        onClick={handleCopy}
        disabled={text === "N/A"}
      />
    </div>
  );
};
