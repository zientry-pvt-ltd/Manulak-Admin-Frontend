import type { LucideProps } from "lucide-react";
import * as React from "react";

import AppIcon from "@/components/ui/app-icon";
import AppInput from "@/components/ui/app-input";
import AppText, { type FontSize } from "@/components/ui/app-text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface AppSingleSelectAutoCompleteProps {
  label?: string;
  error?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "fill";
  fullWidth?: boolean;
  className?: string;
  items: { label: string; value: string }[];
  value?: string;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  startIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const sizeClasses: Record<
  NonNullable<AppSingleSelectAutoCompleteProps["size"]>,
  string
> = {
  sm: "h-8 w-[200px] px-2",
  md: "h-10 w-[250px] px-3",
  lg: "h-12 w-[320px] px-4",
};

const fontSizeMap: Record<
  NonNullable<AppSingleSelectAutoCompleteProps["size"]>,
  FontSize
> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const AppSingleSelectAutoComplete: React.FC<
  AppSingleSelectAutoCompleteProps
> = ({
  label,
  error,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  size = "md",
  variant = "outline",
  fullWidth = false,
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  disabled,
  startIcon,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);

  return (
    <div className={cn(fullWidth ? "w-full" : "w-fit", "min-w-[200px]")}>
      {label && (
        <AppText
          as="label"
          variant="label"
          size={fontSizeMap[size]}
          className="block mb-1"
        >
          {label}
        </AppText>
      )}

      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger
          size={size === "sm" ? "sm" : "default"}
          className={cn(
            "flex items-center",
            sizeClasses[size],
            variant === "fill" ? "bg-muted/30" : "bg-transparent",
            error
              ? "border-destructive focus-visible:ring-destructive/40"
              : "border-input focus-visible:ring-ring/40",
            fullWidth && "w-full",
            className,
          )}
          aria-invalid={!!error}
        >
          <div className="flex items-center gap-2">
            {startIcon && (
              <AppIcon
                Icon={startIcon}
                size={size}
                className="text-muted-foreground"
              />
            )}
            <SelectValue
              placeholder={
                <AppText size={fontSizeMap[size]} color="muted">
                  {placeholder}
                </AppText>
              }
            />
          </div>
        </SelectTrigger>

        <SelectContent>
          <div className="p-2 border-b sticky top-0 bg-background z-10">
            <AppInput
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("h-8", fontSizeMap[size])}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              fullWidth
              size={size}
            />
          </div>
          <SelectGroup className="max-h-[200px] overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="py-6 text-center">
                <AppText size={fontSizeMap[size]} color="muted">
                  {emptyText}
                </AppText>
              </div>
            ) : (
              filteredItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <AppText size={fontSizeMap[size]}>{item.label}</AppText>
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

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

export default AppSingleSelectAutoComplete;
