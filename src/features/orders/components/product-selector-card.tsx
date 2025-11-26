import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import { AppButton, AppInput, AppText } from "@/components";
import AppSingleSelectAutoComplete, {
  type SingleSelectOption,
} from "@/components/ui/app-single-select-autocomplete";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FormFieldValues } from "@/features/orders/components/online-order-placement-form";
import {
  addProductToList,
  removeProductFromList,
} from "@/features/orders/store/order-form-slice";
import type { IProductInfo } from "@/features/products/types/product.type";
import { cn } from "@/lib/utils";
import { useCalculateOrderValueMutation } from "@/services/orders";
import { useSearchProductsMutation } from "@/services/product";
import { selectOrderForm } from "@/store/selectors/orderFormSelector";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

function ProductSelectorCard() {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<FormFieldValues>();
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(selectOrderForm).selectedProducts;

  const [searchProducts] = useSearchProductsMutation();
  const [
    calculateOrderValue,
    { isLoading: isCalculatingOrderValue, isError: isCalculateOrderValueError },
  ] = useCalculateOrderValueMutation();

  const [quantity, setQuantity] = useState<number | undefined>();
  const [pickedProduct, setPickedProduct] = useState<IProductInfo | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>();

  const setOrderValue = (subtotal: number) => {
    setValue("orderMetaData.order_value", subtotal, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleAddProduct = async () => {
    if (!selectedProductId || !quantity || quantity <= 0) return;
    if (!pickedProduct) return;

    try {
      const orderItemsArray = [
        ...getValues().orderItemsData,
        { product_id: pickedProduct.id, required_quantity: quantity },
      ];

      const { data: totalResult } = await calculateOrderValue({
        orderItemsArray,
      }).unwrap();

      setOrderValue(totalResult.totalValue);

      setValue("orderItemsData", orderItemsArray, {
        shouldValidate: true,
        shouldDirty: true,
      });
      dispatch(
        addProductToList({
          productId: pickedProduct.id,
          productName: pickedProduct.product_name,
          productPrice: pickedProduct.selling_price,
          quantity,
          availableQuantity: pickedProduct.quantity,
        }),
      );
    } catch (error) {
      setOrderValue(0);
      console.log(error);
    }

    setSelectedProductId(null);
    setQuantity(undefined);
    setPickedProduct(null);
  };

  const handleRemoveProduct = async (productId: string) => {
    const orderItemsArray = getValues().orderItemsData.filter(
      (item) => item.product_id !== productId,
    );
    dispatch(removeProductFromList(productId));

    try {
      const { data: totalResult } = await calculateOrderValue({
        orderItemsArray,
      }).unwrap();

      setOrderValue(totalResult.totalValue);

      setValue("orderItemsData", orderItemsArray, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      setOrderValue(0);
      console.log(error);
    }
  };

  const handleProductSelect = (
    value: string,
    item: SingleSelectOption | undefined,
  ) => {
    if (item && item.meta && item.meta.product) {
      const availableQuantity = item.meta.product as IProductInfo;
      setPickedProduct(availableQuantity);
    }
    setSelectedProductId(value);
  };

  const handleSearch = useCallback(
    async (query: string) => {
      try {
        const { data } = await searchProducts(query).unwrap();

        return data.map((product) => ({
          label: product.product_name,
          value: product.id,
          isDisabled: product.quantity <= 0,
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
    [searchProducts],
  );

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      if (
        pickedProduct?.quantity !== undefined &&
        !isNaN(Number(pickedProduct?.quantity)) &&
        val > Number(pickedProduct?.quantity)
      ) {
        setQuantity(Number(pickedProduct?.quantity));
      } else {
        setQuantity(val);
      }
    },
    [pickedProduct?.quantity],
  );

  return (
    <div className="flex flex-row justify-center gap-x-4">
      {/* LEFT: Selection Form */}
      <div className="flex flex-col mt-2 w-1/2 space-y-3">
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

        <div className="flex flex-row gap-x-2 items-end">
          <AppInput
            label="Quantity"
            placeholder="Enter quantity"
            value={quantity ?? ""}
            onChange={handleQuantityChange}
            disabled={!pickedProduct}
            fullWidth
            size="sm"
            onInput={(e) => {
              const input = e.currentTarget;
              input.value = input.value.replace(/[a-zA-Z-]/g, "");
            }}
          />
          <AppButton
            onClick={handleAddProduct}
            variant="outline"
            size="sm"
            className="rounded-md flex items-center gap-x-1"
            type="button"
            disabled={
              !selectedProductId ||
              !quantity ||
              quantity <= 0 ||
              (pickedProduct?.quantity !== undefined &&
                !isNaN(Number(pickedProduct?.quantity)) &&
                quantity > Number(pickedProduct?.quantity))
            }
          >
            Add
          </AppButton>
        </div>
      </div>

      {/* RIGHT: Selected Products List */}
      <div className="flex flex-col w-1/2">
        <AppText variant="caption" size="text-xs" className="mb-2">
          Selected Products{" "}
          {!isCalculateOrderValueError &&
            !isCalculatingOrderValue &&
            getValues().orderMetaData.order_value > 0 &&
            getValues().orderItemsData.length > 0 &&
            `(Total with Courier Charges Rs:${getValues().orderMetaData.order_value.toFixed(2)})`}
          {/*  */}
          {isCalculateOrderValueError && (
            <AppText size="text-xs" color="destructive">
              - Error calculating order value.
            </AppText>
          )}
          {/*  */}
          {isCalculatingOrderValue && "- Calculating..."}
        </AppText>
        <div
          className={cn(
            "flex flex-wrap gap-2 border rounded-md p-2 min-h-[42px] h-full",
            errors.orderItemsData?.message
              ? "border-destructive"
              : "border-border",
          )}
        >
          {errors.orderItemsData?.message && (
            <AppText size="text-xs" color="destructive">
              {errors.orderItemsData?.message.toString()}
            </AppText>
          )}

          {selectedProducts.list.length === 0 &&
            !errors.orderItemsData?.message && (
              <AppText
                variant="caption"
                size="text-xs"
                className="text-muted-foreground"
              >
                No products selected.
              </AppText>
            )}

          {selectedProducts.list.length > 0 &&
            selectedProducts.list.map((product) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    key={product.productId}
                    className={
                      "relative flex h-7 cursor-default items-center gap-x-1 rounded-sm border border-border px-2 py-1.5"
                    }
                  >
                    <AppText
                      variant="caption"
                      size="text-xs"
                      className="truncate max-w-[150px]"
                    >
                      {product.productName}
                    </AppText>

                    <AppText
                      variant="caption"
                      size="text-xs"
                      className="bg-ring px-2 h-6 aspect-square rounded-full text-primary flex justify-center items-center"
                    >
                      {product.quantity}
                    </AppText>

                    <button
                      onClick={() => handleRemoveProduct(product.productId)}
                      className="absolute -top-1.5 -right-1.5 rounded-full p-0.5 bg-primary-foreground border text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label={`Remove ${product.productName}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{product.productName}</TooltipContent>
              </Tooltip>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSelectorCard;
