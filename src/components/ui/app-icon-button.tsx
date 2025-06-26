import type { VariantProps } from "class-variance-authority";
import { Loader, type LucideProps } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  variant?: Exclude<
    Pick<VariantProps<typeof buttonVariants>, "variant">["variant"],
    "link"
  >;
  size?: "sm" | "md" | "lg";
  rounded?: "md" | "full";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const AppIconButton = ({
  Icon,
  variant = "ghost",
  size = "md",
  rounded = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  ...props
}: AppIconButtonProps) => {
  const sizeMap: Record<NonNullable<AppIconButtonProps["size"]>, string> = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizeMap: Record<NonNullable<AppIconButtonProps["size"]>, string> = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-md";

  const baseClasses = cn(
    "inline-flex items-center justify-center",
    sizeMap[size],
    roundedClass,
    fullWidth && "w-full",
    className,
  );

  return (
    <Button
      variant={variant}
      className={baseClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader
          strokeWidth={1.3}
          className={cn("animate-spin", iconSizeMap[size])}
        />
      ) : (
        <Icon strokeWidth={1.3} className={iconSizeMap[size]} />
      )}
    </Button>
  );
};

export default AppIconButton;
