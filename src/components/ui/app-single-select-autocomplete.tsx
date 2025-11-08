/* eslint-disable no-unused-vars */
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

export interface SingleSelectOption {
  value: string;
  label: string;
  subLabel?: string;
  isDisabled?: boolean;
  meta?: Record<string, unknown>;
}

export interface AppSingleSelectAutoCompleteProps {
  label?: string;
  error?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  loadingText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "fill";
  fullWidth?: boolean;
  className?: string;
  items?: SingleSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, item: SingleSelectOption | undefined) => void;
  disabled?: boolean;
  startIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  // Server-side props
  isServerSide?: boolean;
  onSearch?: (query: string) => Promise<SingleSelectOption[]>;
  debounceMs?: number;
  minSearchLength?: number;
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
  loadingText = "Loading...",
  size = "md",
  variant = "outline",
  fullWidth = false,
  className,
  items = [],
  value,
  defaultValue,
  onValueChange,
  disabled,
  startIcon,
  isServerSide = false,
  onSearch,
  debounceMs = 300,
  minSearchLength = 0,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [serverItems, setServerItems] = React.useState<SingleSelectOption[]>(
    [],
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  // Server-side search with debounce
  React.useEffect(() => {
    if (!isServerSide || !onSearch) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchQuery.length < minSearchLength) {
      setServerItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // Debounce the search
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await onSearch(searchQuery);
        setServerItems(results);
      } catch (err) {
        console.error("Search error:", err);
        setServerItems([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, isServerSide, onSearch, debounceMs, minSearchLength]);

  const filteredItems = React.useMemo(() => {
    if (isServerSide) {
      return serverItems;
    }

    if (!searchQuery) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery, isServerSide, serverItems]);

  // Get the selected item to display only the label
  const selectedItem = React.useMemo(() => {
    const allItems = isServerSide ? serverItems : items;
    return allItems.find((item) => item.value === value);
  }, [value, serverItems, items, isServerSide]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleValueChange = (selectedValue: string) => {
    const allItems = isServerSide ? serverItems : items;
    const selectedItem = allItems.find((item) => item.value === selectedValue);

    if (onValueChange) {
      onValueChange(selectedValue, selectedItem);
    }
  };

  const displayContent = React.useMemo(() => {
    if (isLoading) {
      return (
        <div className="py-6 text-center">
          <AppText size={fontSizeMap[size]} color="muted">
            {loadingText}
          </AppText>
        </div>
      );
    }

    if (
      isServerSide &&
      searchQuery.length < minSearchLength &&
      minSearchLength > 0
    ) {
      return (
        <div className="py-6 text-center">
          <AppText size={fontSizeMap[size]} color="muted">
            Type at least {minSearchLength} character
            {minSearchLength > 1 ? "s" : ""} to search
          </AppText>
        </div>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <div className="py-6 text-center">
          <AppText size={fontSizeMap[size]} color="muted">
            {emptyText}
          </AppText>
        </div>
      );
    }

    return filteredItems.map((item) => (
      <SelectItem
        key={item.value}
        value={item.value}
        disabled={item?.isDisabled || false}
      >
        <div className="flex flex-col">
          <span>{item.label}</span>
          {item.subLabel && (
            <AppText size="text-xs" color="muted">
              {item.subLabel}
            </AppText>
          )}
        </div>
      </SelectItem>
    ));
  }, [
    isLoading,
    filteredItems,
    isServerSide,
    searchQuery.length,
    minSearchLength,
    emptyText,
    loadingText,
    size,
  ]);

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
        onValueChange={handleValueChange}
        disabled={disabled}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger
          aria-invalid={!!error}
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
            >
              {selectedItem && (
                <AppText size={fontSizeMap[size]}>{selectedItem.label}</AppText>
              )}
            </SelectValue>
          </div>
        </SelectTrigger>

        <SelectContent>
          <div className="p-2 border-b sticky top-0 bg-background z-10">
            <AppInput
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className={cn("h-8", fontSizeMap[size])}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              fullWidth
              size={size}
            />
          </div>
          <SelectGroup className="max-h-[200px] overflow-y-auto">
            {displayContent}
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
