import { Package, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppButton, AppInput, AppText } from "@/components";
import AppSingleSelectAutoComplete from "@/components/ui/app-single-select-autocomplete";
import { cn } from "@/lib/utils";
import { useGetOrderProductsQuery } from "@/services/orders";
import { selectProducts } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

type ProductsInfoTabProps = {
  orderId: string;
  mode: "view" | "edit";
  // eslint-disable-next-line no-unused-vars
  onModeChange?: (mode: "view" | "edit") => void;
};

const isAdding = false; // Placeholder for add loading state
const isRemoving = false; // Placeholder for remove loading state
const isUpdating = false; // Placeholder for update loading state

export const ProductsInfoTab = ({
  orderId,
  mode: initialMode,
  onModeChange,
}: ProductsInfoTabProps) => {
  const [mode, setMode] = useState<"view" | "edit">(initialMode);
  const { data, isLoading, error } = useGetOrderProductsQuery(orderId);
  const productList = useAppSelector(selectProducts).products;

  //   const [addOrderProduct, { isLoading: isAdding }] =
  //     useAddOrderProductMutation();
  //   const [removeOrderProduct, { isLoading: isRemoving }] =
  //     useRemoveOrderProductMutation();
  //   const [updateQuantity, { isLoading: isUpdating }] =
  //     useUpdateOrderProductQuantityMutation();

  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [editingQuantities, setEditingQuantities] = useState<
    Record<string, number>
  >({});

  const handleModeChange = (newMode: "view" | "edit") => {
    setMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  const handleEdit = () => {
    // Initialize editing quantities
    if (data?.data) {
      const quantities: Record<string, number> = {};
      data.data.forEach((item) => {
        quantities[item.order_details_id] = item.required_quantity;
      });
      setEditingQuantities(quantities);
    }
    handleModeChange("edit");
  };

  const handleCancel = () => {
    setEditingQuantities({});
    setSelectedProductId(undefined);
    setQuantity(undefined);
    handleModeChange("view");
  };

  const handleSave = async () => {
    try {
      // Update quantities for modified products
      const promises = Object.entries(editingQuantities).map(
        ([orderDetailsId, newQuantity]) => {
          const originalItem = data?.data.find(
            (item) => item.order_details_id === orderDetailsId,
          );
          if (originalItem && originalItem.required_quantity !== newQuantity) {
            // return updateQuantity({
            //   orderId,
            //   orderDetailsId,
            //   quantity: newQuantity,
            // }).unwrap();
          }
          return Promise.resolve();
        },
      );

      await Promise.all(promises);
      toast.success("Order products updated successfully");
      handleModeChange("view");
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to update products: ${message.message}`);
      console.error("Product update failed:", error);
    }
  };

  const handleAddProduct = async () => {
    if (!selectedProductId || !quantity || quantity <= 0) {
      toast.error("Please select a product and enter a valid quantity");
      return;
    }

    try {
      //   await addOrderProduct({
      //     orderId,
      //     productId: selectedProductId,
      //     quantity,
      //   }).unwrap();
      toast.success("Product added to order");
      setSelectedProductId(undefined);
      setQuantity(undefined);
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to add product: ${message.message}`);
      console.error("Add product failed:", error);
    }
  };

  const handleRemoveProduct = async (
    orderDetailsId: string,
    productName: string,
  ) => {
    if (
      !confirm(
        `Are you sure you want to remove "${productName}" from this order?`,
      )
    ) {
      return;
    }

    try {
      //   await removeOrderProduct({ orderId, orderDetailsId }).unwrap();
      toast.success("Product removed from order");
      // Remove from editing quantities
      const newQuantities = { ...editingQuantities };
      delete newQuantities[orderDetailsId];
      setEditingQuantities(newQuantities);
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to remove product: ${message.message}`);
      console.error("Remove product failed:", error);
    }
  };

  const handleQuantityChange = (
    orderDetailsId: string,
    newQuantity: number,
  ) => {
    setEditingQuantities((prev) => ({
      ...prev,
      [orderDetailsId]: newQuantity,
    }));
  };

  const productItems = useMemo(
    () =>
      productList
        .filter((product) => {
          // Filter out products already in the order
          return !data?.data?.some((item) => item.product_id === product.id);
        })
        .map((product) => ({
          label: product.product_name,
          value: product.id,
        })),
    [productList, data],
  );

  const calculateTotal = () => {
    if (!data?.data) return 0;
    return data.data.reduce((total, item) => {
      const qty =
        mode === "edit"
          ? (editingQuantities[item.order_details_id] ?? item.required_quantity)
          : item.required_quantity;
      return total + item.product.selling_price * qty;
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body">Loading products...</AppText>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body" color="destructive">
          Failed to load order products
        </AppText>
      </div>
    );
  }

  const isViewMode = mode === "view";
  const orderProducts = data?.data || [];
  const totalAmount = calculateTotal();

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <AppText variant="heading">Order Products</AppText>
          <AppText variant="caption" size="text-sm" className="mt-1">
            Total: Rs. {totalAmount.toFixed(2)} ({orderProducts.length} items)
          </AppText>
        </div>
        <div className="flex gap-2">
          {isViewMode ? (
            <AppButton onClick={handleEdit} variant="default" size="sm">
              Edit
            </AppButton>
          ) : (
            <>
              <AppButton
                onClick={handleCancel}
                variant="outline"
                size="sm"
                disabled={isUpdating || isAdding || isRemoving}
              >
                Cancel
              </AppButton>
              <AppButton
                onClick={handleSave}
                variant="default"
                size="sm"
                disabled={isUpdating || isAdding || isRemoving}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </AppButton>
            </>
          )}
        </div>
      </div>

      {/* Add Product Section (Edit Mode Only) */}
      {!isViewMode && (
        <div className="border rounded-lg p-4 bg-muted/30">
          <AppText variant="subheading" className="mb-3">
            Add Product
          </AppText>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <AppSingleSelectAutoComplete
                label="Select Product"
                placeholder="Choose a product to add"
                searchPlaceholder="Search products..."
                size="sm"
                items={productItems}
                value={selectedProductId}
                defaultValue={selectedProductId}
                onValueChange={setSelectedProductId}
                fullWidth
              />
            </div>
            <div className="w-32">
              <AppInput
                label="Quantity"
                placeholder="Qty"
                type="number"
                value={quantity ?? ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                fullWidth
                size="sm"
              />
            </div>
            <AppButton
              onClick={handleAddProduct}
              variant="default"
              size="sm"
              className="flex items-center gap-2"
              disabled={
                !selectedProductId || !quantity || quantity <= 0 || isAdding
              }
            >
              <Plus className="h-4 w-4" />
              {isAdding ? "Adding..." : "Add"}
            </AppButton>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-3">
        {orderProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
            <Package className="h-12 w-12 text-muted-foreground mb-3" />
            <AppText variant="body" className="text-muted-foreground">
              No products in this order
            </AppText>
          </div>
        ) : (
          orderProducts.map((item) => {
            const displayQuantity =
              mode === "edit"
                ? (editingQuantities[item.order_details_id] ??
                  item.required_quantity)
                : item.required_quantity;
            const itemTotal = item.product.selling_price * displayQuantity;

            return (
              <div
                key={item.order_details_id}
                className={cn(
                  "border rounded-lg p-4 transition-all",
                  !isViewMode && "hover:shadow-md",
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
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
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <AppText variant="subheading" size="text-base">
                          {item.product.product_name}
                        </AppText>
                        <AppText
                          variant="caption"
                          size="text-xs"
                          className="mt-1"
                        >
                          Category: {item.product.product_category}
                        </AppText>
                      </div>
                      <div className="text-right">
                        <AppText
                          variant="body"
                          size="text-sm"
                          className="font-semibold"
                        >
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
                        className="mb-3 line-clamp-2"
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
                              value={displayQuantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.order_details_id,
                                  Number(e.target.value),
                                )
                              }
                              size="sm"
                              className="w-24"
                              min={1}
                            />
                          </>
                        )}
                        <AppText
                          variant="body"
                          size="text-sm"
                          className="font-semibold ml-2"
                        >
                          Subtotal: Rs. {itemTotal.toFixed(2)}
                        </AppText>
                      </div>

                      {!isViewMode && (
                        <AppButton
                          onClick={() =>
                            handleRemoveProduct(
                              item.order_details_id,
                              item.product.product_name,
                            )
                          }
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
                          disabled={isRemoving}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </AppButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Total Summary */}
      {orderProducts.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-end items-center gap-4">
            <AppText variant="subheading" size="text-lg">
              Total Amount:
            </AppText>
            <AppText variant="heading" size="text-lg" className="text-primary">
              Rs. {totalAmount.toFixed(2)}
            </AppText>
          </div>
        </div>
      )}
    </div>
  );
};
