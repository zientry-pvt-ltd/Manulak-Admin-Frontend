import type { VariantProps } from "class-variance-authority";
import { Loader, type LucideProps } from "lucide-react";
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

import AppText, {
  type FontSize,
  type TextColor,
} from "@/components/ui/app-text";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconPosition?: "left" | "right";
  variant?: Pick<VariantProps<typeof buttonVariants>, "variant">["variant"];
  size: "sm" | "md" | "lg";
  rounded?: "md" | "full";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const AppButton = ({
  children,
  Icon,
  iconPosition = "left",
  variant = "default",
  size = "md",
  rounded = "md",
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  ...props
}: AppButtonProps) => {
  const sizeClasses = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
    lg: "h-12 px-6",
  };

  const fontSizeMap: Record<AppButtonProps["size"], FontSize> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizeMap: Record<AppButtonProps["size"], string> = {
    sm: "size-4",
    md: "size-4.5",
    lg: "size-5",
  };

  const textColorMap: Record<
    NonNullable<AppButtonProps["variant"]>,
    TextColor
  > = {
    outline: "primary",
    ghost: "primary",
    link: "primary",
    destructive: "destructive",
    secondary: "primary",
    success: "success",
    default: "primaryForeground",
  };

  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-md";

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-1.5",
    sizeClasses[size],
    roundedClass,
    fullWidth && "w-full",
    className,
  );

  const renderIcon = () =>
    Icon && !isLoading ? (
      <Icon strokeWidth={1.3} className={iconSizeMap[size]} />
    ) : null;

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
        iconPosition === "left" && renderIcon()
      )}

      <AppText
        as="span"
        size={fontSizeMap[size]}
        color={textColorMap[variant || "default"]}
      >
        {children}
      </AppText>

      {!isLoading && iconPosition === "right" && renderIcon()}
    </Button>
  );
};

export default AppButton;
