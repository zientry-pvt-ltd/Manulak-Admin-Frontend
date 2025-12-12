import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppButton, AppInput, AppText } from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import { FileUploadWithPreview } from "@/features/orders/components/file-upload-with-preview";
import { PaymentHistoryCard } from "@/features/orders/components/payment-history-card";
import { paymentDataSchema } from "@/features/orders/schema";
import {
  useCreatePaymentRecordMutation,
  useGetOrderMetadataQuery,
  useGetOrderPaymentHistoryQuery,
  useUploadPaymentSlipMutation,
} from "@/services/orders";
import { selectOrder } from "@/store/selectors/orderSelector";
import { useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

type PaymentInfoTabProps = {
  mode: "view" | "edit";
};

type FormFieldValues = z.infer<typeof paymentDataSchema>;

export const PaymentInfoTab = ({ mode }: PaymentInfoTabProps) => {
  const isEditMode = useMemo(() => mode === "edit", [mode]);

  const { selectedOrderId } = useAppSelector(selectOrder);

  const shouldSkip = useMemo(
    () => ({ skip: !selectedOrderId }),
    [selectedOrderId],
  );

  const [uploadPaymentSlip, { isLoading: isUploadingPaymentSlip }] =
    useUploadPaymentSlipMutation();
  const [createPaymentRecord, { isLoading: isCreatingPaymentRecord }] =
    useCreatePaymentRecordMutation();

  const { data, isLoading, isError } = useGetOrderPaymentHistoryQuery(
    selectedOrderId,
    shouldSkip,
  );
  const {
    data: metadata,
    isLoading: isMetadataLoading,
    isError: isMetadataError,
  } = useGetOrderMetadataQuery(selectedOrderId, {
    skip: !selectedOrderId,
  });
  const paymentHistory = useMemo(() => data?.data, [data]);

  const [localSlipFile, setLocalSlipFile] = useState<File | null>(null);

  const form = useForm<FormFieldValues>({
    resolver: zodResolver(paymentDataSchema),
    defaultValues: {
      paid_amount: null,
      payment_date: null,
      payment_slip_number: null,
    },
  });

  const handleSubmit = async (data: FormFieldValues) => {
    if (!selectedOrderId) return;

    const toastId = toast.loading("Creating payment record...");

    try {
      const result = await createPaymentRecord({
        id: selectedOrderId,
        data: {
          ...data,
          paid_amount: Number(data.paid_amount),
        },
      }).unwrap();

      toast.loading("Uploading payment slip...", { id: toastId });

      if (localSlipFile) {
        await uploadPaymentSlip({
          id: result.data.payment_id,
          file: localSlipFile,
        }).unwrap();
      }

      toast.success("Payment record created successfully!", { id: toastId });
      form.reset();
      setLocalSlipFile(null);
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed: ${message.message}`, { id: toastId });
      console.error("Error creating payment record:", error);
    }
  };

  if (isMetadataLoading || isLoading)
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body">Loading payment history...</AppText>
      </div>
    );

  if (isError || isMetadataError)
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body" className="text-destructive">
          Error loading payment history.
        </AppText>
      </div>
    );

  return (
    <div className="flex gap-4 h-[70vh]">
      {/* form for add payment*/}
      <form
        className="min-w-1/2 space-y-6 pr-1 flex flex-col"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <AppInput
          label="Paid Amount"
          placeholder="Enter paid amount"
          fullWidth
          size="sm"
          disabled={!isEditMode}
          error={form.formState.errors.paid_amount?.message}
          {...form.register("paid_amount", {
            valueAsNumber: true,
          })}
          onInput={(e) => {
            const input = e.currentTarget;
            input.value = input.value.replace(/[a-zA-Z-]/g, "");
          }}
        />
        <AppDateInput
          label="Payment Date"
          size="sm"
          variant="outline"
          placeholder="Select date"
          fullWidth
          value={form.getValues("payment_date") || ""}
          disabled={!isEditMode}
          error={form.formState.errors.payment_date?.message}
          hiddenDates={{
            futureDates: true,
          }}
          onChange={(value) =>
            form.setValue("payment_date", value || "", {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
        <AppInput
          label="Payment Slip Number"
          placeholder="Enter payment slip number"
          size="sm"
          fullWidth
          disabled={!isEditMode}
          error={form.formState.errors.payment_slip_number?.message}
          {...form.register("payment_slip_number")}
        />

        <div className="flex flex-col mt-2 gap-y-2">
          <AppText variant="caption" size="text-xs">
            Upload Payment Slip
          </AppText>

          <FileUploadWithPreview
            file={localSlipFile}
            onFileChange={setLocalSlipFile}
            accept=".pdf,.jpg,.jpeg,.png"
            disabled={!isEditMode}
            maxSizeMB={10}
            supportedFormatsText="Supported formats: PDF, JPG, PNG (Max 10MB)"
          />
        </div>

        <AppButton
          disabled={!isEditMode}
          variant="default"
          size="sm"
          fullWidth
          className="mt-auto"
          isLoading={isCreatingPaymentRecord || isUploadingPaymentSlip}
          type="submit"
        >
          Add
        </AppButton>
      </form>

      <PaymentHistoryCard
        paymentHistory={paymentHistory}
        paymentMethod={metadata?.data.payment_method}
      />
    </div>
  );
};
