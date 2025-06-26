import { Loader2, Plus } from "lucide-react";

import { AppIconButton } from "@/components";

const variants: Array<
  NonNullable<React.ComponentProps<typeof AppIconButton>["variant"]>
> = ["default", "outline", "ghost", "destructive", "secondary", "success"];

const sizes: Array<
  NonNullable<React.ComponentProps<typeof AppIconButton>["size"]>
> = ["sm", "md", "lg"];

const AppIconButtonShowcase = () => {
  return (
    <div className="space-y-8 p-4">
      {variants.map((variant) => (
        <div key={variant}>
          <h3 className="mb-2 font-semibold text-lg capitalize">
            {variant} variant
          </h3>
          <div className="flex gap-4 flex-wrap">
            {sizes.map((size) => (
              <AppIconButton
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                Icon={Plus}
                onClick={() => alert(`${variant} ${size}`)}
              />
            ))}
            <AppIconButton
              key={`${variant}-loading`}
              variant={variant}
              size="md"
              Icon={Loader2}
              isLoading
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppIconButtonShowcase;
