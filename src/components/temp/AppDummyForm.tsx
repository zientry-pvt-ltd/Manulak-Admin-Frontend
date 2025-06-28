import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  AppButton,
  AppInput,
  AppMultiSelect,
  AppSelect,
  AppTextarea,
} from "@/components";
import AppCheckbox from "@/components/ui/app-checkbox";
import AppSwitch from "@/components/ui/app-switch";

export const productInputSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .positive("Price must be a positive number"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).optional(),
  inStock: z.boolean(),
  sku: z.string().optional(),
  isFeatured: z.boolean().optional(),
});
const CATEGORIES = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Books", value: "books" },
];

const TAGS = [
  { label: "New", value: "new" },
  { label: "Popular", value: "popular" },
  { label: "Sale", value: "sale" },
];

type FormValues = z.infer<typeof productInputSchema>;

const ProductForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      category: "",
      tags: [],
      inStock: false,
      sku: "",
      isFeatured: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success("Product created successfully!");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[500px] border p-4 rounded-lg"
    >
      <AppInput
        label="Product Name"
        size="md"
        variant="outline"
        placeholder="Enter product name"
        fullWidth
        error={form.formState.errors.productName?.message}
        {...form.register("productName")}
      />

      <AppInput
        label="Price"
        type="number"
        size="md"
        variant="outline"
        placeholder="Enter price"
        fullWidth
        error={form.formState.errors.price?.message}
        {...form.register("price", { valueAsNumber: true })}
      />

      <Controller
        control={form.control}
        name="category"
        render={({ field }) => (
          <AppSelect
            label="Category"
            size="md"
            variant="outline"
            items={CATEGORIES}
            placeholder="Select category"
            fullWidth
            value={field.value}
            onValueChange={field.onChange}
            error={form.formState.errors.category?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="tags"
        render={({ field }) => (
          <AppMultiSelect
            label="Tags"
            items={TAGS}
            selectedValues={field.value ?? []}
            fullWidth
            onChange={field.onChange}
            placeholder="Select tags"
            size="md"
            error={form.formState.errors.tags?.message}
          />
        )}
      />

      <AppInput
        label="SKU"
        size="md"
        variant="outline"
        placeholder="Optional SKU"
        fullWidth
        error={form.formState.errors.sku?.message}
        {...form.register("sku")}
      />

      <Controller
        control={form.control}
        name="inStock"
        render={({ field }) => (
          <AppSwitch
            label="In Stock"
            labelPosition="left"
            size="sm"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={form.formState.errors.inStock?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <AppCheckbox
            label="Mark as Featured"
            size="md"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={form.formState.errors.isFeatured?.message}
          />
        )}
      />

      <div className="md:col-span-2">
        <AppTextarea
          label="Description"
          size="md"
          variant="outline"
          placeholder="Product description"
          rows={5}
          fullWidth
          error={form.formState.errors.description?.message}
          {...form.register("description")}
        />
      </div>

      <div className="md:col-span-2">
        <AppButton type="submit" size="md" className="mt-4" fullWidth>
          Create Product
        </AppButton>
      </div>
    </form>
  );
};

export default ProductForm;
