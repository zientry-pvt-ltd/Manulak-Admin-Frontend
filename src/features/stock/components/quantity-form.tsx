import { AppInput } from "@/components";

type QuantityFormProps = {
  action: "add" | "remove";
};
export const QuantityForm = ({ action }: QuantityFormProps) => {
  return (
    <form action="">
      <AppInput
        label={`Quantity to be ${action === "add" ? "added" : "removed"}`}
        size="md"
        type="number"
        placeholder="Enter quantity"
        fullWidth
      />
    </form>
  );
};
