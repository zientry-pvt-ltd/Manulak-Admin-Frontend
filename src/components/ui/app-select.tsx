import type { LucideProps } from "lucide-react";
import * as React from "react";

import AppIcon from "@/components/ui/app-icon";
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
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-12 text-lg",
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
        <label className="text-sm font-medium text-foreground">{label}</label>
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
          {startIcon && (
            <AppIcon
              Icon={startIcon}
              size={size}
              className="text-muted-foreground"
            />
          )}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && <p className="text-sm text-destructive mt-0.5">{error}</p>}
    </div>
  );
};

export default AppSelect;
