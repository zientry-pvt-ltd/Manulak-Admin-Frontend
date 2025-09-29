import { AppText } from "@/components";
import { useGetStockNetWorthQuery } from "@/services/stock";

export const ExistingStockIndicator = () => {
  const { data: stockNetWorth, isError, refetch } = useGetStockNetWorthQuery();

  return (
    <div>
      {isError || !stockNetWorth ? (
        <div className="flex items-center space-x-1">
          <AppText variant="caption" className="text-destructive">
            Error loading stock net worth.{" "}
          </AppText>

          <AppText
            onClick={refetch}
            variant="caption"
            className="text-destructive underline cursor-pointer"
          >
            Retry
          </AppText>
        </div>
      ) : (
        <AppText variant="caption">
          Existing stock net worth Rs. {stockNetWorth.net_worth.toFixed(2)}
        </AppText>
      )}
    </div>
  );
};
