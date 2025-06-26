import AppText from "@/components/ui/app-text";

const AppTextShowcase = () => {
  const variants = [
    "heading",
    "subheading",
    "body",
    "caption",
    "overline",
    "label",
  ] as const;

  const sizes = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-2xl",
  ] as const;

  const weights = [
    "font-thin",
    "font-light",
    "font-medium",
    "font-semibold",
    "font-bold",
  ] as const;

  const colors = [
    "primary",
    "secondary",
    "muted",
    "destructive",
    "success",
  ] as const;

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <AppText variant="label">Variants</AppText>
        {variants.map((variant) => (
          <AppText key={variant} variant={variant}>
            Variant: {variant}
          </AppText>
        ))}
      </div>

      <div className="space-y-2">
        <AppText variant="label">Font Sizes</AppText>
        {sizes.map((size) => (
          <AppText key={size} size={size}>
            Size: {size}
          </AppText>
        ))}
      </div>

      <div className="space-y-2">
        <AppText variant="label">Font Weights</AppText>
        {weights.map((weight) => (
          <AppText key={weight} weight={weight}>
            Weight: {weight}
          </AppText>
        ))}
      </div>

      <div className="space-y-2">
        <AppText variant="label">Colors</AppText>
        {colors.map((color) => (
          <AppText key={color} color={color}>
            Color: {color}
          </AppText>
        ))}
      </div>

      <div className="space-y-2">
        <AppText variant="label">Utility Props</AppText>
        <AppText truncate className="w-48">
          Truncate: This is a very long text that will be truncated
        </AppText>
        <AppText ellipsis className="w-48">
          Ellipsis: This is a very long text that will show ellipsis
        </AppText>
        <AppText italic>Italic: This text is italic</AppText>
        <AppText underline>Underline: This text is underlined</AppText>
        <AppText align="center">Center aligned text</AppText>
        <AppText align="right">Right aligned text</AppText>
      </div>
    </div>
  );
};

export default AppTextShowcase;
