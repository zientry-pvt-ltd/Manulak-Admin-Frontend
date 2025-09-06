import { AppTabs, type TabItem } from "@/components/ui/app-tabs";
import { ViewProducts } from "@/features/products/components/view-products";

const items: TabItem[] = [
  {
    value: "view-products",
    label: "Products List",
    content: <ViewProducts />,
  },
];
export const ProductsTabs = () => {
  return <AppTabs items={items} defaultValue="view-products" />;
};
