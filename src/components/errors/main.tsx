import { AppButton, AppText } from "@/components";

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center"
      role="alert"
    >
      <AppText variant="label" color="destructive">
        Ooops, something went wrong :(
      </AppText>
      <AppButton onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </AppButton>
    </div>
  );
};
