import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface AppSwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg";
}

const switchSizeClasses: Record<
  NonNullable<AppSwitchProps["size"]>,
  { root: string; thumb: string }
> = {
  sm: {
    root: "h-3.5 w-6",
    thumb: "size-3",
  },
  md: {
    root: "h-4.5 w-8",
    thumb: "size-4",
  },
  lg: {
    root: "h-5.5 w-10",
    thumb: "size-5",
  },
};

const AppSwitch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  AppSwitchProps
>(({ size = "md", className, ...props }, ref) => {
  const { root, thumb } = switchSizeClasses[size];

  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-colors outline-none",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
          "dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground",
          thumb,
        )}
      />
    </SwitchPrimitive.Root>
  );
});

AppSwitch.displayName = "AppSwitch";

export default AppSwitch;
