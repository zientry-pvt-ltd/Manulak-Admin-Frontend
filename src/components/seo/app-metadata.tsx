import { useApp } from "@/features/settings";

export const AppMetadata = () => {
  const { appName, appLogo } = useApp();

  return (
    <>
      <title>{appName || "Loading..."}</title>
      <meta name="application-name" content={appName} />
      <link rel="icon" href={appLogo[0]} />
    </>
  );
};
