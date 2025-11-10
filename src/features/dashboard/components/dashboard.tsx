import {
  MostSoldItems,
  SummeryCardList,
  TotalChartRevenue,
} from "@/features/dashboard";

export const Dashboard = () => {
  return (
    <div className="space-y-1 pt-1">
      <SummeryCardList />
      <div className="flex">
        <TotalChartRevenue />
        <MostSoldItems />
      </div>
    </div>
  );
};
