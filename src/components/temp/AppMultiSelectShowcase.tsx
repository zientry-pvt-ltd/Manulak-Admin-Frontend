import * as React from "react";

import AppMultiSelect from "@/components/ui/app-multi-select"; // Adjust the path if needed
import AppText from "@/components/ui/app-text";

const AppMultiSelectShowcase: React.FC = () => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const items = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "SolidJS", value: "solid" },
  ];

  return (
    <div className="space-y-4 max-w-md border p-4 rounded-lg flex flex-col gap-2">
      <AppText variant="subheading" className="font-semibold">
        AppMultiSelect Showcase
      </AppText>

      <AppMultiSelect
        label="Select frameworks (small)"
        items={items}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
        placeholder="Choose your stack"
        size="sm"
      />
      <AppMultiSelect
        label="Select frameworks (small with error)"
        items={items}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
        placeholder="Choose your stack"
        size="sm"
        error="This is an error message"
      />

      <AppMultiSelect
        label="Select frameworks (medium full width)"
        items={items}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
        placeholder="Choose your stack"
        size="md"
        variant="fill"
        fullWidth
      />

      <AppMultiSelect
        label="Select frameworks (large)"
        items={items}
        selectedValues={selectedValues}
        onChange={setSelectedValues}
        placeholder="Choose your stack"
        size="lg"
      />
      <AppText as="p" size="text-sm" className="text-muted-foreground">
        Selected values:{" "}
        <span className="text-foreground font-medium">
          {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
        </span>
      </AppText>
    </div>
  );
};

export default AppMultiSelectShowcase;
