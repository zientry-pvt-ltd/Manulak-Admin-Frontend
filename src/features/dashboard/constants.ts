export const DASHBOARD_VIEW_DAYS_OPTIONS = [
  { label: "Last 1 day", value: "1" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 1 month", value: "30" },
  { label: "Last 3 months", value: "90" },
];

export const DEFAULT_DASHBOARD_VIEW_DAYS = {
  sales: 1,
  revenue: 1,
  profit: 1,
} as const;
