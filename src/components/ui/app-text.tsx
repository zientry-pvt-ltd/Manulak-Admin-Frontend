import React, { type JSX } from "react";

import { cn } from "@/lib/utils";

type TextVariant =
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "overline"
  | "label";

export type FontSize =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-2xl";

type FontWeight =
  | "font-thin"
  | "font-light"
  | "font-medium"
  | "font-semibold"
  | "font-bold";

type TextAlign = "left" | "center" | "right" | "justify";

export type TextColor =
  | "primary"
  | "primaryForeground"
  | "secondary"
  | "muted"
  | "destructive"
  | "success";

export interface AppTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  variant?: TextVariant;
  size?: FontSize;
  weight?: FontWeight;
  color?: TextColor;
  truncate?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: TextAlign;
  ellipsis?: boolean;
  className?: string;
  skeletonWidth?: number | string;
  skeletonHeight?: number | string;
}
const variantClasses: Record<TextVariant, string> = {
  heading: "text-2xl font-bold",
  subheading: "text-xl font-semibold",
  body: "text-base font-normal",
  caption: "text-sm text-muted",
  overline: "text-xs uppercase tracking-widest text-muted",
  label: "text-sm font-medium",
};

const colorClasses: Record<TextColor, string> = {
  primary: "text-foreground",
  primaryForeground: "text-primary-foreground",
  secondary: "text-primary",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
  success: "text-success",
};

const AppText = ({
  children,
  as: Component = "p",
  variant = "body",
  size,
  weight,
  color = "primary",
  truncate = false,
  italic = false,
  underline = false,
  align,
  ellipsis = false,
  className = "",
  ...rest
}: AppTextProps) => {
  const classes = cn(
    variantClasses[variant],
    size,
    weight,
    colorClasses[color],
    truncate && "truncate",
    italic && "italic",
    underline && "underline",
    ellipsis && "whitespace-nowrap overflow-hidden text-ellipsis",
    align && `text-${align}`,
    className,
  );

  const Comp = Component as React.ElementType;

  return (
    <Comp className={classes} {...rest}>
      {children}
    </Comp>
  );
};

export default AppText;
