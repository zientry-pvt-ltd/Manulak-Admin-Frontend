import {
  LatestOrderTable,
  MostSoldItems,
  SummeryCardList,
  TotalChartRevenue,
} from "@/features/dashboard";

export const Dashboard = () => {
  return (
    <div className="space-y-2 py-2">
      <div className="flex space-x-2">
        <LatestOrderTable />
        <div className="flex flex-col space-y-2">
          <SummeryCardList />
          <MostSoldItems />
        </div>
      </div>
      <TotalChartRevenue />
    </div>
  );
};
