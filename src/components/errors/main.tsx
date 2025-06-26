import AppButton from "@/components/ui/app-button";
import AppText from "@/components/ui/app-text";

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <AppText variant="label">Ooops, something went wrong :( </AppText>
      <AppButton
        size="md"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </AppButton>
    </div>
  );
};
