import { useMemo } from "react";
import { useLocation } from "react-router";

import { paths } from "@/config/paths";

export const routeMetadata: { path: string; label: string }[] = [
  { path: paths.app.root.getHref(), label: "Home" },
  { path: paths.app.dashboard.getHref(), label: "Dashboard" },
  { path: paths.app.products.getHref(), label: "Products" },
  { path: paths.app.stocks.getHref(), label: "Stocks" },
  { path: paths.app.sales.getHref(), label: "Sales" },
  { path: paths.app.billCalculation.getHref(), label: "Bill Calculation" },
  { path: paths.app.settings.getHref(), label: "Settings" },
  { path: paths.app.discussions.getHref(), label: "Discussions" },
];

export const useCurrentPageName = (): string => {
  const location = useLocation();

  return useMemo(() => {
    const currentPath = location.pathname;

    const matched = routeMetadata
      .sort((a, b) => b.path.length - a.path.length)
      .find(({ path }) => currentPath.startsWith(path));

    return matched?.label || "Unknown Page";
  }, [location]);
};

export default useCurrentPageName;
