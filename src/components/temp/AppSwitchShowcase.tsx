import AppSwitch from "@/components/ui/app-switch";
import AppText from "@/components/ui/app-text";

const AppSwitchShowcase = () => {
  return (
    <div className="space-y-4 max-w-md border p-4 rounded-lg">
      <AppText variant="subheading" className="font-semibold">
        App Switch Showcase
      </AppText>
      <AppSwitch defaultChecked size="sm" />
      <AppSwitch defaultChecked size="lg" />
      <AppSwitch defaultChecked size="md" />
    </div>
  );
};

export default AppSwitchShowcase;
