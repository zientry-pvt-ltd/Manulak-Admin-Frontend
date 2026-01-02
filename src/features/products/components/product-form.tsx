import { zodResolver } from "@hookform/resolvers/zod";
import { Image, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  AppButton,
  AppIconButton,
  AppInput,
  AppSelect,
  AppText,
  AppTextarea,
} from "@/components";
import AppImage from "@/components/ui/app-image";
import { CATEGORIES_OPTIONS } from "@/features/products/constants";
import { productSchema } from "@/features/products/schema";
import { updateSelectedProduct } from "@/features/products/store/product-slice";
import { useSanitizedInput } from "@/hooks/use-sanitized-input";
import { selectProducts } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import type { FormIds } from "@/types";

export type FormFieldValues = z.infer<typeof productSchema>;
export type ProductFormMode = "new" | "edit" | "view";

export type ProductFormSubmitData = {
  fieldData: FormFieldValues;
  imageData: File[];
};

type ProductFormProps = {
  mode: ProductFormMode;
  onSubmit?: ({
    // eslint-disable-next-line no-unused-vars
    data,
    // eslint-disable-next-line no-unused-vars
    mode,
  }: {
    data: ProductFormSubmitData;
    mode: ProductFormMode;
  }) => Promise<void>;
};

const ProductForm: React.FC<ProductFormProps & { formId?: FormIds }> = ({
  mode,
  onSubmit,
  formId = "product-form",
}) => {
  const { selectedProduct } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { handleInput: handleNumbersInput } = useSanitizedInput({
    type: "numbers-with-decimal",
  });

  const isView = mode === "view";
  const urlImages =
    mode === "edit" || mode === "view"
      ? selectedProduct?.product_image_urls || []
      : [];

  const [localImages, setLocalImages] = useState<File[]>([]);
  const localImagePreviews = localImages.map((file) =>
    URL.createObjectURL(file),
  );

  const form = useForm<FormFieldValues>({
    resolver: zodResolver(productSchema),
    defaultValues:
      (mode === "edit" || mode === "view") && selectedProduct
        ? {
            ...selectedProduct,
          }
        : {
            product_name: "",
            product_desc: "",
            product_category: "PLANTS",
            selling_price: 0,
            bought_price: 0,
            unit_weight: 0,
            courier_chargers_1kg: 0,
            courier_chargers_more_than_1kg: 0,
            product_image_urls: [],
          },
  });

  const handleSubmit = (data: FormFieldValues) => {
    if (onSubmit) {
      onSubmit({
        data: {
          fieldData: data,
          imageData: localImages,
        },
        mode,
      });
    } else {
      console.log("Form submitted:", data, localImages, mode);
      toast.success(
        mode === "new"
          ? "Product created successfully!"
          : "Product saved successfully!",
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const total =
      localImages.length + (form.getValues("product_image_urls")?.length || 0);

    if (total + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setLocalImages((prev) => [...prev, ...files]);
  };

  if ((mode === "edit" || mode === "view") && !selectedProduct) {
    return (
      <AppText
        variant="caption"
        italic
        size="text-xs"
        data-testid="not-selected"
      >
        No product selected
      </AppText>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex md:grid-cols-3 gap-6 w-full overflow-y-scroll min-w-[800px]"
    >
      <div className="w-1/2 space-y-3">
        <AppInput
          label="Product Name"
          size="md"
          placeholder="Enter product name"
          fullWidth
          disabled={isView}
          error={form.formState.errors.product_name?.message}
          {...form.register("product_name")}
        />

        <AppTextarea
          label="Description"
          size="md"
          placeholder="Enter product description"
          rows={5}
          fullWidth
          disabled={isView}
          error={form.formState.errors.product_desc?.message}
          {...form.register("product_desc")}
        />

        <AppInput
          label="Selling Price (Rs)"
          size="md"
          placeholder="Enter selling price"
          fullWidth
          disabled={isView}
          onInput={handleNumbersInput}
          error={form.formState.errors.selling_price?.message}
          {...form.register("selling_price", { valueAsNumber: true })}
        />

        <AppInput
          label="Bought Price (Rs)"
          type="text"
          size="md"
          placeholder="Enter bought price"
          fullWidth
          disabled={isView}
          onInput={handleNumbersInput}
          error={form.formState.errors.bought_price?.message}
          {...form.register("bought_price", { valueAsNumber: true })}
        />

        <Controller
          control={form.control}
          name="product_category"
          render={({ field }) => (
            <AppSelect
              label="Category"
              items={CATEGORIES_OPTIONS}
              placeholder="Select category"
              fullWidth
              disabled={isView}
              value={field.value}
              onValueChange={field.onChange}
              error={form.formState.errors.product_category?.message}
            />
          )}
        />

        <AppInput
          label="Unit Weight (g)"
          inputMode="decimal"
          step="0.5"
          size="md"
          placeholder="Enter unit weight"
          fullWidth
          disabled={isView}
          onInput={handleNumbersInput}
          error={form.formState.errors.unit_weight?.message}
          {...form.register("unit_weight", { valueAsNumber: true })}
        />

        <AppInput
          label="Courier Charge for the 1st Kilogram (Rs)"
          size="md"
          placeholder="Enter charge"
          fullWidth
          disabled={isView}
          onInput={handleNumbersInput}
          error={form.formState.errors.courier_chargers_1kg?.message}
          {...form.register("courier_chargers_1kg", {
            valueAsNumber: true,
          })}
        />

        <AppInput
          label="Courier Charge per Kilogram (Excluding 1st Kilogram) (Rs)"
          size="md"
          placeholder="Enter charge"
          fullWidth
          disabled={isView}
          onInput={handleNumbersInput}
          error={form.formState.errors.courier_chargers_more_than_1kg?.message}
          {...form.register("courier_chargers_more_than_1kg", {
            valueAsNumber: true,
          })}
        />
      </div>

      <div className="w-1/2 sticky top-0 h-fit space-y-2 bg-background">
        <AppText>Product Images</AppText>

        {/* URL Images */}
        <div className="flex flex-wrap gap-2 border border-dashed rounded-md p-2">
          {urlImages.length > 0 ? (
            urlImages.map((src, idx) => (
              <div key={`url-${idx}`} className="relative w-[110px] h-[110px]">
                {/* Image */}
                <AppImage
                  imageUrl={src}
                  alt={`URL Image ${idx + 1}`}
                  size="md"
                  width={110}
                  height={110}
                  objectFit="cover"
                  rounded="rounded-md"
                  className="border"
                />

                {/* Close button */}
                {!isView && (
                  <AppIconButton
                    Icon={X}
                    className="absolute top-1 right-1 z-50 bg-primary"
                    size="sm"
                    variant={"default"}
                    rounded="full"
                    onClick={() => {
                      form.setValue(
                        "product_image_urls",
                        selectedProduct?.product_image_urls.filter(
                          (url) => url !== src,
                        ) || [],
                      );
                      dispatch(
                        updateSelectedProduct({
                          product_image_urls:
                            selectedProduct?.product_image_urls.filter(
                              (url) => url !== src,
                            ),
                        }),
                      );
                    }}
                    type="button"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No uploaded images</p>
          )}
        </div>

        {/* Local Images */}
        {!isView && (
          <div className="flex flex-wrap gap-2 border border-dashed rounded-md p-2">
            {localImagePreviews.length > 0
              ? localImagePreviews.map((src, idx) => (
                  <div
                    key={`local-${idx}`}
                    className="relative w-[110px] h-[110px]"
                  >
                    <AppImage
                      key={`local-${idx}`}
                      imageUrl={src}
                      alt={`Local Image ${idx + 1}`}
                      size="md"
                      width={110}
                      height={110}
                      rounded="rounded-md"
                      objectFit="cover"
                    />

                    {
                      <AppIconButton
                        Icon={X}
                        className="absolute top-1 right-1 z-50 bg-primary"
                        size="sm"
                        variant={"default"}
                        rounded="full"
                        onClick={() => {
                          setLocalImages((prev) => {
                            const updated = [...prev];
                            updated.splice(idx, 1);
                            return updated;
                          });
                        }}
                        type="button"
                      />
                    }
                  </div>
                ))
              : null}

            {!isView && (
              <div className="w-full flex">
                <AppButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 mx-auto my-2"
                  Icon={Image}
                  disabled={urlImages.length + localImages.length >= 5}
                >
                  New Image
                </AppButton>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
