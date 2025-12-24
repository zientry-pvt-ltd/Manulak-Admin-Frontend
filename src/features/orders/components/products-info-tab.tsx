import { Package } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppButton, AppInput, AppText } from "@/components";
import AppSingleSelectAutoComplete, {
  type SingleSelectOption,
} from "@/components/ui/app-single-select-autocomplete";
import { ProductCard } from "@/features/orders/components/product-info-card";
import type { IProductInfo } from "@/features/products/types/product.type";
import { useDebounce } from "@/hooks/use-debounce";
import {
  useCalculateOrderValueMutation,
  useCreateOrderItemMutation,
  useGetOrderMetadataQuery,
  useGetOrderProductsQuery,
} from "@/services/orders";
import { useSearchProductsMutation } from "@/services/product";
import { selectOrder } from "@/store/selectors/orderSelector";
import { useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";
import { formatCurrencyInput } from "@/utils/Formatting";

type ProductsInfoTabProps = {
  mode: "view" | "edit";
};

export const ProductsInfoTab = ({ mode }: ProductsInfoTabProps) => {
  const { selectedOrderId } = useAppSelector(selectOrder);

  const [
    calculateOrderValue,
    {
      data: calculateOrderValueData,
      isLoading: isCalculatingOrderValue,
      isError: isCalculateOrderValueError,
    },
  ] = useCalculateOrderValueMutation();
  const {
    data: orderMetadata,
    isLoading: isLoadingMetadata,
    error: metadataError,
  } = useGetOrderMetadataQuery(selectedOrderId, {
    skip: !selectedOrderId,
  });

  const [searchProducts] = useSearchProductsMutation();
  const [addOrderProduct, { isLoading: isAdding }] =
    useCreateOrderItemMutation();

  const shouldSkip = useMemo(
    () => ({ skip: !selectedOrderId }),
    [selectedOrderId],
  );

  const { data, isLoading, isError } = useGetOrderProductsQuery(
    selectedOrderId,
    shouldSkip,
  );

  const isViewMode = useMemo(() => mode === "view", [mode]);
  const orderProducts = useMemo(() => data?.data || [], [data]);

  const debouncedOrderProducts = useDebounce(orderProducts, 500);

  const [quantity, setQuantity] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [availableQuantity, setAvailableQuantity] = useState<number | null>(
    null,
  );

  const isAlreadyAdded = useCallback(
    (productId: string) => {
      return orderProducts.some((item) => item.product_id === productId);
    },
    [orderProducts],
  );

  const calculateTotalPrice = useCallback(
    async ({
      productId,
      newQuantity,
    }: {
      productId?: string;
      newQuantity?: number;
    }) => {
      if (isLoadingMetadata)
        return toast.warning("Order metadata is still loading");
      if (metadataError)
        return toast.error(
          "Cannot calculate total price due to metadata error",
        );
      if (!orderMetadata?.data.payment_method)
        return toast.error("Payment method not set");

      try {
        await calculateOrderValue({
          orderItemsArray: orderProducts.map((item) => ({
            product_id: item.product_id,
            required_quantity:
              item.product_id === productId
                ? (newQuantity as number)
                : item.required_quantity,
          })),
          paymentMethod: orderMetadata.data.payment_method,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [
      calculateOrderValue,
      isLoadingMetadata,
      metadataError,
      orderMetadata,
      orderProducts,
    ],
  );

  useEffect(() => {
    if (debouncedOrderProducts.length > 0) {
      calculateTotalPrice({});
    }
  }, [debouncedOrderProducts, calculateTotalPrice]);

  const handleAddProduct = useCallback(async () => {
    if (!selectedProductId || !selectedOrderId || !quantity || quantity <= 0) {
      toast.error("Please select a product and enter a valid quantity");
      return;
    }

    const data = {
      product_id: selectedProductId,
      required_quantity: quantity,
    };

    try {
      await addOrderProduct({
        orderId: selectedOrderId,
        data,
      }).unwrap();

      toast.success("Product added to order");

      setSelectedProductId(null);
      setQuantity(null);
    } catch (error) {
      const message = normalizeError(error);
      toast.error(`Failed to add product: ${message.message}`);
      console.error("Add product failed:", error);
    }
  }, [selectedProductId, selectedOrderId, quantity, addOrderProduct]);

  const handleProductSelect = useCallback(
    (value: string, item: SingleSelectOption | undefined) => {
      if (item && item.meta && item.meta.product) {
        const availableQuantity = item.meta.product as IProductInfo;
        setAvailableQuantity(availableQuantity.quantity);
      }
      setSelectedProductId(value);
    },
    [],
  );

  const handleNewItemQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!availableQuantity) return;
      const value = Number(e.target.value);
      if (value > availableQuantity) {
        toast.error(`Only ${availableQuantity} units available in stock`);
        setQuantity(availableQuantity);
      } else {
        setQuantity(value);
      }
    },
    [availableQuantity],
  );

  const handleSearch = useCallback(
    async (query: string) => {
      try {
        const { data } = await searchProducts(query).unwrap();

        return data.map((product) => ({
          label: product.product_name,
          value: product.id,
          isDisabled: product.quantity <= 0 || isAlreadyAdded(product.id),
          subLabel: `In Stock: ${product.quantity}`,
          meta: {
            product,
          },
        }));
      } catch (error) {
        const message = normalizeError(error);
        console.error("Search error:", message);
        return [];
      }
    },
    [isAlreadyAdded, searchProducts],
  );

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
        <AppText variant="body">Loading products...</AppText>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center p-8">
        <AppText variant="body" color="destructive">
          Failed to load order products
        </AppText>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-2">
      <AppText variant="caption" size="text-sm">
        {calculateOrderValueData?.data.totalValue.toFixed(2) &&
          `Total Order Value with Courier Charges: Rs ${formatCurrencyInput(
            calculateOrderValueData?.data.totalValue.toString() || "0",
          )}`}
        {isCalculatingOrderValue && "Calculating..."}
      </AppText>

      <AppText variant="caption" size="text-sm" color="destructive">
        {isCalculateOrderValueError && " Failed to calculate"}
      </AppText>

      {!isViewMode && (
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="flex gap-3 items-end">
            <AppSingleSelectAutoComplete
              size="sm"
              fullWidth
              isServerSide
              debounceMs={300}
              minSearchLength={2}
              label="Select Product"
              onSearch={handleSearch}
              placeholder="Choose a product"
              value={selectedProductId ?? ""}
              onValueChange={handleProductSelect}
              searchPlaceholder="Search products..."
            />
            <AppInput
              label="Quantity"
              placeholder="Enter quantity"
              type="number"
              value={quantity ?? ""}
              disabled={!selectedProductId}
              onChange={handleNewItemQuantityChange}
              fullWidth
              size="sm"
              onInput={(e) => {
                const input = e.currentTarget;
                input.value = input.value.replace(/[a-zA-Z-]/g, "");
              }}
            />

            <AppButton
              size="sm"
              onClick={handleAddProduct}
              disabled={isAdding || !selectedProductId || !quantity}
              className="min-w-24"
            >
              {`${isAdding ? "Adding..." : "Add Product"}`}
            </AppButton>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-3">
        {orderProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
            <Package className="h-12 w-12 text-muted-foreground mb-3" />
            <AppText variant="body" className="text-muted-foreground">
              No products in this order
            </AppText>
          </div>
        ) : (
          orderProducts.map((item) => {
            const itemTotal =
              item.product.selling_price * item.required_quantity;
            const displayQuantity = item.required_quantity;
            const isLastProductItem = orderProducts.length === 1;

            return (
              <ProductCard
                key={item.order_details_id}
                item={item}
                itemTotal={itemTotal}
                itemAvailableQuantity={item.product.quantity}
                displayQuantity={displayQuantity}
                isViewMode={isViewMode}
                isLastProductItem={isLastProductItem}
                onQuantityChange={calculateTotalPrice}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
