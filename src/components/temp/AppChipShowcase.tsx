import { Ban, CheckCircle, Info, Star } from "lucide-react";

import AppChip from "@/components/ui/app-chip"; // Adjust the import path as needed
import { cn } from "@/lib/utils";

const AppChipShowcase = () => {
  return (
    <div className={cn("flex flex-wrap gap-3")}>
      <AppChip size="sm" label="Outline" variant="outline" />
      <AppChip size="sm" label="Primary" variant="primary" icon={Star} />
      <AppChip size="sm" label="Secondary" variant="secondary" />
      <AppChip size="sm" label="Destructive" variant="destructive" icon={Ban} />
      <AppChip size="sm" label="Success" variant="success" icon={CheckCircle} />
      <AppChip size="sm" label="Info" variant="info" icon={Info} />
    </div>
  );
};

export default AppChipShowcase;
