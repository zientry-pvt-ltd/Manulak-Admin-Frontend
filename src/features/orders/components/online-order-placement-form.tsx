import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { AppInput, AppSelect, AppText } from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import { FileUploadWithPreview } from "@/features/orders/components/file-upload-with-preview";
import ProductSelectorCard from "@/features/orders/components/product-selector-card";
import {
  PAYMENT_METHOD_OPTIONS,
  type PaymentMethod,
} from "@/features/orders/constants";
import { onlineManualOrderSchema } from "@/features/orders/schema";
import { clearSelectedProducts } from "@/features/orders/store/order-form-slice";
import { useSanitizedInput } from "@/hooks/use-sanitized-input";
import { useAppDialog } from "@/providers";
import {
  useCalculateOrderValueMutation,
  useCreateOrderMutation,
  useUploadPaymentSlipMutation,
} from "@/services/orders";
import { useAppDispatch } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export type FormFieldValues = z.infer<typeof onlineManualOrderSchema>;

export const OnlineOrderPlacementForm = () => {
  const dispatch = useAppDispatch();
  const { closeAppDialog } = useAppDialog();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [uploadPaymentSlip] = useUploadPaymentSlipMutation();
  const [
    calculateOrderValue,
    { isLoading: isCalculatingOrderValue, isError: isCalculateOrderValueError },
  ] = useCalculateOrderValueMutation();

  const [localSlipFile, setLocalSlipFile] = useState<File | null>(null);

  const { handleInput: handleNumbersInput } = useSanitizedInput({
    type: "numbers-only",
  });
  const { handleInput: handleNumbersWithDecimal } = useSanitizedInput({
    type: "numbers-with-decimal",
  });
  const { handleInput: handleLettersInput } = useSanitizedInput({
    type: "letters-only",
  });
  const { handleInput: handleAlphanumericInput } = useSanitizedInput({
    type: "alphanumeric",
  });
  const { handleInput: handleEmailInput } = useSanitizedInput({
    type: "email",
  });

  const validatePhoneMatch = () => {
    const primaryPhone = form.getValues("orderMetaData.primary_phone_number");
    const confirmPhone = form.getValues("orderMetaData.confirm_phone_number");

    if (primaryPhone && !confirmPhone) {
      form.setError("orderMetaData.confirm_phone_number", {
        message: "Please confirm the phone number",
        type: "setValueAs",
      });
      return false;
    }

    if (!confirmPhone) {
      form.clearErrors("orderMetaData.confirm_phone_number");
      return true;
    }

    if (primaryPhone !== confirmPhone) {
      form.setError("orderMetaData.confirm_phone_number", {
        message: "Phone numbers do not match",
        type: "setValueAs",
      });
      return false;
    }

    form.clearErrors("orderMetaData.confirm_phone_number");
    return true;
  };

  const form = useForm<FormFieldValues>({
    resolver: zodResolver(onlineManualOrderSchema),
    defaultValues: {
      orderItemsData: [],
      orderMetaData: {
        first_name: "",
        last_name: "",
        selling_method: "ONLINE",
        order_value: 0,
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        postal_code: undefined,
        primary_phone_number: "",
        confirm_phone_number: "",
        status: "PENDING",
        payment_method: "COD",
      },
      paymentData: {
        payment_date: null,
        paid_amount: null,
        payment_slip_number: null,
      },
    },
  });

  const paymentMethod = form.watch("orderMetaData.payment_method");
  const isCOD = paymentMethod === "COD";

  const handleSubmit = async (data: FormFieldValues) => {
    if (isCreatingOrder)
      toast.warning("Order is being created, please wait...");

    if (isCalculatingOrderValue)
      return toast.warning("Please wait until order value is calculated");
    if (isCalculateOrderValueError)
      return toast.error("Failed to calculate order value");

    const { orderItemsData, orderMetaData, paymentData } = data;

    // eslint-disable-next-line no-unused-vars
    const { confirm_phone_number, ...orderMetaDataWithoutConfirm } =
      orderMetaData;

    const updatedOrderMetaData = {
      ...orderMetaDataWithoutConfirm,
    };

    const updatedData = {
      orderMetaData: updatedOrderMetaData,
      orderItemsData: orderItemsData,
      paymentData: !isCOD ? paymentData : undefined,
    };

    if (!validatePhoneMatch()) {
      return;
    }

    const toastId = toast.loading("Creating order...");

    try {
      const result = await createOrder(updatedData).unwrap();

      toast.loading("Uploading payment slip...", { id: toastId });

      if (localSlipFile) {
        await uploadPaymentSlip({
          id: result.data.paymentId,
          file: localSlipFile,
        }).unwrap();
      }

      toast.success("Order created successfully", { id: toastId });

      form.reset();
      setLocalSlipFile(null);
      dispatch(clearSelectedProducts());

      setTimeout(() => {
        closeAppDialog();
      }, 700);
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed: ${message.message}`, { id: toastId });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProducts());
    };
  }, [dispatch]);

  return (
    <FormProvider {...form}>
      <form
        id="online-order-placement-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="min-w-[80vw] space-y-8 overflow-y-scroll overflow-x-hidden"
      >
        <div className="pr-4">
          <AppText variant="subheading">Order Information</AppText>
          <ProductSelectorCard />
        </div>

        <div className="pr-4">
          <AppText variant="subheading">Billing Information</AppText>
          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="First Name"
              placeholder="Enter first name"
              fullWidth
              size="sm"
              onInput={handleLettersInput}
              error={form.formState.errors.orderMetaData?.first_name?.message}
              {...form.register("orderMetaData.first_name")}
            />
            <AppInput
              label="Last Name"
              placeholder="Enter last name"
              fullWidth
              size="sm"
              onInput={handleLettersInput}
              error={form.formState.errors.orderMetaData?.last_name?.message}
              {...form.register("orderMetaData.last_name")}
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Address Line 1"
              placeholder="Enter address line 1"
              fullWidth
              size="sm"
              error={
                form.formState.errors.orderMetaData?.address_line_1?.message
              }
              {...form.register("orderMetaData.address_line_1")}
            />
            <AppInput
              label="Address Line 2"
              placeholder="Enter address line 2"
              fullWidth
              size="sm"
              error={
                form.formState.errors.orderMetaData?.address_line_2?.message
              }
              {...form.register("orderMetaData.address_line_2")}
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Address Line 3"
              placeholder="Enter address line 3"
              fullWidth
              size="sm"
              error={
                form.formState.errors.orderMetaData?.address_line_3?.message
              }
              {...form.register("orderMetaData.address_line_3")}
            />
            <AppInput
              label="Postal Code"
              placeholder="Enter postal code"
              fullWidth
              size="sm"
              onInput={handleAlphanumericInput}
              error={form.formState.errors.orderMetaData?.postal_code?.message}
              {...form.register("orderMetaData.postal_code")}
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Primary Phone"
              placeholder="Enter primary phone"
              fullWidth
              size="sm"
              type="tel"
              onInput={handleNumbersInput}
              error={
                form.formState.errors.orderMetaData?.primary_phone_number
                  ?.message
              }
              {...form.register("orderMetaData.primary_phone_number")}
            />
            <AppInput
              label="Confirm Phone"
              placeholder="Re-enter phone number"
              fullWidth
              size="sm"
              type="tel"
              onInput={handleNumbersInput}
              error={
                form.formState.errors.orderMetaData?.confirm_phone_number
                  ?.message
              }
              {...form.register("orderMetaData.confirm_phone_number")}
            />
          </div>
        </div>

        <div className="pr-4">
          <AppText variant="subheading">Additional Information</AppText>
          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Company Name"
              placeholder="Enter company name"
              fullWidth
              size="sm"
              onInput={handleLettersInput}
              error={form.formState.errors.orderMetaData?.company_name?.message}
              {...form.register("orderMetaData.company_name")}
            />
            <AppInput
              label="Email"
              placeholder="Enter email"
              type="email"
              fullWidth
              size="sm"
              onInput={handleEmailInput}
              error={form.formState.errors.orderMetaData?.email?.message}
              {...form.register("orderMetaData.email")}
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Alternate Phone 1"
              placeholder="Enter alternate phone number 1"
              type="tel"
              fullWidth
              size="sm"
              onInput={handleNumbersInput}
              error={
                form.formState.errors.orderMetaData?.alternate_phone_number_1
                  ?.message
              }
              {...form.register("orderMetaData.alternate_phone_number_1")}
            />
            <AppInput
              label="Alternate Phone 2"
              placeholder="Enter alternate phone number 2"
              type="tel"
              fullWidth
              size="sm"
              onInput={handleNumbersInput}
              error={
                form.formState.errors.orderMetaData?.alternate_phone_number_2
                  ?.message
              }
              {...form.register("orderMetaData.alternate_phone_number_2")}
            />
          </div>
        </div>

        <div className="pr-4">
          <AppText variant="subheading">Payment Information</AppText>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppSelect
              label="Payment Method"
              placeholder="Select payment method"
              value={form.getValues("orderMetaData.payment_method")}
              items={PAYMENT_METHOD_OPTIONS}
              fullWidth
              size="sm"
              error={
                form.formState.errors.orderMetaData?.payment_method?.message
              }
              onValueChange={async (value) => {
                form.setValue(
                  "orderMetaData.payment_method",
                  value as PaymentMethod,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                );

                // ---------- //
                const { data } = await calculateOrderValue({
                  orderItemsArray: form.getValues("orderItemsData"),
                  paymentMethod: value as PaymentMethod,
                }).unwrap();
                form.setValue("orderMetaData.order_value", data.totalValue, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                // ---------- //

                form.setValue("paymentData.payment_date", null, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                form.setValue("paymentData.paid_amount", null, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                form.setValue("paymentData.payment_slip_number", null, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setLocalSlipFile(null);
              }}
              {...form.register("orderMetaData.payment_method")}
            />

            <AppDateInput
              label="Payment Date"
              value={form.getValues("paymentData.payment_date") || ""}
              onChange={(value) =>
                form.setValue("paymentData.payment_date", value || "", {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              size="sm"
              variant="outline"
              placeholder="Select date"
              error={form.formState.errors.paymentData?.payment_date?.message}
              fullWidth
              disabled={isCOD}
              hiddenDates={{
                futureDates: true,
              }}
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Paid Amount"
              placeholder="Enter paid amount"
              fullWidth
              size="sm"
              disabled={isCOD}
              onInput={handleNumbersWithDecimal}
              error={form.formState.errors.paymentData?.paid_amount?.message}
              {...form.register("paymentData.paid_amount", {
                valueAsNumber: true,
                onChange: (e) => {
                  const value = parseFloat(e.target.value);
                  if (isNaN(value)) {
                    form.setValue("paymentData.paid_amount", null, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  } else {
                    form.setValue("paymentData.paid_amount", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }
                },
              })}
            />
            <AppInput
              label="Payment Slip Number"
              placeholder="Enter payment slip number"
              size="sm"
              fullWidth
              disabled={isCOD}
              error={
                form.formState.errors.paymentData?.payment_slip_number?.message
              }
              {...form.register("paymentData.payment_slip_number")}
            />
          </div>

          <div className="flex flex-col mt-2 gap-y-2">
            <AppText variant="caption" size="text-xs">
              Upload Payment Slip
            </AppText>

            <FileUploadWithPreview
              file={localSlipFile}
              onFileChange={setLocalSlipFile}
              accept=".pdf,.jpg,.jpeg,.png"
              maxSizeMB={10}
              supportedFormatsText="Supported formats: PDF, JPG, PNG (Max 10MB)"
              disabled={isCOD}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
