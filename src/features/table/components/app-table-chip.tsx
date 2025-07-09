// components/ui/Chip.tsx
import React from "react";

export type ChipVariant = {
  label: string;
  color: string;
};

interface ChipProps {
  value: string | number;
  variantMap: Record<string | number, ChipVariant>;
  className?: string;
}

const AppTableChip: React.FC<ChipProps> = ({
  value,
  variantMap,
  className = "",
}) => {
  const variant = variantMap[value];

  if (!variant) {
    return (
      <span
        className={`inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500 ${className}`}
      >
        {String(value)}
      </span>
    );
  }

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs rounded-full ${variant.color} ${className}`}
    >
      {variant.label}
    </span>
  );
};

export default AppTableChip;
