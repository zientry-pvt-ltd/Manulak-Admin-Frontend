import type { LucideProps } from "lucide-react";
import * as React from "react";

import AppIcon from "@/components/ui/app-icon";
import AppText, { type FontSize } from "@/components/ui/app-text";
import { cn } from "@/lib/utils";

export interface AppInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  startIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  endIcon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "fill";
  className?: string;
  fullWidth?: boolean;
}

const sizeClasses: Record<NonNullable<AppInputProps["size"]>, string> = {
  sm: "h-8 text-sm px-2",
  md: "h-10 text-base px-3",
  lg: "h-12 text-lg px-4",
};

const errorTextFontSize: Record<
  NonNullable<AppInputProps["size"]>,
  FontSize
> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      error,
      startIcon,
      endIcon,
      size = "md",
      variant = "outline",
      className,
      id,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId();

    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", "min-w-[200px]")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center rounded-md border transition-colors mt-1",
            sizeClasses[size],
            variant === "fill" ? "bg-muted/30" : "bg-transparent",
            error
              ? "border-destructive focus-within:ring-destructive/30"
              : "border-input focus-within:ring-ring/40",
            "focus-within:ring-2 focus-within:outline-none",
            fullWidth && "w-full",
            className,
          )}
        >
          {startIcon && (
            <AppIcon
              Icon={startIcon}
              size={size}
              className="mr-2 text-muted-foreground"
            />
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "flex-1 bg-transparent outline-none border-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              size === "sm"
                ? "text-sm"
                : size === "lg"
                  ? "text-lg"
                  : "text-base",
            )}
            aria-invalid={!!error}
            {...props}
          />

          {endIcon && (
            <AppIcon
              Icon={endIcon}
              size={size}
              className="ml-2 text-muted-foreground"
            />
          )}
        </div>

        {error && (
          <AppText
            size={errorTextFontSize[size]}
            className="text-destructive mt-0.5"
          >
            {error}
          </AppText>
        )}
      </div>
    );
  },
);

AppInput.displayName = "AppInput";

export default AppInput;
