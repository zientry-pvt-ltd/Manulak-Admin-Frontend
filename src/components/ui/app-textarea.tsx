import * as React from "react";

import AppText, { type FontSize } from "@/components/ui/app-text";
import { cn } from "@/lib/utils";

export interface AppTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  variant?: "outline" | "fill";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const sizeClasses: Record<NonNullable<AppTextareaProps["size"]>, string> = {
  sm: "px-2 py-1",
  md: "px-3 py-2",
  lg: "px-4 py-3",
};

const fontSizeMap: Record<NonNullable<AppTextareaProps["size"]>, FontSize> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const AppTextarea = React.forwardRef<HTMLTextAreaElement, AppTextareaProps>(
  (
    {
      label,
      error,
      variant = "outline",
      size = "md",
      fullWidth = false,
      rows = 4,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const textareaId = id ?? React.useId();

    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", "min-w-[200px]")}>
        {label && (
          <AppText
            as="label"
            variant="label"
            size={fontSizeMap[size]}
            className="block mb-1"
            {...(typeof label === "string" ? { htmlFor: textareaId } : {})}
          >
            {label}
          </AppText>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          className={cn(
            "w-full mx-0.5 resize-none rounded-md border transition-colors shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0",
            error
              ? "border-destructive focus-visible:ring-destructive/30"
              : "border-input",
            variant === "fill" ? "bg-muted/30" : "bg-transparent",
            sizeClasses[size],
            fontSizeMap[size],
            className,
          )}
          {...props}
        />
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

AppTextarea.displayName = "AppTextarea";

export default AppTextarea;
