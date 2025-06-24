import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

export const AppMetadata = () => {
  const app = useAppSelector(selectApp);

  return (
    <>
      <title>{app.appName || "Loading..."}</title>
      <meta name="application-name" content={app.appName} />
      <link rel="icon" href={app.appSmallLogo} />
    </>
  );
};
