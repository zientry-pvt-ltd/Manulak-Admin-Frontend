import { Copy } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

import { AppIconButton, AppText } from "@/components";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const getMiddleTruncated = (str: string, maxLength = 16) => {
    if (str.length <= maxLength) return str;
    const keep = Math.floor((maxLength - 3) / 2);
    return `${str.slice(0, keep)}.....${str.slice(-keep)}`;
  };

  const displayText =
    typeof text === "string" ? getMiddleTruncated(text, 16) : text;

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
    <TooltipProvider>
      <div className="flex items-center gap-x-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <AppText
              size="text-xs"
              className="truncate max-w-[170px] cursor-pointer"
            >
              {displayText}
            </AppText>
          </TooltipTrigger>
          <TooltipContent>
            <span>{text}</span>
          </TooltipContent>
        </Tooltip>
        <AppIconButton
          variant={"outline"}
          Icon={Copy}
          size="sm"
          onClick={handleCopy}
          disabled={text === "N/A"}
        />
      </div>
    </TooltipProvider>
  );
};
