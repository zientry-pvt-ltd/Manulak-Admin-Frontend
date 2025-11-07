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
  onEndIconClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "fill";
  className?: string;
  fullWidth?: boolean;
}

const sizeClasses: Record<NonNullable<AppInputProps["size"]>, string> = {
  sm: "h-8 w-[200px] px-2",
  md: "h-10 w-[250px] px-3",
  lg: "h-12 w-[320px] px-4",
};

const fontSizeMap: Record<NonNullable<AppInputProps["size"]>, FontSize> = {
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
      onEndIconClick,
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
          <AppText
            as="label"
            variant="label"
            size={fontSizeMap[size]}
            className="block mb-1"
            {...(typeof label === "string" ? { htmlFor: inputId } : {})}
          >
            {label}
          </AppText>
        )}

        <div
          className={cn(
            "flex items-center rounded-md border transition-colors mx-0.5",
            sizeClasses[size],
            variant === "fill" ? "bg-muted/30" : "bg-transparent",
            error
              ? "border-destructive focus-within:ring-destructive/30"
              : "border-input focus-within:ring-ring/40",
            "focus-within:ring-1 focus-within:outline-none",
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
              fontSizeMap[size],
            )}
            aria-invalid={!!error}
            {...props}
          />

          {endIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              className={cn(
                "ml-2 text-muted-foreground",
                onEndIconClick &&
                  "cursor-pointer hover:text-foreground transition-colors",
              )}
            >
              <AppIcon Icon={endIcon} size={size} />
            </button>
          )}
        </div>

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
  },
);

AppInput.displayName = "AppInput";

export default AppInput;
