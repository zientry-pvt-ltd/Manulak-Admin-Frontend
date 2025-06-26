import { Bell, Settings, User } from "lucide-react";

import AppIcon from "@/components/ui/app-icon";

const iconVariants = [
  { label: "Small", size: "sm" as const },
  { label: "Medium", size: "md" as const },
  { label: "Large", size: "lg" as const },
];

const AppIconShowcase = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AppIcon Variants</h2>

      <div className="space-y-4">
        {iconVariants.map(({ label, size }) => (
          <div key={size}>
            <h3 className="font-medium">{label}</h3>
            <div className="flex items-center gap-4">
              <AppIcon Icon={Settings} size={size} />
              <AppIcon Icon={User} size={size} />
              <AppIcon Icon={Bell} size={size} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppIconShowcase;
