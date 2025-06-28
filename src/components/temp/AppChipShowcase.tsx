import { Ban, CheckCircle, Info, Star } from "lucide-react";

import AppChip from "@/components/ui/app-chip"; // Adjust the import path as needed
import AppText from "@/components/ui/app-text";

const AppChipShowcase = () => {
  return (
    <div className="space-y-4 max-w-md border p-4 rounded-lg">
      <AppText variant="subheading" className="font-semibold">
        AppChips Showcase
      </AppText>

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
