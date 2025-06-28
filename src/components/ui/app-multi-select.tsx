import { Check, X } from "lucide-react";
import * as React from "react";

import AppText, { type FontSize } from "@/components/ui/app-text";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface AppMultiSelectProps {
  label?: string;
  items: { label: string; value: string }[];
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string[]) => void;
  placeholder?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "fill";
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses: Record<NonNullable<AppMultiSelectProps["size"]>, string> = {
  sm: "py-1.5 min-h-8 w-[200px] px-2",
  md: "py-1.5 min-h-10 w-[250px] px-3",
  lg: "py-1.5 min-h-12 w-[320px] px-4",
};

const fontSizeMap: Record<
  NonNullable<AppMultiSelectProps["size"]>,
  FontSize
> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const AppMultiSelect: React.FC<AppMultiSelectProps> = ({
  label,
  items,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  error,
  size = "md",
  variant = "outline",
  fullWidth = false,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open, selectedValues.length]);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div
      className={cn(
        fullWidth ? "w-full" : "inline-flex",
        "min-w-[200px] max-w-full flex-col",
      )}
    >
      {label && (
        <AppText
          as="label"
          variant="label"
          className="block mb-1"
          size={fontSizeMap[size]}
        >
          {label}
        </AppText>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={triggerRef}
          className={cn(
            "border rounded-md flex flex-wrap items-center gap-2 min-h-[2.5rem] cursor-pointer transition-all",
            sizeClasses[size],
            variant === "fill" ? "bg-muted/30" : "bg-transparent",
            error
              ? "border-destructive focus:ring-destructive/30"
              : "border-input focus:ring-ring/40",
            "focus:outline-none focus:ring-2",
            fullWidth && "w-full",
            className,
          )}
        >
          {selectedValues.length === 0 ? (
            <AppText size={fontSizeMap[size]}>{placeholder}</AppText>
          ) : (
            selectedValues.map((val) => {
              const item = items.find((i) => i.value === val);
              return (
                <span
                  key={val}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted"
                >
                  <AppText
                    size={fontSizeMap[size]}
                    className="max-w-[120px]"
                    truncate
                  >
                    {item?.label}
                  </AppText>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleValue(val);
                    }}
                    className="hover:text-destructive ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })
          )}
        </PopoverTrigger>

        <PopoverContent
          align="start"
          style={{ width: triggerWidth }}
          className="p-0"
        >
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleValue(item.value)}
                >
                  <div className="flex items-center justify-between w-full">
                    <AppText size={fontSizeMap[size]}>{item.label}</AppText>
                    {selectedValues.includes(item.value) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <AppText
          size={fontSizeMap[size]}
          color="destructive"
          className="mt-0.5"
        >
          {error}
        </AppText>
      )}
    </div>
  );
};

export default AppMultiSelect;
