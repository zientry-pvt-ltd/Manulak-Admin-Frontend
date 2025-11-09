import { Package, Trash2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { AppButton, AppIconButton, AppInput, AppText } from "@/components";
import AppChip from "@/components/ui/app-chip";
import type { OrderProductListItem } from "@/features/orders/types/order.type";
import { useUpdateOrderItemRecordMutation } from "@/services/orders";
import { normalizeError } from "@/utils/error-handler";

type ProductCardProps = {
  item: OrderProductListItem;
  itemTotal: number;
  displayQuantity: number;
  isViewMode: boolean;
};

export const ProductCard = ({
  item,
  itemTotal,
  displayQuantity,
  isViewMode,
}: ProductCardProps) => {
  const [newQuantity, setNewQuantity] = useState<number>(displayQuantity);

  const [updateOrderItem, { isLoading: isUpdating }] =
    useUpdateOrderItemRecordMutation();

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

  return (
    <div
      key={item.order_details_id}
      className={"border rounded-lg p-4 transition-all relative"}
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
                    onChange={(e) => {
                      const val = e.target.value.replace(/[a-zA-Z-]/g, "");
                      const quantity = val === "" ? 0 : parseInt(val, 10);
                      setNewQuantity(quantity);
                    }}
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
                />
                <AppButton
                  size="sm"
                  disabled={isUpdating || newQuantity === displayQuantity}
                  onClick={() => handleUpdateQuantity()}
                >
                  Update
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
