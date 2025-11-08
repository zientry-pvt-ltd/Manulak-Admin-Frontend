import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppButton, AppInput, AppText } from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import ProductSelectorCard from "@/features/orders/components/product-selector-card";
import { plantNurseryOrderSchema } from "@/features/orders/schema";
import { clearSelectedProducts } from "@/features/orders/store/order-form-slice";
import { useCreateOrderMutation } from "@/services/orders";
import { selectOrderForm } from "@/store/selectors/orderFormSelector";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export type FormFieldValues = z.infer<typeof plantNurseryOrderSchema>;

export const PlantNurseryOrderPlacementForm = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectOrderForm).selectedProducts;
  const [createOrder] = useCreateOrderMutation();

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
        first_name: "Jhon",
        last_name: "Doe ",
        selling_method: "PLANT_NURSERY",
        order_value: 2000,
        address_line_1: "Matara",
        address_line_2: "",
        address_line_3: "",
        primary_phone_number: "12212321232",
        confirm_phone_number: "12212321232",
        status: "PENDING",
        payment_method: "COD",
        postal_code: 81000,
      },
      paymentData: {
        payment_date: "2023-10-10T00:00:00.000Z",
      },
    },
  });

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

        <AppButton
          type="button"
          onClick={() => console.log(form.formState.errors, form.getValues())}
        >
          Debug Values
        </AppButton>

        {/* Billing Information Section */}
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

          <div className="flex w-1/2">
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

        {/* Payment Information Section */}
        <div className="pr-4">
          <AppText variant="subheading">Payment Information</AppText>

          <div className="flex w-1/2">
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
        </div>
      </form>
    </FormProvider>
  );
};
