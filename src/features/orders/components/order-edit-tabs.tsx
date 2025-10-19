import { AppTabs, type TabItem } from "@/components/ui/app-tabs";
import { OrderDetailsTab } from "@/features/orders/components/order-details-tab";
import { PaymentInfoTab } from "@/features/orders/components/payment-info-tab";
import { ProductsInfoTab } from "@/features/orders/components/products-info-tab";

const items: TabItem[] = [
  {
    label: "Order Details",
    value: "order-details",
    content: (
      <OrderDetailsTab
        mode="edit"
        orderId="b4046891-6b17-40cf-aa0d-75c8c5bbbd27"
      />
    ),
  },
  {
    label: "Product Info",
    value: "product-info",
    content: (
      <ProductsInfoTab
        mode="view"
        orderId="b4046891-6b17-40cf-aa0d-75c8c5bbbd27"
      />
    ),
  },
  {
    label: "Payment Info",
    value: "payment-info",
    content: <PaymentInfoTab />,
  },
];
export const OrderEditTabs = () => {
  return (
    <AppTabs
      items={items}
      defaultValue="order-details"
      className="min-w-[80vw] min-h-[80vh]"
    />
  );
};
