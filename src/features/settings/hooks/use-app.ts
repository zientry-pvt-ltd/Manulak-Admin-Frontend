import { toggleAppTheme } from "@/features/settings/store/slices/appConfigSlice";
import { selectApp } from "@/store/selectors/appSelectors";
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
