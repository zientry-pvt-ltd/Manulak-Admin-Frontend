export interface IAppState {
  appName: string;
  appVersion: string;
  appDescription: string;
  appLogo: string[];
  appTheme: ThemeType;
  faviconUrl: string;
}

export type ThemeType = "light" | "dark";
