export const APP_TABLE_SLICE = {
  NAME: "appTable",
} as const;

// constants/chipVariants.ts

export const STATUS_CHIPS = {
  active: { label: "Active", color: "bg-green-100 text-green-800" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-600" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  on_deck: { label: "On Deck", color: "bg-purple-100 text-purple-800" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  testing: { label: "Testing", color: "bg-orange-100 text-orange-800" },
  deployed: { label: "Deployed", color: "bg-emerald-100 text-emerald-800" },
};

export const PRIORITY_CHIPS = {
  high: { label: "High", color: "bg-red-100 text-red-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  low: { label: "Low", color: "bg-gray-100 text-gray-600" },
};
