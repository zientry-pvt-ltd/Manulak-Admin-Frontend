import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentProps, type FC, memo } from "react";

import AppText from "@/components/ui/app-text";
import { cn } from "@/lib/utils";

export type ProgressLabel =
  | "Loading..."
  | "Saving..."
  | "Uploading..."
  | "Downloading..."
  | "Processing..."
  | "Submitting..."
  | "Syncing..."
  | "Fetching..."
  | "Updating..."
  | "Deleting...";

interface AppLinearProgressProps
  extends ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number;
  label?: ProgressLabel;
  showValueLabel?: boolean;
}

const AppLinearProgress: FC<AppLinearProgressProps> = ({
  className,
  value,
  label,
  showValueLabel = false,
  ...props
}) => {
  const isIndeterminate = value === undefined;

  return (
    <div className="flex flex-col gap-1 items-center w-32">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-1 w-full overflow-hidden rounded-full bg-primary/20",
          className,
        )}
        {...props}
      >
        {isIndeterminate ? (
          <span className="absolute inset-0 animate-indeterminate bg-primary" />
        ) : (
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="bg-primary h-full transition-transform"
            style={{
              transform: `translateX(-${100 - (value ?? 0)}%)`,
            }}
          />
        )}
      </ProgressPrimitive.Root>
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center px-1">
          {label && <AppText size="text-xs">{label}</AppText>}
          {showValueLabel && value !== undefined && (
            <AppText size="text-xs">{Math.round(value)}%</AppText>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(AppLinearProgress);
