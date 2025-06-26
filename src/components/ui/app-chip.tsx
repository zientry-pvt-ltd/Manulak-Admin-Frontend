import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import React from "react";

import { AppIcon, AppText } from "@/components";
import { cn } from "@/lib/utils";

type ChipSize = "sm" | "md" | "lg";
type ChipVariant =
  | "outline"
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "info";

interface AppChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  size?: ChipSize;
  variant?: ChipVariant;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

const sizeClasses: Record<ChipSize, string> = {
  sm: "text-xs h-6 px-2 gap-1",
  md: "text-sm h-8 px-3 gap-2",
  lg: "text-base h-10 px-4 gap-2",
};

const variantClasses: Record<ChipVariant, string> = {
  outline: "border border-border bg-transparent hover:bg-muted/30",
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  success: "bg-success",
  info: "bg-info",
};

const textColorMap: Record<
  ChipVariant,
  "primary" | "primaryForeground" | "secondary" | "destructive" | "success"
> & { info: "primaryForeground" } = {
  outline: "primary",
  primary: "primaryForeground",
  secondary: "secondary",
  destructive: "primaryForeground",
  success: "primaryForeground",
  info: "primaryForeground",
};

const iconColorMap: Record<ChipVariant, string> = {
  outline: "text-primary",
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-primary-foreground",
  success: "text-primary-foreground",
  info: "text-primary-foreground",
};

const AppChip = ({
  label,
  size = "md",
  variant = "outline",
  icon: Icon,
  className,
  ...props
}: AppChipProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {Icon && (
        <AppIcon
          Icon={Icon}
          className={cn("shrink-0", iconColorMap[variant])}
          size={size}
        />
      )}
      <AppText
        as="span"
        size="text-xs"
        weight="font-medium"
        className="whitespace-nowrap"
        color={textColorMap[variant]}
      >
        {label}
      </AppText>
    </div>
  );
};

export default AppChip;
