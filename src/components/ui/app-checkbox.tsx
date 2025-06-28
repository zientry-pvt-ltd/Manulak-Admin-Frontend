import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import AppText, { type FontSize } from "@/components/ui/app-text";
import { cn } from "@/lib/utils";

export interface AppCheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  id?: string;
  error?: string;
}

const sizeMap: Record<
  NonNullable<AppCheckboxProps["size"]>,
  {
    box: string;
    icon: string;
    label: FontSize;
  }
> = {
  sm: { box: "size-3", icon: "size-2.5", label: "text-xs" },
  md: { box: "size-4", icon: "size-3.5", label: "text-sm" },
  lg: { box: "size-5", icon: "size-4", label: "text-base" },
};

const AppCheckbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  AppCheckboxProps
>(({ label, size = "md", error, className, id, ...props }, ref) => {
  const checkboxId = id ?? React.useId();
  const { box, icon, label: labelSize } = sizeMap[size];

  return (
    <div>
      <div className="flex items-center gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          aria-invalid={!!error}
          className={cn(
            "peer shrink-0 rounded-[4px] border shadow-xs outline-none transition-all focus-visible:ring-[3px]",
            box,
            "bg-transparent border-input",
            "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
            "focus-visible:ring-ring/50 focus-visible:border-ring",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current transition-none">
            <CheckIcon className={icon} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
          <label htmlFor={checkboxId} className="select-none">
            <AppText as="span" size={labelSize} className="text-foreground">
              {label}
            </AppText>
          </label>
        )}
      </div>

      {error && (
        <AppText size={labelSize} color="destructive">
          {error}
        </AppText>
      )}
    </div>
  );
});

AppCheckbox.displayName = "AppCheckbox";

export default AppCheckbox;
