import { useApp } from "@/features/settings";

export const AppMetadata = () => {
  const { appName, faviconUrl } = useApp();

  return (
    <>
      <title>{appName || "Loading..."}</title>
      <meta name="application-name" content={appName} />
      <link rel="icon" href={faviconUrl} />
    </>
  );
};
