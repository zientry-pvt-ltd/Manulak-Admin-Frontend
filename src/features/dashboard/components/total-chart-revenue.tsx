import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { AppSelect } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { DashboardViewDays } from "@/features/dashboard/types/stock.type";
import { useGetTotalSalesBySellingMethodQuery } from "@/services/dashboard";

export const description = "An interactive area chart";

const chartConfig = {
  ONLINE: {
    label: "Online",
    color: "var(--chart-1)",
  },
  PLANT_NURSERY: {
    label: "Plant Nursery",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// Format large numbers for better readability
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `Rs.${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `Rs.${(value / 1000).toFixed(1)}K`;
  }
  return `Rs.${value.toFixed(0)}`;
};

export function TotalChartRevenue() {
  const [timeRange, setTimeRange] = useState<DashboardViewDays>(7);
  const { data: totalSalesBySellingMethod, isLoading } =
    useGetTotalSalesBySellingMethodQuery({ dashboard_view_days: timeRange });

  // Use API data if available, otherwise empty array
  const chartData = totalSalesBySellingMethod?.data || [];

  // Calculate total revenue for display
  const totalRevenue = chartData.reduce(
    (sum, item) => sum + (item.ONLINE || 0) + (item.PLANT_NURSERY || 0),
    0,
  );

  return (
    <Card className="pt-0 shadow-none">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Total revenue</CardTitle>
          <CardDescription>
            An overview of revenue for different products{" "}
            {formatCurrency(totalRevenue)}
          </CardDescription>
        </div>
        <AppSelect
          size="sm"
          value={timeRange.toString()}
          onValueChange={(value: string) =>
            setTimeRange(Number(value) as DashboardViewDays)
          }
          items={[
            {
              label: "Last 7 days",
              value: "7",
            },
            {
              label: "Last 30 days",
              value: "30",
            },
            {
              label: "Last 3 months",
              value: "90",
            },
          ]}
        />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading chart data...
            </p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-1)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillNursery" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickFormatter={formatCurrency}
                domain={[0, "auto"]}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                    formatter={(value) => formatCurrency(Number(value))}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="PLANT_NURSERY"
                type="natural"
                fill="url(#fillNursery)"
                stroke="var(--chart-2)"
                stackId="a"
              />
              <Area
                dataKey="ONLINE"
                type="natural"
                fill="url(#fillOnline)"
                stroke="var(--chart-1)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
