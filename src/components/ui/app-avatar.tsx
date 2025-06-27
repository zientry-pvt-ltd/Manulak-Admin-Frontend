import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Avatar sizes
const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-lg",
};

type AppAvatarProps = {
  imageUrl: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const AppAvatar: React.FC<AppAvatarProps> = ({
  imageUrl,
  name = "",
  size = "md",
  className,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar className={cn(sizeClasses[size], "rounded-lg", className)}>
      {imageUrl && (
        <AvatarImage src={imageUrl} alt={name} className={"object-cover"} />
      )}
      <AvatarFallback>{initials || "??"}</AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
