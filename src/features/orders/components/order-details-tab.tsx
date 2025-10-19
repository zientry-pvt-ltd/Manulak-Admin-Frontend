import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppInput, AppSelect, AppText } from "@/components";
import {
  ORDER_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  SELLING_METHODS_OPTIONS,
} from "@/features/orders/constants";
import { orderMetaDataSchema } from "@/features/orders/schema";
import { useGetOrderMetadataQuery } from "@/services/orders";
import { normalizeError } from "@/utils/error-handler";

type OrderDetailsTabProps = {
  orderId: string;
  mode: "view" | "edit";
  // eslint-disable-next-line no-unused-vars
  onModeChange?: (mode: "view" | "edit") => void;
};

type FormFieldValues = z.infer<typeof orderMetaDataSchema>;

export const OrderDetailsTab = ({
  orderId,
  mode: initialMode,
  onModeChange,
}: OrderDetailsTabProps) => {
  const [mode, setMode] = useState<"view" | "edit">(initialMode);
  const { data, isLoading, error } = useGetOrderMetadataQuery(orderId);
  //   const [updateOrderMetadata, { isLoading: isUpdating }] =
  //     useUpdateOrderMetadataMutation();

  const form = useForm<FormFieldValues>({
    resolver: zodResolver(orderMetaDataSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      selling_method: "ONLINE",
      order_value: 0,
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      postal_code: 0,
      primary_phone_number: "",
      email: "",
      alternate_phone_number_1: "",
      alternate_phone_number_2: "",
      status: "PENDING",
      payment_method: "COD",
    },
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (data) {
      form.reset({
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        selling_method: data.data.selling_method,
        order_value: data.data.order_value,
        address_line_1: data.data.address_line_1,
        address_line_2: data.data.address_line_2,
        address_line_3: data.data.address_line_3,
        postal_code: data.data.postal_code,
        primary_phone_number: data.data.primary_phone_number,
        company_name: data.data.company_name || "",
        email: data.data.email || "",
        alternate_phone_number_1: data.data.alternate_phone_number_1 || "",
        alternate_phone_number_2: data.data.alternate_phone_number_2 || "",
        status: data.data.status,
        payment_method: data.data.payment_method,
      });
    }
  }, [data, form]);

  const handleModeChange = (newMode: "view" | "edit") => {
    setMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  const handleSubmit = async (formData: FormFieldValues) => {
    try {
      console.log({ formData });
      toast.success("Order details updated successfully");
      handleModeChange("view");
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to update order: ${message.message}`);
      console.error("Order update failed:", error);
    }
  };

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

  return (
    <div className="space-y-6 p-4">
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
              label="Selling Method"
              placeholder="Select selling method"
              items={SELLING_METHODS_OPTIONS}
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.selling_method?.message}
              {...form.register("selling_method")}
            />
            <AppSelect
              label="Order Status"
              placeholder="Select order status"
              items={ORDER_STATUS_OPTIONS}
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.status?.message}
              {...form.register("status")}
            />
            <AppInput
              label="Order Value"
              placeholder="Enter order value"
              type="number"
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.order_value?.message}
              {...form.register("order_value", { valueAsNumber: true })}
            />
            <AppSelect
              label="Payment Method"
              placeholder="Select payment method"
              items={PAYMENT_METHOD_OPTIONS}
              fullWidth
              size="sm"
              disabled={isViewMode}
              error={form.formState.errors.payment_method?.message}
              {...form.register("payment_method")}
            />
          </div>
        </div>

        {/* Metadata */}
        {data && (
          <div>
            <AppText variant="subheading" className="mb-4">
              System Information
            </AppText>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <AppText variant="caption" size="text-xs" className="mb-1">
                  Order ID
                </AppText>
                <AppText variant="body" size="text-sm">
                  {data.data.order_id}
                </AppText>
              </div>
              <div>
                <AppText variant="caption" size="text-xs" className="mb-1">
                  Created At
                </AppText>
                <AppText variant="body" size="text-sm">
                  {new Date(data.data.created_at).toLocaleString()}
                </AppText>
              </div>
              <div>
                <AppText variant="caption" size="text-xs" className="mb-1">
                  Updated At
                </AppText>
                <AppText variant="body" size="text-sm">
                  {new Date(data.data.updated_at).toLocaleString()}
                </AppText>
              </div>
              <div>
                <AppText variant="caption" size="text-xs" className="mb-1">
                  Status
                </AppText>
                <AppText variant="body" size="text-sm">
                  {data.data.is_deleted ? "Deleted" : "Active"}
                </AppText>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
