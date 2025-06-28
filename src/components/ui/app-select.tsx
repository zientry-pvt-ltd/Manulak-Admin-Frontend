import type { LucideProps } from "lucide-react";
import * as React from "react";

import AppIcon from "@/components/ui/app-icon";
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

export interface AppSelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
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

const sizeClasses: Record<NonNullable<AppSelectProps["size"]>, string> = {
  sm: "h-8 w-[200px] px-2",
  md: "h-10 w-[250px] px-3",
  lg: "h-12 w-[320px] px-4",
};

const fontSizeMap: Record<NonNullable<AppSelectProps["size"]>, FontSize> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const AppSelect: React.FC<AppSelectProps> = ({
  label,
  error,
  placeholder = "Select an option",
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
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <AppText size={fontSizeMap[size]}>{item.label}</AppText>
              </SelectItem>
            ))}
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

export default AppSelect;
