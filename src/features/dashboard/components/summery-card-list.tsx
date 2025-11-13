import { useMemo } from "react";

import { AppText, Card } from "@/components";
import {
  useGetProfitByTimePeriodQuery,
  useGetTotalRevenueByTimePeriodQuery,
  useGetTotalSalesByTimePeriodQuery,
} from "@/services/dashboard";

export const SummeryCardList = () => {
  const {
    data: totalSalesData,
    isError: isErrorSales,
    isLoading: isLoadingSales,
  } = useGetTotalSalesByTimePeriodQuery({
    dashboard_view_days: 1,
  });

  const {
    data: totalRevenueData,
    isError: isErrorRevenue,
    isLoading: isLoadingRevenue,
  } = useGetTotalRevenueByTimePeriodQuery({
    dashboard_view_days: 1,
  });

  const {
    data: profitData,
    isError: isErrorProfit,
    isLoading: isLoadingProfit,
  } = useGetProfitByTimePeriodQuery({
    dashboard_view_days: 1,
  });

  const totalSales = useMemo(() => totalSalesData?.data ?? 0, [totalSalesData]);
  const totalRevenue = useMemo(
    () => totalRevenueData?.data ?? 0,
    [totalRevenueData],
  );
  const profit = useMemo(() => profitData?.data ?? 0, [profitData?.data]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex flex-col space-y-2">
      {/* Today's Sales */}
      <Card className="min-w-[240px] h-28 shadow-none justify-center flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Today's Sales
          </AppText>
          <AppText variant="caption" size="text-sm">
            {formattedDate}
          </AppText>
        </div>

        {isLoadingSales ? (
          <AppText variant="caption" size="text-xs" color="muted">
            Loading...
          </AppText>
        ) : isErrorSales ? (
          <AppText variant="caption" size="text-xs" color="destructive">
            Failed to load sales data
          </AppText>
        ) : (
          <>
            <AppText variant="subheading">
              Rs: {totalSales.toLocaleString()}
            </AppText>
            <AppText variant="caption" size="text-xs">
              A summary of today's sales performance.
            </AppText>
          </>
        )}
      </Card>

      {/* Today's Revenue */}
      <Card className="min-w-[240px] h-28 shadow-none justify-center flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Today's Revenue
          </AppText>
          <AppText variant="caption" size="text-sm">
            {formattedDate}
          </AppText>
        </div>

        {isLoadingRevenue ? (
          <AppText variant="caption" size="text-xs" color="muted">
            Loading...
          </AppText>
        ) : isErrorRevenue ? (
          <AppText variant="caption" size="text-xs" color="destructive">
            Failed to load revenue data
          </AppText>
        ) : (
          <>
            <AppText variant="subheading">
              Rs: {totalRevenue.toLocaleString()}
            </AppText>
            <AppText variant="caption" size="text-xs">
              Total revenue generated today.
            </AppText>
          </>
        )}
      </Card>

      {/* Today's Profit */}
      <Card className="min-w-[240px] h-28 shadow-none justify-center flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Today's Profit
          </AppText>
          <AppText variant="caption" size="text-sm">
            {formattedDate}
          </AppText>
        </div>

        {isLoadingProfit ? (
          <AppText variant="caption" size="text-xs" color="muted">
            Loading...
          </AppText>
        ) : isErrorProfit ? (
          <AppText variant="caption" size="text-xs" color="destructive">
            Failed to load profit data
          </AppText>
        ) : (
          <>
            <AppText variant="subheading">
              Rs: {profit.toLocaleString()}
            </AppText>
            <AppText variant="caption" size="text-xs">
              Net profit earned today.
            </AppText>
          </>
        )}
      </Card>
    </div>
  );
};
