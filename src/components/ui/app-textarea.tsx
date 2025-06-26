import * as React from "react";

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
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
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
      <div
        className={cn(
          "space-y-1.5",
          fullWidth ? "w-full" : "w-fit",
          "min-w-[200px]",
        )}
      >
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          className={cn(
            "w-full resize-none rounded-md border transition-colors shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0",
            error
              ? "border-destructive focus-visible:ring-destructive/30"
              : "border-input",
            variant === "fill" ? "bg-muted/30" : "bg-transparent",
            sizeClasses[size],
            className,
          )}
          {...props}
        />

        {error && <p className="text-sm text-destructive mt-0.5">{error}</p>}
      </div>
    );
  },
);

AppTextarea.displayName = "AppTextarea";

export default AppTextarea;
