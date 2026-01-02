import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppInput, AppSelect, AppText } from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import ProductSelectorCard from "@/features/orders/components/product-selector-card";
import {
  PAYMENT_METHOD_OPTIONS,
  type PaymentMethod,
} from "@/features/orders/constants";
import { plantNurseryOrderSchema } from "@/features/orders/schema";
import { clearSelectedProducts } from "@/features/orders/store/order-form-slice";
import { useSanitizedInput } from "@/hooks/use-sanitized-input";
import {
  useCalculateOrderValueMutation,
  useCreateOrderMutation,
} from "@/services/orders";
import { selectOrderForm } from "@/store/selectors/orderFormSelector";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export type FormFieldValues = z.infer<typeof plantNurseryOrderSchema>;

export const PlantNurseryOrderPlacementForm = () => {
  const dispatch = useAppDispatch();
  const { hasPlants } = useAppSelector(selectOrderForm);

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [
    calculateOrderValue,
    { isLoading: isCalculatingOrderValue, isError: isCalculateOrderValueError },
  ] = useCalculateOrderValueMutation();

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
    resolver: zodResolver(plantNurseryOrderSchema),
    defaultValues: {
      orderItemsData: [],
      orderMetaData: {
        first_name: "",
        last_name: "",
        selling_method: "PLANT_NURSERY",
        order_value: 0,
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        primary_phone_number: "",
        confirm_phone_number: "",
        status: "PENDING",
        payment_method: "FULL_PAYMENT",
        postal_code: "",
      },
      paymentData: {
        payment_date: null,
        paid_amount: null,
      },
    },
  });

  const paymentMethod = form.watch("orderMetaData.payment_method");
  const watchedList = form.watch("orderItemsData");
  const isCOD = paymentMethod === "COD";

  const handleSubmit = async (data: FormFieldValues) => {
    if (isCreatingOrder)
      toast.warning("Order is being created, please wait...");

    if (isCalculatingOrderValue)
      return toast.warning("Please wait until order value is calculated");
    if (isCalculateOrderValueError)
      return toast.error("Failed to calculate order value");

    if (isCOD && hasPlants)
      return toast.error(
        "Cash on Delivery is not available for orders with plants.",
      );

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

    if (!validatePhoneMatch()) return;

    try {
      await createOrder(updatedData).unwrap();

      form.reset();
      dispatch(clearSelectedProducts());
      toast.success("Plant Nursery order created successfully");
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to create order: ${message.message}`);
      console.error("Order creation failed:", error);
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
        id="plant-nursery-order-placement-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="min-w-[80vw] space-y-8 overflow-y-scroll overflow-x-hidden"
      >
        {/* Order Information Section */}
        <div className="pr-4">
          <AppText variant="subheading">Order Information</AppText>
          <ProductSelectorCard />
        </div>

        {/* Billing Information Section */}
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
              placeholder="Enter address line 2 (Optional)"
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
              placeholder="Enter address line 3 (Optional)"
              fullWidth
              size="sm"
              error={
                form.formState.errors.orderMetaData?.address_line_3?.message
              }
              {...form.register("orderMetaData.address_line_3")}
            />
            <AppInput
              label="Postal Code"
              placeholder="Enter postal code (Optional)"
              fullWidth
              size="sm"
              type="text"
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

        {/* Payment Information Section */}
        <div className="pr-4">
          <AppText variant="subheading">Payment Information</AppText>

          <div className="flex w-full flex-row mt-2 justify-center items-end gap-x-4">
            <AppSelect
              label="Payment Method"
              placeholder="Select payment method"
              value={form.getValues("orderMetaData.payment_method")}
              items={PAYMENT_METHOD_OPTIONS}
              disabled={watchedList.length === 0}
              fullWidth
              size="sm"
              error={
                form.formState.errors.orderMetaData?.payment_method?.message
              }
              onValueChange={async (value) => {
                if (value === "COD" && hasPlants)
                  return toast.error(
                    "Cash on Delivery is not available for orders with plants.",
                  );

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
              disabled={isCOD}
              error={form.formState.errors.paymentData?.payment_date?.message}
              fullWidth
            />
          </div>

          <div className="flex w-1/2 flex-row mt-2 justify-center items-end gap-x-4">
            <AppInput
              label="Paid Amount"
              placeholder="Enter paid amount"
              type="text"
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
