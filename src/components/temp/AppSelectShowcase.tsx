import { BananaIcon, EggFried } from "lucide-react";
import { useState } from "react";

import AppSelect from "@/components/ui/app-select";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

const AppSelectShowcase = () => {
  return (
    <div className="space-y-10 p-6 max-w-3xl">
      <h2 className="text-2xl font-semibold">AppSelect Showcase</h2>

      {/* Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Variants</h3>
        <AppSelect
          label="Outline Variant"
          items={FRUITS}
          variant="outline"
          placeholder="Pick a fruit"
          startIcon={EggFried}
        />
        <AppSelect
          label="Fill Variant"
          items={FRUITS}
          variant="fill"
          placeholder="Pick a fruit"
        />
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Sizes</h3>
        <AppSelect
          label="Small"
          items={FRUITS}
          size="sm"
          placeholder="Small size"
          startIcon={BananaIcon}
        />
        <AppSelect
          label="Medium"
          items={FRUITS}
          size="md"
          placeholder="Medium size"
        />
        <AppSelect
          label="Large"
          items={FRUITS}
          size="lg"
          placeholder="Large size"
        />
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Full Width</h3>
        <AppSelect
          label="Full Width Select"
          items={FRUITS}
          fullWidth
          placeholder="Stretching..."
        />
      </section>

      {/* Error State */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Error State</h3>
        <AppSelect
          label="Select with Error"
          items={FRUITS}
          error="Please select a fruit"
          placeholder="Choose wisely"
        />
      </section>

      {/* Controlled Example */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Controlled Example</h3>
        <ControlledSelect />
      </section>
    </div>
  );
};

const ControlledSelect = () => {
  const [value, setValue] = useState("banana");

  return (
    <AppSelect
      label="Controlled Select"
      items={FRUITS}
      value={value}
      onValueChange={setValue}
      placeholder="Select one"
    />
  );
};

export default AppSelectShowcase;
