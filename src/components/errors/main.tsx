import { AppButton, AppText } from "@/components";

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      role="alert"
    >
      <AppText variant="label" color="destructive">
        Ooops, something went wrong :(
      </AppText>
      <AppButton
        size="sm"
        onClick={() => window.location.assign(window.location.origin)}
        variant={"outline"}
      >
        Refresh
      </AppButton>
    </div>
  );
};
