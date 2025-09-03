import { AppTabs, type TabItem } from "@/components/ui/app-tabs";
import { AddProducts } from "@/features/products/components/add-products";
import { ViewProducts } from "@/features/products/components/view-products";

const items: TabItem[] = [
  {
    value: "view-products",
    label: "View Products",
    content: <ViewProducts />,
  },
  {
    value: "add-product",
    label: "Add Product",
    content: <AddProducts />,
  },
];
export const ProductsTabs = () => {
  return <AppTabs items={items} defaultValue="view-products" />;
};
