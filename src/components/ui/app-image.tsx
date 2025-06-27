import { memo, useState } from "react";

import defaultLogo from "@/assets/landscape-placeholder.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type RoundedVariant =
  | "rounded-none"
  | "rounded-2xl"
  | "rounded-3xl"
  | "rounded-4xl"
  | "rounded-full";

type ObjectFitVariant = "cover" | "contain" | "fill" | "none" | "scale-down";

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageUrl?: string;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  rounded?: RoundedVariant;
  className?: string;
  objectFit?: ObjectFitVariant;
}

const AppImage = ({
  imageUrl,
  fallbackSrc,
  alt = "App image",
  width = 24,
  height = 24,
  rounded = "rounded-full",
  className = "",
  objectFit = "cover",
  style,
  ...rest
}: AppImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resolvedSrc =
    hasError || !imageUrl ? fallbackSrc || defaultLogo : imageUrl;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height, ...style }}
    >
      {!isLoaded && !hasError && (
        <Skeleton
          className={cn("absolute top-0 left-0 w-full h-full", rounded)}
        />
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover w-full h-full object-center ",
          rounded,
          isLoaded ? "block" : "hidden",
        )}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        {...rest}
      />
    </div>
  );
};

export default memo(AppImage);
