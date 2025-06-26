import { Eye, Lock, Mail, User } from "lucide-react";

import AppInput from "@/components/ui/app-input";

const AppInputShowcase = () => {
  return (
    <div className="space-y-8 p-6 max-w-3xl">
      <h2 className="text-xl font-semibold">AppInput Showcase</h2>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Sizes</h3>
        <div className="space-y-3">
          <AppInput label="Small" placeholder="Small input" size="sm" />
          <AppInput label="Medium" placeholder="Medium input" size="md" />
          <AppInput label="Large" placeholder="Large input" size="lg" />
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Variants</h3>
        <div className="space-y-3">
          <AppInput
            label="Outline Variant"
            placeholder="Enter text"
            variant="outline"
          />
          <AppInput
            label="Fill Variant"
            placeholder="Enter text"
            variant="fill"
          />
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">With Icons</h3>
        <div className="space-y-3">
          <AppInput
            label="Email"
            placeholder="you@example.com"
            startIcon={Mail}
          />
          <AppInput
            label="Password"
            placeholder="••••••••"
            startIcon={Lock}
            endIcon={Eye}
            type="password"
          />
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4 ">
        <h3 className="font-medium text-lg">Full Width</h3>
        <AppInput
          label="Full Width Input"
          placeholder="Expands to container"
          fullWidth
        />
      </div>

      {/* Error State */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Error State</h3>
        <AppInput
          label="Username"
          placeholder="Enter your username"
          startIcon={User}
          error="Username is required"
        />
      </div>
    </div>
  );
};

export default AppInputShowcase;
