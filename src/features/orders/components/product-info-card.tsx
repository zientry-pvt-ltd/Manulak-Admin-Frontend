import { Package, Trash2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { AppButton, AppIconButton, AppInput, AppText } from "@/components";
import AppChip from "@/components/ui/app-chip";
import type { OrderProductListItem } from "@/features/orders/types/order.type";
import { useConfirmDialog } from "@/providers";
import {
  useDeleteOrderItemRecordMutation,
  useUpdateOrderItemRecordMutation,
} from "@/services/orders";
import { normalizeError } from "@/utils/error-handler";

type ProductCardProps = {
  item: OrderProductListItem;
  itemTotal: number;
  itemAvailableQuantity: number;
  displayQuantity: number;
  isViewMode: boolean;
  isLastProductItem: boolean;
};

export const ProductCard = ({
  item,
  itemTotal,
  itemAvailableQuantity,
  displayQuantity,
  isViewMode,
  isLastProductItem,
}: ProductCardProps) => {
  const [newQuantity, setNewQuantity] = useState<number>(displayQuantity);

  const { confirm } = useConfirmDialog();

  const [updateOrderItem, { isLoading: isUpdating }] =
    useUpdateOrderItemRecordMutation();
  const [deleteOrderItem, { isLoading: isDeleting }] =
    useDeleteOrderItemRecordMutation();

  const handleUpdateQuantity = useCallback(async () => {
    if (!newQuantity || newQuantity <= 0) return;

    try {
      await updateOrderItem({
        itemId: item.order_details_id,
        data: {
          modified_required_qunatity: newQuantity,
        },
      });
      toast.success("Order item quantity updated successfully");
    } catch (error) {
      const message = normalizeError(error);
      toast.error("Failed to update order item quantity");
      console.log(message.message);
    }
  }, [item, newQuantity, updateOrderItem]);

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = Number(e.target.value);

      if (quantity < newQuantity) return setNewQuantity(quantity);

      if (quantity > itemAvailableQuantity + displayQuantity) {
        toast.error(`Only ${itemAvailableQuantity} units available in stock`);
        setNewQuantity(itemAvailableQuantity + displayQuantity);
        return;
      }

      setNewQuantity(quantity);
    },
    [newQuantity, itemAvailableQuantity, displayQuantity],
  );

  const handleDeleteOrderItem = useCallback(async () => {
    try {
      await deleteOrderItem(item.order_details_id).unwrap();
      toast.success("Order item removed successfully");
    } catch (error) {
      const message = normalizeError(error);
      toast.error("Failed to remove order item");
      console.log(message.message);
    }
  }, [deleteOrderItem, item.order_details_id]);

  const handleConfirmDelete = useCallback(() => {
    if (isLastProductItem)
      return toast.error(
        "Cannot remove the last item from the order. Please delete the entire order instead.",
      );

    confirm({
      title: "Remove Order Item",
      description:
        "You're going to remove this item from the order. This action is irreversible. Are you sure you want to continue?",
      variant: "destructive",
      confirmText: "Yes, Remove!",
      cancelText: "No, keep it",
      onSubmit: handleDeleteOrderItem,
    });
  }, [confirm, handleDeleteOrderItem, isLastProductItem]);

  return (
    <div
      key={item.order_details_id}
      className={"border rounded-lg p-4 relative"}
    >
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
          {item.product.product_image_urls?.[0] ? (
            <img
              src={item.product.product_image_urls[0]}
              alt={item.product.product_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex justify-center items-center gap-x-2">
              <AppText variant="subheading" size="text-base">
                {item.product.product_name}
              </AppText>
              <AppChip
                label={item.product.product_category}
                size="sm"
                variant="secondary"
              />
            </div>
            <div className="text-right">
              <AppText variant="body" size="text-sm" className="font-semibold">
                Rs. {item.product.selling_price.toFixed(2)}
              </AppText>
              <AppText variant="caption" size="text-xs">
                per unit
              </AppText>
            </div>
          </div>

          {item.product.product_desc && (
            <AppText
              variant="caption"
              size="text-xs"
              className="mb-2 line-clamp-2"
            >
              {item.product.product_desc}
            </AppText>
          )}

          {/* Quantity and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isViewMode ? (
                <>
                  <AppText variant="caption" size="text-sm">
                    Quantity:
                  </AppText>
                  <div className="bg-primary/10 px-3 py-1 rounded-md">
                    <AppText
                      variant="body"
                      size="text-sm"
                      className="font-medium"
                    >
                      {displayQuantity}
                    </AppText>
                  </div>
                </>
              ) : (
                <>
                  <AppText variant="caption" size="text-sm">
                    Quantity:
                  </AppText>
                  <AppInput
                    type="number"
                    value={newQuantity}
                    size="sm"
                    min={1}
                    onChange={handleQuantityChange}
                    onInput={(e) => {
                      const input = e.currentTarget;
                      input.value = input.value.replace(/[a-zA-Z-]/g, "");
                    }}
                  />
                </>
              )}
              <AppText variant="body" size="text-sm">
                Subtotal: Rs. {itemTotal.toFixed(2)}
              </AppText>
            </div>

            {!isViewMode && (
              <div className="space-x-2 flex justify-center items-center">
                <AppIconButton
                  size="sm"
                  Icon={Trash2}
                  variant={"destructive"}
                  onClick={handleConfirmDelete}
                  isLoading={isDeleting}
                />
                <AppButton
                  size="sm"
                  disabled={isUpdating || newQuantity === displayQuantity}
                  onClick={() => handleUpdateQuantity()}
                  className="min-w-24"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </AppButton>
              </div>
            )}
          </div>
        </div>

        {/* close button */}
        {newQuantity !== displayQuantity && !isViewMode && (
          <AppIconButton
            Icon={X}
            size="sm"
            variant={"outline"}
            onClick={() => setNewQuantity(displayQuantity)}
            className="absolute -top-2 -right-2 rounded-full"
            aria-label={`Remove ${item.product.product_name} from order`}
          />
        )}
      </div>
    </div>
  );
};
