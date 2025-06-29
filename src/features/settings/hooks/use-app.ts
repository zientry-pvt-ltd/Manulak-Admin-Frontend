import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

export const useApp = () => {
  const { appName, appLogo, appDescription, appVersion, faviconUrl } =
    useAppSelector(selectApp);

  return {
    appName,
    appLogo,
    appDescription,
    appVersion,
    faviconUrl,
  };
};
