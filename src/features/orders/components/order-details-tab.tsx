import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
  AppButton,
  AppInput,
  AppSelect,
  AppText,
  AppTextarea,
} from "@/components";
import {
  ORDER_STATUS_OPTIONS,
  type OrderStatus,
} from "@/features/orders/constants";
import { orderMetaDataSchema } from "@/features/orders/schema";
import {
  useGetOrderMetadataQuery,
  useUpdateOrderMetaDataMutation,
} from "@/services/orders";
import { selectOrder } from "@/store/selectors/orderSelector";
import { useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

type OrderDetailsTabProps = {
  mode: "view" | "edit";
};

type FormFieldValues = z.infer<typeof orderMetaDataSchema>;

const getDisabledStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
  const statusRules: Record<OrderStatus, OrderStatus[]> = {
    PENDING: [], // Can transition to any status
    CONFIRMED: ["PENDING"], // Cannot go back to pending
    SHIPPED: ["PENDING", "CONFIRMED", "CANCELLED"],
    DELIVERED: ["PENDING", "CONFIRMED", "SHIPPED", "CANCELLED"],
    COMPLETE: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
    CANCELLED: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "COMPLETE"],
  };

  return statusRules[currentStatus] || [];
};

export const OrderDetailsTab = ({ mode }: OrderDetailsTabProps) => {
  const { selectedOrderId } = useAppSelector(selectOrder);
  const { data, isLoading, error } = useGetOrderMetadataQuery(selectedOrderId, {
    skip: !selectedOrderId,
  });
  const [updateOrderMetaData, { isLoading: isUpdating }] =
    useUpdateOrderMetaDataMutation();

  const form = useForm<FormFieldValues>({
    resolver: zodResolver(orderMetaDataSchema),
    values: data
      ? {
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          selling_method: data.data.selling_method,
          admin_message: data.data.admin_message || "",
          order_value: data.data.order_value,
          address_line_1: data.data.address_line_1,
          address_line_2: data.data.address_line_2,
          address_line_3: data.data.address_line_3,
          postal_code: data.data.postal_code,
          primary_phone_number: data.data.primary_phone_number,
          confirm_phone_number: data.data.primary_phone_number,
          company_name: data.data.company_name || "",
          email: data.data.email || "",
          alternate_phone_number_1: data.data.alternate_phone_number_1 || "",
          alternate_phone_number_2: data.data.alternate_phone_number_2 || "",
          status: data.data.status,
          payment_method: data.data.payment_method,
        }
      : undefined,
  });

  const validatePhoneMatch = () => {
    const primaryPhone = form.getValues("primary_phone_number");
    const confirmPhone = form.getValues("confirm_phone_number");

    if (primaryPhone && !confirmPhone) {
      form.setError("confirm_phone_number", {
        message: "Please confirm the phone number",
        type: "setValueAs",
      });
      return false;
    }

    if (!confirmPhone) {
      form.clearErrors("confirm_phone_number");
      return true;
    }

    if (primaryPhone !== confirmPhone) {
      form.setError("confirm_phone_number", {
        message: "Phone numbers do not match",
        type: "setValueAs",
      });
      return false;
    }

    form.clearErrors("confirm_phone_number");
    return true;
  };

  const handleSubmit = async (data: FormFieldValues) => {
    if (!selectedOrderId) return;
    // eslint-disable-next-line no-unused-vars
    const { confirm_phone_number, ...orderMetaDataWithoutConfirmP } = data;

    if (!validatePhoneMatch()) return;

    try {
      await updateOrderMetaData({
        id: selectedOrderId,
        data: orderMetaDataWithoutConfirmP,
      }).unwrap();
      toast.success("Order details updated successfully");
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to update order: ${message.message}`);
      console.error("Order update failed:", error);
    }
  };

  if (!selectedOrderId) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body">No order selected</AppText>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body">Loading order details...</AppText>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body" color="destructive">
          Failed to load order details
        </AppText>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body">No order data available</AppText>
      </div>
    );
  }

  const isViewMode = mode === "view";

  const currentStatus = data.data.status;
  const disabledStatuses = getDisabledStatuses(currentStatus);
  const filteredStatusOptions = ORDER_STATUS_OPTIONS.map((option) => ({
    ...option,
    disabled: disabledStatuses.includes(option.value as OrderStatus),
  }));

  return (
    <div className="space-y-6 p-2 mb-10">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Customer Information */}
        <div>
          <AppText variant="subheading" className="mb-4">
            Customer Information
          </AppText>
          <div className="grid grid-cols-2 gap-4">
            <AppInput
              label="First Name"
              placeholder="Enter first name"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.first_name?.message}
              {...form.register("first_name")}
            />
            <AppInput
              label="Last Name"
              placeholder="Enter last name"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.last_name?.message}
              {...form.register("last_name")}
            />
            <AppInput
              label="Primary Phone"
              placeholder="Enter primary phone"
              fullWidth
              size="sm"
              type="tel"
              disabled={isViewMode}
              error={form.formState.errors.primary_phone_number?.message}
              {...form.register("primary_phone_number")}
            />
            <AppInput
              label="Confirm Phone"
              placeholder="Enter confirm phone"
              type="tel"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.confirm_phone_number?.message}
              {...form.register("confirm_phone_number")}
            />
            <AppInput
              label="Company Name"
              placeholder="Enter company name"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors?.company_name?.message}
              {...form.register("company_name")}
            />
            <AppInput
              label="Email"
              placeholder="Enter email"
              type="email"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />
            <AppInput
              label="Alternate Phone 1"
              placeholder="Enter alternate phone 1"
              type="tel"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.alternate_phone_number_1?.message}
              {...form.register("alternate_phone_number_1")}
            />
            <AppInput
              label="Alternate Phone 2"
              placeholder="Enter alternate phone 2"
              type="tel"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.alternate_phone_number_2?.message}
              {...form.register("alternate_phone_number_2")}
            />
          </div>
        </div>

        {/* Address Information */}
        <div>
          <AppText variant="subheading" className="mb-4">
            Address Information
          </AppText>
          <div className="grid grid-cols-2 gap-4">
            <AppInput
              label="Address Line 1"
              placeholder="Enter address line 1"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.address_line_1?.message}
              {...form.register("address_line_1")}
            />
            <AppInput
              label="Address Line 2"
              placeholder="Enter address line 2"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.address_line_2?.message}
              {...form.register("address_line_2")}
            />
            <AppInput
              label="Address Line 3"
              placeholder="Enter address line 3"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.address_line_3?.message}
              {...form.register("address_line_3")}
            />
            <AppInput
              label="Postal Code"
              placeholder="Enter postal code"
              fullWidth
              size="sm"
              type="number"
              disabled={isViewMode}
              error={form.formState.errors.postal_code?.message}
              {...form.register("postal_code", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Order Information */}
        <div>
          <AppText variant="subheading" className="mb-4">
            Order Information
          </AppText>
          <div className="grid grid-cols-2 gap-4">
            <AppSelect
              label="Order Status"
              placeholder="Select order status"
              items={filteredStatusOptions}
              defaultValue={data.data.status}
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.status?.message}
              value={form.getValues("status")}
              onValueChange={(value) => {
                form.setValue("status", value as OrderStatus, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              {...form.register("status")}
            />

            <AppTextarea
              label="Admin Note"
              placeholder="Enter admin note"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors?.admin_message?.message}
              {...form.register("admin_message")}
            />
          </div>
        </div>
        {mode === "edit" && (
          <AppButton
            type="submit"
            disabled={isViewMode}
            variant="default"
            className="absolute bottom-0 right-4 m-4"
            size="sm"
            isLoading={isUpdating}
          >
            Save Changes
          </AppButton>
        )}
      </form>
    </div>
  );
};
