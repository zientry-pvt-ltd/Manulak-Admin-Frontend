import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AppInput } from "@/components";
import { stockSchema } from "@/features/stock/schema";
import type { StockOperationType } from "@/features/stock/types/stock.type";
import type { FormIds } from "@/types";

type QuantityFormProps = {
  productId: string;
  action: StockOperationType;
  formId: FormIds;
  onSubmit: ({
    // eslint-disable-next-line no-unused-vars
    productId,
    // eslint-disable-next-line no-unused-vars
    action,
    // eslint-disable-next-line no-unused-vars
    quantity,
  }: {
    action: StockOperationType;
    productId: string;
    quantity: number;
  }) => void;
};
export const QuantityForm = ({
  action,
  formId,
  onSubmit,
  productId,
}: QuantityFormProps) => {
  const form = useForm<{
    quantity: number;
  }>({
    resolver: zodResolver(stockSchema),
    defaultValues: { quantity: 0 },
  });

  const handleUpdateProductQuantity = (data: { quantity: number }) => {
    const { quantity } = data;

    onSubmit({
      action,
      productId,
      quantity,
    });
  };

  return (
    <form
      id={formId}
      action="submit"
      onSubmit={form.handleSubmit(handleUpdateProductQuantity)}
    >
      <AppInput
        size="md"
        fullWidth
        type="text"
        inputMode="numeric"
        placeholder="Enter quantity"
        label={`Quantity to be ${action === "ADD" ? "added" : "removed"}`}
        error={form.formState.errors.quantity?.message}
        {...form.register("quantity", {
          valueAsNumber: true,
          validate: (v) => Number.isInteger(v) || "Please enter an integer",
        })}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/\D/g, "");
        }}
      />
    </form>
  );
};
