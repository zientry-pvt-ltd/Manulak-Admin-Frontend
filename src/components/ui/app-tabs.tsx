import AppText from "@/components/ui/app-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

interface AppTabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
  contentHeight?: string | number;
}

export function AppTabs({
  items,
  defaultValue,
  className,
  contentHeight = "calc(100vh - 3rem)",
}: AppTabsProps) {
  return (
    <Tabs
      defaultValue={defaultValue ?? items[0]?.value}
      className={`flex flex-col w-full h-full ${className ?? ""}`}
    >
      <div className="flex-shrink-0 bg-background sticky top-0 z-10">
        <TabsList>
          {items.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              <AppText variant="caption" size="text-xs">
                {item.label}
              </AppText>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ height: contentHeight }}>
        {items.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
