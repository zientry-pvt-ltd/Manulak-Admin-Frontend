import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { AppButton, AppInput, AppText } from "@/components";
import AppDateInput from "@/components/ui/app-date-input";
import AppSingleSelectAutoComplete from "@/components/ui/app-single-select-autocomplete";
import { plantNurseryOrderSchema } from "@/features/orders/schema";
import {
  addProductToList,
  clearSelectedProducts,
  removeProductFromList,
} from "@/features/orders/store/order-form-slice";
import type { FullOrder } from "@/features/orders/types/order.type";
import { cn } from "@/lib/utils";
import { useCreateOrderMutation } from "@/services/orders";
import { selectProducts } from "@/store/selectors";
import { selectOrderForm } from "@/store/selectors/orderFormSelector";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

export type FormFieldValues = z.infer<typeof plantNurseryOrderSchema>;

export const PlantNurseryOrderPlacementForm = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(selectProducts).products;
  const selectedProducts = useAppSelector(selectOrderForm).selectedProducts;
  const [createOrder] = useCreateOrderMutation();

  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [confirmPhone, setConfirmPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const productItems = useMemo(
    () =>
      productList.map((product) => ({
        label: product.product_name,
        value: product.id,
      })),
    [productList],
  );

  const validatePhoneMatch = () => {
    const primaryPhone = form.getValues("orderMetaData.primary_phone_number");

    if (primaryPhone && !confirmPhone) {
      setPhoneError("Please confirm the phone number");
      return false;
    }

    if (!confirmPhone) {
      setPhoneError("");
      return true;
    }

    if (primaryPhone !== confirmPhone) {
      setPhoneError("Phone numbers do not match");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const handleConfirmPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPhone(e.target.value);
    if (phoneError) {
      setPhoneError("");
    }
  };

  const setOrderValue = () => {
    form.setValue("orderMetaData.order_value", selectedProducts.subtotal, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const form = useForm<FormFieldValues>({
    resolver: zodResolver(plantNurseryOrderSchema),
    defaultValues: {
      orderItemsData: [],
      orderMetaData: {
        first_name: "Jhon",
        last_name: "Doe ",
        selling_method: "OFFLINE",
        order_value: 0,
        address_line_1: "Matara",
        address_line_2: "",
        address_line_3: "",
        primary_phone_number: "12212321232",
        status: "PENDING",
      },
      paymentData: {
        payment_date: "2023-10-10T00:00:00.000Z",
      },
    },
  });

  const handleSubmit = async (data: FormFieldValues) => {
    console.log("Form Data:", data);

    const updatedData = {
      ...data,
      orderMetaData: {
        ...data.orderMetaData,
        order_value: selectedProducts.subtotal,
      },
    };

    if (!validatePhoneMatch()) return;

    try {
      await createOrder(updatedData as FullOrder).unwrap();
      toast.success("Plant Nursery order created successfully");
      form.reset();
      dispatch(clearSelectedProducts());
      setConfirmPhone("");
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to create order: ${message.message}`);
      console.error("Order creation failed:", error);
    }
  };

  const handleAddProduct = () => {
    if (!selectedProductId || !quantity || quantity <= 0) return;

    const product = productList.find((p) => p.id === selectedProductId);
    if (!product) return;

    dispatch(
      addProductToList({
        productId: product.id,
        productName: product.product_name,
        productPrice: product.selling_price,
        quantity,
      }),
    );

    const newOrderItems = [
      ...form.getValues().orderItemsData,
      { product_id: product.id, required_quantity: quantity },
    ];
    form.setValue("orderItemsData", newOrderItems, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setOrderValue();

    // Reset input state
    setSelectedProductId(undefined);
    setQuantity(undefined);
  };

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProductFromList(productId));

    const newOrderItems = form
      .getValues()
      .orderItemsData.filter((item) => item.product_id !== productId);
    form.setValue("orderItemsData", newOrderItems, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setOrderValue();
  };

  const handleProductSelect = (value: string) => {
    setSelectedProductId(value);
  };

  return (
    <form
      id="plant-nursery-order-placement-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="min-w-[80vw] space-y-8 overflow-y-scroll overflow-x-hidden"
    >
      {/* Order Information Section */}
      <div className="pr-4">
        <AppText variant="subheading">Order Information</AppText>
        <div className="flex flex-row justify-center gap-x-4">
          {/* LEFT: Selection Form */}
          <div className="flex flex-col mt-2 w-1/2 space-y-3">
            <AppSingleSelectAutoComplete
              label="Select Product"
              placeholder="Choose a plant/product"
              searchPlaceholder="Search products..."
              size="sm"
              items={productItems}
              value={selectedProductId}
              defaultValue={selectedProductId}
              onValueChange={handleProductSelect}
              fullWidth
            />

            <div className="flex flex-row gap-x-2 items-end">
              <AppInput
                label="Quantity"
                placeholder="Enter quantity"
                type="number"
                value={quantity ?? ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                fullWidth
                size="sm"
              />
              <AppButton
                onClick={handleAddProduct}
                variant="outline"
                size="sm"
                className="rounded-md flex items-center gap-x-1"
                disabled={!selectedProductId || !quantity || quantity <= 0}
              >
                Add
              </AppButton>
            </div>
          </div>

          {/* RIGHT: Selected Products List */}
          <div className="flex flex-col w-1/2">
            <AppText variant="caption" size="text-xs" className="mb-2">
              Selected Products{" "}
              {selectedProducts.subtotal > 0 &&
                `(Subtotal Rs:${selectedProducts.subtotal.toFixed(2)})`}
            </AppText>
            <div className="flex flex-wrap gap-2 border rounded-md p-2 min-h-[42px]">
              {form.formState.errors.orderItemsData?.message && (
                <AppText size="text-xs" color="destructive">
                  {form.formState.errors.orderItemsData?.message}
                </AppText>
              )}

              {selectedProducts.list.length > 0 &&
                selectedProducts.list.map((product) => (
                  <div
                    key={product.productId}
                    className={cn(
                      "flex items-center gap-x-1 rounded-full border border-border bg-muted/30 px-2 py-1.5",
                      "transition-all hover:bg-muted/50 hover:shadow-sm",
                    )}
                  >
                    <AppText
                      variant="caption"
                      size="text-xs"
                      className="truncate max-w-[100px]"
                    >
                      {product.productName}
                    </AppText>

                    <AppText
                      variant="caption"
                      size="text-xs"
                      className="bg-ring px-2 rounded-full font-medium text-primary"
                    >
                      {product.quantity}
                    </AppText>

                    <button
                      onClick={() => handleRemoveProduct(product.productId)}
                      className="ml-1 inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label={`Remove ${product.productName}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
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
            error={form.formState.errors.orderMetaData?.address_line_1?.message}
            {...form.register("orderMetaData.address_line_1")}
          />
          <AppInput
            label="Address Line 2"
            placeholder="Enter address line 2"
            fullWidth
            size="sm"
            error={form.formState.errors.orderMetaData?.address_line_2?.message}
            {...form.register("orderMetaData.address_line_2")}
          />
        </div>

        <div className="flex w-1/2">
          <AppInput
            label="Address Line 3"
            placeholder="Enter address line 3"
            fullWidth
            size="sm"
            error={form.formState.errors.orderMetaData?.address_line_3?.message}
            {...form.register("orderMetaData.address_line_3")}
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
              form.formState.errors.orderMetaData?.primary_phone_number?.message
            }
            {...form.register("orderMetaData.primary_phone_number")}
          />
          <AppInput
            label="Confirm Phone"
            placeholder="Re-enter phone number"
            fullWidth
            size="sm"
            type="tel"
            value={confirmPhone}
            onChange={handleConfirmPhoneChange}
            onBlur={validatePhoneMatch}
            error={phoneError}
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
  );
};
