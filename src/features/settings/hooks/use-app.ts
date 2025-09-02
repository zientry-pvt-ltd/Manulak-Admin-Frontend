import { toggleAppTheme } from "@/features/settings";
import { selectApp } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/utils";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const { appName, appLogo, appDescription, appVersion, faviconUrl, appTheme } =
    useAppSelector(selectApp);

  const toggleTheme = () => {
    dispatch(toggleAppTheme());
  };

  return {
    appName,
    appLogo,
    appDescription,
    appVersion,
    faviconUrl,
    appTheme,
    toggleTheme,
  };
};
