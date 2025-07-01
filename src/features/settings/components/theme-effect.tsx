import { useEffect } from "react";

import { useApp } from "@/features/settings";

export const ThemeEffect = () => {
  const { appTheme } = useApp();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(appTheme);
  }, [appTheme]);

  return null;
};
