import { AppText } from "@/components";
import { useGetStockNetWorthQuery } from "@/services/stock";

export const ExistingStockIndicator = () => {
  const { data, isError, isLoading, refetch, isFetching } =
    useGetStockNetWorthQuery();

  const stockNetWorth = data?.data;

  return (
    <div className="flex items-center space-x-3">
      {/* Status Display */}
      <div className="flex items-center space-x-2 w-[240px]">
        {isLoading || isFetching ? (
          <AppText variant="caption" color="muted">
            Loading existing stock net worth...
          </AppText>
        ) : isError ? (
          <AppText variant="caption" color="destructive">
            Error loading stock net worth.
          </AppText>
        ) : !stockNetWorth ? (
          <AppText variant="caption" color="muted">
            No stock data available.
          </AppText>
        ) : (
          <AppText variant="caption">
            Existing stock net worth Rs. {stockNetWorth.toFixed(2)}
          </AppText>
        )}
      </div>

      <AppText
        onClick={refetch}
        variant="caption"
        className="underline cursor-pointer"
        color={isError ? "destructive" : "muted"}
        role="button"
      >
        Refresh
      </AppText>
    </div>
  );
};
