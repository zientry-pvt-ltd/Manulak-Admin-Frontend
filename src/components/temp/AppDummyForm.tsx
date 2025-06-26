import { Send } from "lucide-react";
import * as React from "react";

import AppButton from "@/components/ui/app-button";
import AppCheckbox from "@/components/ui/app-checkbox";
import AppInput from "@/components/ui/app-input";
import AppSelect from "@/components/ui/app-select";
import AppSwitch from "@/components/ui/app-switch";
import AppText from "@/components/ui/app-text";
import AppTextarea from "@/components/ui/app-textarea";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

const AppDummyForm = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    bio: "",
    fruit: "",
    agree: false,
    subscribe: false,
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-lg border p-6 mt-4"
    >
      <AppText variant="heading">Dummy Form</AppText>

      <AppInput
        label="Name"
        size="sm"
        variant="outline"
        placeholder="Your name"
        fullWidth
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={submitted && !form.name ? "Name is required" : undefined}
      />

      <AppInput
        label="Email"
        size="sm"
        variant="outline"
        placeholder="Your email"
        fullWidth
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={submitted && !form.email ? "Email is required" : undefined}
      />

      <AppTextarea
        label="Bio"
        size="sm"
        variant="outline"
        placeholder="Tell us about yourself"
        rows={4}
        fullWidth
        value={form.bio}
        onChange={(e) => handleChange("bio", e.target.value)}
        error={submitted && !form.bio ? "Bio is required" : undefined}
      />

      <AppSelect
        label="Favorite Fruit"
        size="sm"
        variant="outline"
        placeholder="Pick a fruit"
        items={FRUITS}
        fullWidth
        value={form.fruit}
        onValueChange={(val) => handleChange("fruit", val)}
        error={submitted && !form.fruit ? "Please select a fruit" : undefined}
      />

      <AppSwitch
        size="sm"
        checked={form.agree}
        onCheckedChange={(val) => handleChange("agree", val)}
        label="Agree to terms"
        labelPosition="left"
        error={
          submitted && !form.agree ? "You must agree to continue" : undefined
        }
      />

      <AppCheckbox
        size="sm"
        label="Subscribe to newsletter"
        checked={form.subscribe}
        onCheckedChange={(val) => handleChange("subscribe", val)}
        error={
          submitted && !form.subscribe ? "You must accept the terms" : undefined
        }
      />

      <AppButton size="sm" Icon={Send} iconPosition="left" type="submit">
        Submit
      </AppButton>
    </form>
  );
};

export default AppDummyForm;
