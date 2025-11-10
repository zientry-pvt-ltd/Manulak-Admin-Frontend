import { AppText, Card } from "@/components";

export const SummeryCardList = () => {
  return (
    <div className="flex space-x-2 py-1">
      {/* today's sales  */}
      <Card className="w-[240px] shadow-none flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Today's Sales
          </AppText>
          <AppText variant="caption" size="text-sm">
            28 june 2025
          </AppText>
        </div>
        <AppText variant="subheading">RS: 200,000.00</AppText>
        <AppText variant="caption" size="text-xs">
          We have sold 30 orders
        </AppText>
      </Card>

      {/* Today's revenue */}
      <Card className="w-[240px] shadow-none flex flex-col gap-2 p-4 rounded-lg">
        <AppText variant="caption" size="text-sm">
          Today's Revenue
        </AppText>
        <AppText variant="subheading">Rs: 170,000.00</AppText>
        <AppText variant="caption" size="text-xs">
          We have completed 20 sales
        </AppText>
      </Card>

      {/* Existing Customers */}
      <Card className="w-[280px] shadow-none flex flex-col gap-2 p-4 rounded-lg">
        <AppText variant="caption" size="text-sm">
          Existing stock net worth (as of today)
        </AppText>
        <AppText variant="subheading">Rs: 100,000.00</AppText>
        <AppText variant="caption" size="text-xs">
          Total selling price of current stock
        </AppText>
      </Card>
    </div>
  );
};
