import { useMemo, useState } from "react";

import { AppSelect, AppText, Card } from "@/components";
import { Progress } from "@/components/ui/progress";
import { DASHBOARD_VIEW_DAYS_OPTIONS } from "@/features/dashboard/constants";
import type { DashboardViewDays } from "@/features/dashboard/types/stock.type";
import { useGetMostSoldItemByTimePeriodQuery } from "@/services/dashboard";

export const MostSoldItems = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7");

  const {
    data: mostSoldItemData,
    isError: isErrorMostSoldItem,
    isFetching: isLoadingMostSoldItem,
  } = useGetMostSoldItemByTimePeriodQuery({
    dashboard_view_days: Number(selectedPeriod) as DashboardViewDays,
  });

  const mostSoldItem = useMemo(
    () => mostSoldItemData?.data ?? [],
    [mostSoldItemData],
  );

  return (
    <Card className="w-xs rounded-lg shadow-none gap-4">
      {/* Header with filter */}
      <div className="flex px-4 justify-between items-center">
        <AppText variant="subheading" size="text-sm">
          Most sold items
        </AppText>

        <AppSelect
          size="sm"
          className="flex w-[120px] min-w-0"
          value={selectedPeriod}
          onValueChange={(val) => setSelectedPeriod(val)}
          items={DASHBOARD_VIEW_DAYS_OPTIONS}
        />
      </div>

      {/* Content */}
      <div className="space-y-4 max-h-64 overflow-y-auto px-4 pb-2">
        {isLoadingMostSoldItem && (
          <div className="flex justify-center py-8">
            <AppText variant="caption" size="text-xs" color="muted">
              Loading...
            </AppText>
          </div>
        )}

        {isErrorMostSoldItem && (
          <div className="flex justify-center py-8">
            <AppText variant="caption" size="text-xs" color="destructive">
              Failed to load data. Please try again later.
            </AppText>
          </div>
        )}

        {!isLoadingMostSoldItem &&
          !isErrorMostSoldItem &&
          mostSoldItem.length === 0 && (
            <div className="flex justify-center py-8">
              <AppText variant="caption" size="text-xs" color="muted">
                No data available.
              </AppText>
            </div>
          )}

        {!isLoadingMostSoldItem &&
          !isErrorMostSoldItem &&
          mostSoldItem.length > 0 &&
          mostSoldItem.map((item) => (
            <div key={item.product_name} className="space-y-1">
              <div className="flex justify-between">
                <AppText variant="caption" size="text-xs">
                  {item.product_name}
                </AppText>
                <AppText variant="caption" size="text-xs">
                  {item.selling_efficiency.toFixed(1)}%
                </AppText>
              </div>
              <Progress
                value={item.selling_efficiency}
                className="w-full h-3"
              />
            </div>
          ))}
      </div>
    </Card>
  );
};
