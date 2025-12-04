import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AppButton, AppInput } from "@/components";
import { stockSchema } from "@/features/stock/schema";
import type { StockOperationType } from "@/features/stock/types/stock.type";
import { useAppDialog } from "@/providers";
import { useUpdateStockQuantityMutation } from "@/services/stock";
import type { FormIds } from "@/types";
import { normalizeError } from "@/utils/error-handler";

type QuantityFormProps = {
  productId: string;
  action: StockOperationType;
  formId: FormIds;
};

export const QuantityForm = ({
  action,
  formId,
  productId,
}: QuantityFormProps) => {
  const [updateStockQuantity, { isLoading }] = useUpdateStockQuantityMutation();
  const { closeAppDialog } = useAppDialog();

  const form = useForm<{
    quantity: number;
  }>({
    resolver: zodResolver(stockSchema),
    defaultValues: { quantity: 0 },
  });

  const handleUpdateProductQuantity = useCallback(
    async ({
      productId,
      action,
      quantity,
    }: {
      action: StockOperationType;
      productId: string;
      quantity: number;
    }) => {
      try {
        await updateStockQuantity({
          productId: productId,
          body: {
            operation: action,
            quantity: quantity,
          },
        }).unwrap();

        toast.success("Stock quantity update successfully");

        setTimeout(() => {
          closeAppDialog();
        }, 1000);
      } catch (error) {
        const message = normalizeError(error);
        toast.error(`Failed to update quantity: ${message.message}`);
        console.error("Product update failed:", error);
      }
    },
    [updateStockQuantity, closeAppDialog],
  );

  return (
    <form
      id={formId}
      action="submit"
      className="flex gap-y-8 flex-col"
      onSubmit={form.handleSubmit((data) => {
        handleUpdateProductQuantity({
          action,
          productId,
          quantity: data.quantity,
        });
      })}
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

      <AppButton type="submit" size="md" fullWidth isLoading={isLoading}>
        {action === "ADD" ? "Add" : "Remove"} Quantity
      </AppButton>
    </form>
  );
};
