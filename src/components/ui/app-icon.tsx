import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

interface AppIconProps {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  size?: "sm" | "md" | "lg";
}

const AppIcon = ({ Icon, size = "md" }: AppIconProps) => {
  const iconSizeMap: Record<NonNullable<AppIconProps["size"]>, string> = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  };

  return <Icon strokeWidth={1.3} className={iconSizeMap[size]} />;
};

export default AppIcon;
