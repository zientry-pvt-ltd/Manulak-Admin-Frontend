import { AppRouter } from "@/app/router";
import { useDynamicFavicon } from "@/hooks/use-dynamic-favicon";

export const App = () => {
  useDynamicFavicon();
  return <AppRouter />;
};
