import { AppTabs, type TabItem } from "@/components/ui/app-tabs";
import { ViewOrdersTab } from "@/features/orders/components/view-orders-tab";

const items: TabItem[] = [
  {
    value: "all-orders",
    label: "All Orders",
    content: <ViewOrdersTab />,
  },
];

export const OrderTabs = () => {
  return <AppTabs items={items} defaultValue="all-orders" />;
};
