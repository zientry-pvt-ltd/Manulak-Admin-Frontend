import { useEffect } from "react";

import { AppTabs, type TabItem } from "@/components/ui/app-tabs";
import { OrderDetailsTab } from "@/features/orders/components/order-details-tab";
import { PaymentInfoTab } from "@/features/orders/components/payment-info-tab";
import { ProductsInfoTab } from "@/features/orders/components/products-info-tab";
import { setSelectedOrderId } from "@/features/orders/store/order-slice";
import { useAppDispatch } from "@/store/utils";

const getItems = (mode: "edit" | "view"): TabItem[] => [
  {
    label: "Order Details",
    value: "order-details",
    content: <OrderDetailsTab mode={mode} />,
  },
  {
    label: "Product Info",
    value: "product-info",
    content: <ProductsInfoTab mode={mode} />,
  },
  {
    label: "Payment Info",
    value: "payment-info",
    content: <PaymentInfoTab mode={mode} />,
  },
];

type OrderEditTabsProps = {
  mode: "edit" | "view";
};

export const OrderEditViewTabs = ({ mode }: OrderEditTabsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSelectedOrderId(null));
    };
  }, [dispatch]);

  return (
    <AppTabs
      items={getItems(mode)}
      defaultValue={getItems(mode)[0].value}
      className="min-w-[80vw] min-h-[79vh]"
    />
  );
};
