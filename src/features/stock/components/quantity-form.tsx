import { useState } from "react";

import { AppInput } from "@/components";
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
  const [quantity, setQuantity] = useState<number>(0);

  const handleUpdateProductQuantity = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      action,
      productId,
      quantity,
    });
  };

  return (
    <form id={formId} action="submit" onSubmit={handleUpdateProductQuantity}>
      <AppInput
        label={`Quantity to be ${action === "ADD" ? "added" : "removed"}`}
        size="md"
        type="number"
        placeholder="Enter quantity"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
    </form>
  );
};
