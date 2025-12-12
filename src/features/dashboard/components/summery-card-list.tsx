import { useMemo, useState } from "react";

import { AppSelect, AppText, Card } from "@/components";
import {
  DASHBOARD_VIEW_DAYS_OPTIONS,
  DEFAULT_DASHBOARD_VIEW_DAYS,
} from "@/features/dashboard/constants";
import type {
  DashboardViewDays,
  PeriodsState,
} from "@/features/dashboard/types/stock.type";
import {
  useGetProfitByTimePeriodQuery,
  useGetTotalRevenueByTimePeriodQuery,
  useGetTotalSalesByTimePeriodQuery,
} from "@/services/dashboard";
import { formatCurrencyInput } from "@/utils/Formatting";

export const SummeryCardList = () => {
  const [periods, setPeriods] = useState<PeriodsState>(
    DEFAULT_DASHBOARD_VIEW_DAYS,
  );
  const {
    data: totalSalesData,
    isError: isErrorSales,
    isFetching: isLoadingSales,
  } = useGetTotalSalesByTimePeriodQuery({
    dashboard_view_days: periods.sales,
  });

  const {
    data: totalRevenueData,
    isError: isErrorRevenue,
    isFetching: isLoadingRevenue,
  } = useGetTotalRevenueByTimePeriodQuery({
    dashboard_view_days: periods.revenue,
  });

  const {
    data: profitData,
    isError: isErrorProfit,
    isFetching: isLoadingProfit,
  } = useGetProfitByTimePeriodQuery({
    dashboard_view_days: periods.profit,
  });

  const totalSales = useMemo(() => totalSalesData?.data ?? 0, [totalSalesData]);
  const totalRevenue = useMemo(
    () => totalRevenueData?.data ?? 0,
    [totalRevenueData],
  );
  const profit = useMemo(() => profitData?.data ?? 0, [profitData?.data]);

  return (
    <div className="flex flex-col space-y-2">
      {/* Sales */}
      <Card className="min-w-[240px] h-32 shadow-none justify-center flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex h-full justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Sales
          </AppText>

          <AppSelect
            size="sm"
            className="flex w-[120px] min-w-0"
            value={periods.sales.toString()}
            items={DASHBOARD_VIEW_DAYS_OPTIONS}
            onValueChange={(val) =>
              setPeriods((prev) => ({
                ...prev,
                sales: Number(val) as DashboardViewDays,
              }))
            }
          />
        </div>

        {isLoadingSales ? (
          <AppText variant="caption" size="text-xs" color="muted">
            Loading...
          </AppText>
        ) : isErrorSales ? (
          <AppText variant="caption" size="text-xs" color="destructive">
            Failed to load sales data.
          </AppText>
        ) : (
          <>
            <AppText variant="subheading">
              Rs: {formatCurrencyInput(totalSales.toString())}
            </AppText>
            <AppText variant="caption" size="text-xs">
              A summary of sales performance.
            </AppText>
          </>
        )}
      </Card>

      {/* Revenue */}
      <Card className="min-w-[240px] h-32 shadow-none justify-center flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex h-full justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Revenue
          </AppText>
          <AppSelect
            size="sm"
            className="flex w-[120px] min-w-0"
            value={periods.revenue.toString()}
            items={DASHBOARD_VIEW_DAYS_OPTIONS}
            onValueChange={(val) =>
              setPeriods((prev) => ({
                ...prev,
                revenue: Number(val) as DashboardViewDays,
              }))
            }
          />
        </div>

        {isLoadingRevenue ? (
          <AppText variant="caption" size="text-xs" color="muted">
            Loading...
          </AppText>
        ) : isErrorRevenue ? (
          <AppText variant="caption" size="text-xs" color="destructive">
            Failed to load revenue data.
          </AppText>
        ) : (
          <>
            <AppText variant="subheading">
              Rs: {formatCurrencyInput(totalRevenue.toString())}
            </AppText>
            <AppText variant="caption" size="text-xs">
              Total revenue generated.
            </AppText>
          </>
        )}
      </Card>

      {/* Profit */}
      <Card className="min-w-[240px] h-32 shadow-none justify-center flex flex-col gap-2 p-4 rounded-lg">
        <div className="flex h-full justify-between w-full">
          <AppText variant="caption" size="text-sm">
            Profit
          </AppText>
          <AppSelect
            size="sm"
            className="flex w-[120px] min-w-0"
            value={periods.profit.toString()}
            items={DASHBOARD_VIEW_DAYS_OPTIONS}
            onValueChange={(val) =>
              setPeriods((prev) => ({
                ...prev,
                profit: Number(val) as DashboardViewDays,
              }))
            }
          />
        </div>

        {isLoadingProfit ? (
          <AppText variant="caption" size="text-xs" color="muted">
            Loading...
          </AppText>
        ) : isErrorProfit ? (
          <AppText variant="caption" size="text-xs" color="destructive">
            Failed to load profit data.
          </AppText>
        ) : (
          <>
            <AppText variant="subheading">
              Rs: {formatCurrencyInput(profit.toString())}
            </AppText>
            <AppText variant="caption" size="text-xs">
              Total profit earned.
            </AppText>
          </>
        )}
      </Card>
    </div>
  );
};
