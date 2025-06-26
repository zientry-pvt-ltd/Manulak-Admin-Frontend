import { Moon } from "lucide-react";

import AppButton from "@/components/ui/app-button";

const variants: Array<
  NonNullable<React.ComponentProps<typeof AppButton>["variant"]>
> = [
  "default",
  "outline",
  "ghost",
  "link",
  "destructive",
  "secondary",
  "success",
];

const sizes: Array<React.ComponentProps<typeof AppButton>["size"]> = [
  "sm",
  "md",
  "lg",
];

const ButtonShowcase = () => {
  return (
    <div className="space-y-8 p-4">
      {variants.map((variant) => (
        <div key={variant}>
          <h3 className="mb-2 font-semibold text-lg capitalize">
            {variant} variant
          </h3>
          <div className="flex gap-4 flex-wrap">
            {sizes.map((size) => (
              <AppButton
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                Icon={Moon}
                iconPosition="left"
                onClick={() => alert(`Clicked ${variant} ${size}`)}
              >
                {size}
              </AppButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonShowcase;
