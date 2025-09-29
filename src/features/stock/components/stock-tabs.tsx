import { AppTabs, type TabItem } from "@/components/ui/app-tabs";
import { ViewStock } from "@/features/stock/components/view-stock";

const items: TabItem[] = [
  {
    value: "view-stock",
    label: "Stock List",
    content: <ViewStock />,
  },
];
export const StockTabs = () => {
  return <AppTabs items={items} defaultValue="view-stock" />;
};
