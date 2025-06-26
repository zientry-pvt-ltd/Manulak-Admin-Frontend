import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { cn } from "@/lib/utils";

interface AppIconProps {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const AppIcon = ({ Icon, size = "md", className }: AppIconProps) => {
  const iconSizeMap: Record<NonNullable<AppIconProps["size"]>, string> = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  return (
    <Icon strokeWidth={1.3} className={cn(iconSizeMap[size], className)} />
  );
};

export default AppIcon;
