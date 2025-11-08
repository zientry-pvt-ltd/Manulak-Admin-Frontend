import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Image, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import {
  AppButton,
  AppIcon,
  AppIconButton,
  AppInput,
  AppSelect,
  AppText,
} from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import ProductSelectorCard from "@/features/orders/components/product-selector-card";
import {
  PAYMENT_METHOD_OPTIONS,
  type PaymentMethod,
} from "@/features/orders/constants";
import { onlineManualOrderSchema } from "@/features/orders/schema";
import { clearSelectedProducts } from "@/features/orders/store/order-form-slice";
import { useAppDialog } from "@/providers";
import {
  useCreateOrderMutation,
  useUploadPaymentSlipMutation,
} from "@/services/orders";
import { selectOrderForm } from "@/store/selectors/orderFormSelector";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export type FormFieldValues = z.infer<typeof onlineManualOrderSchema>;

export const OnlineOrderPlacementForm = () => {
  const dispatch = useAppDispatch();
  const { closeAppDialog } = useAppDialog();
  const selectedProducts = useAppSelector(selectOrderForm).selectedProducts;
  const [createOrder] = useCreateOrderMutation();
  const [uploadPaymentSlip] = useUploadPaymentSlipMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [localSlipFile, setLocalSlipFile] = useState<File | null>(null);

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
        first_name: "Arun",
        last_name: "Deshan",
        selling_method: "ONLINE",
        order_value: 0,
        address_line_1: "Matara",
        address_line_2: "Sri Lanka",
        address_line_3: "",
        postal_code: 20000,
        primary_phone_number: "0774455675",
        confirm_phone_number: "0774455675",
        status: "PENDING",
        payment_method: "COD",
      },
      paymentData: {
        paid_amount: 0,
        payment_date: "2023-10-10T00:00:00.000Z",
        payment_slip_number: "",
      },
    },
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);
      setLocalSlipFile(files[0]);
    },
    [],
  );

  const handleSubmit = async (data: FormFieldValues) => {
    const { orderItemsData, orderMetaData, paymentData } = data;

    // eslint-disable-next-line no-unused-vars
    const { confirm_phone_number, ...orderMetaDataWithoutConfirm } =
      orderMetaData;

    const updatedOrderMetaData = {
      ...orderMetaDataWithoutConfirm,
      order_value: selectedProducts.subtotal,
    };

    const updatedData = {
      orderMetaData: updatedOrderMetaData,
      orderItemsData: orderItemsData,
      paymentData: paymentData,
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
              error={form.formState.errors.orderMetaData?.first_name?.message}
              {...form.register("orderMetaData.first_name")}
            />
            <AppInput
              label="Last Name"
              placeholder="Enter last name"
              fullWidth
              size="sm"
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
              type="number"
              error={form.formState.errors.orderMetaData?.postal_code?.message}
              {...form.register("orderMetaData.postal_code", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Primary Phone"
              placeholder="Enter primary phone"
              fullWidth
              size="sm"
              type="tel"
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
              error={form.formState.errors.orderMetaData?.company_name?.message}
              {...form.register("orderMetaData.company_name")}
            />
            <AppInput
              label="Email"
              placeholder="Enter email"
              type="email"
              fullWidth
              size="sm"
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
              onValueChange={(value) =>
                form.setValue(
                  "orderMetaData.payment_method",
                  value as PaymentMethod,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                )
              }
              {...form.register("orderMetaData.payment_method")}
            />

            <AppDateInput
              label="Payment Date"
              value={form.getValues("paymentData.payment_date")}
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
            />
          </div>

          <div className="flex flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Paid Amount"
              placeholder="Enter paid amount"
              type="number"
              fullWidth
              size="sm"
              error={form.formState.errors.paymentData?.paid_amount?.message}
              {...form.register("paymentData.paid_amount", {
                valueAsNumber: true,
              })}
            />
            <AppInput
              label="Payment Slip Number"
              placeholder="Enter payment slip number"
              size="sm"
              fullWidth
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

            {localSlipFile && (
              <div className="flex items-center justify-between rounded-md border p-2 max-w-xs">
                <div className="flex items-center space-x-3">
                  {/* File Icon */}
                  <div className="flex h-10 w-10 items-center justify-center bg-accent rounded-sm">
                    {localSlipFile.type.startsWith("image/") ? (
                      <AppIcon Icon={Image} className="h-6 w-6 text-blue-500" />
                    ) : (
                      <AppIcon
                        Icon={FileText}
                        className="h-6 w-6 text-amber-500"
                      />
                    )}
                  </div>

                  <div className="flex flex-col">
                    <AppText variant="caption" size="text-sm">
                      {localSlipFile.name}
                    </AppText>
                    <AppText variant="caption" size="text-xs" color="muted">
                      {(localSlipFile.size / (1024 * 1024)).toFixed(2)} MB
                    </AppText>
                  </div>
                </div>

                <AppIconButton
                  Icon={X}
                  onClick={() => setLocalSlipFile(null)}
                  aria-label="Remove file"
                  rounded="full"
                  size="sm"
                  variant={"outline"}
                />
              </div>
            )}

            {!localSlipFile && (
              <div className="h-36 border rounded-lg flex justify-center items-center flex-col">
                <AppInput
                  size="sm"
                  fullWidth
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <AppText variant="caption" size="text-xs">
                  Supported formats: PDF, JPG, PNG
                </AppText>
                <AppButton
                  variant="outline"
                  size="sm"
                  className="m-2"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  Choose File
                </AppButton>
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
