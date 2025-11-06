import { useMemo, useRef } from "react";

import { AppButton, AppInput, AppText } from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import { PaymentHistoryCard } from "@/features/orders/components/payment-history-card";
import { useGetOrderPaymentHistoryQuery } from "@/services/orders";
import { selectOrder } from "@/store/selectors/orderSelector";
import { useAppSelector } from "@/store/utils";

type PaymentInfoTabProps = {
  mode: "view" | "edit";
};

export const PaymentInfoTab = ({ mode }: PaymentInfoTabProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { selectedOrderId } = useAppSelector(selectOrder);
  const { data, isLoading, isError } = useGetOrderPaymentHistoryQuery(
    selectedOrderId,
    {
      skip: !selectedOrderId,
    },
  );
  const paymentHistory = useMemo(() => data?.data, [data]);
  const isEditMode = useMemo(() => mode === "edit", [mode]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body">Loading payment history...</AppText>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body" className="text-destructive">
          Error loading payment history.
        </AppText>
      </div>
    );

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      {/* form for add payment*/}
      <form className="min-w-1/2 h-full overflow-hidden space-y-6 pr-1">
        <AppInput
          label="Paid Amount"
          placeholder="Enter paid amount"
          fullWidth
          size="sm"
          disabled={!isEditMode}
        />
        <AppDateInput
          label="Payment Date"
          size="sm"
          variant="outline"
          placeholder="Select date"
          fullWidth
          disabled={!isEditMode}
        />
        <AppInput
          label="Payment Slip Number"
          placeholder="Enter payment slip number"
          size="sm"
          fullWidth
          disabled={!isEditMode}
        />
        <div className="flex flex-col mt-2 gap-y-2">
          <AppText variant="caption" size="text-xs">
            Upload Payment Slip
          </AppText>
          <div className="h-36 border rounded-lg flex justify-center items-center flex-col">
            <AppInput
              size="sm"
              fullWidth
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              ref={fileInputRef}
            />
            <AppText variant="caption" size="text-xs">
              Supported formats: PDF, JPG, PNG
            </AppText>
            <AppButton
              variant="outline"
              size="sm"
              className="m-2"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current?.click();
              }}
              disabled={!isEditMode}
            >
              Choose File
            </AppButton>
          </div>
        </div>

        <AppButton
          disabled={!isEditMode}
          variant="default"
          size="sm"
          fullWidth
          className="mt-4"
        >
          Add
        </AppButton>
      </form>

      <PaymentHistoryCard paymentHistory={paymentHistory} />
    </div>
  );
};
