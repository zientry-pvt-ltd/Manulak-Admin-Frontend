export interface IAppState {
  appName: string;
  appVersion: string;
  appDescription: string;
  appLogo: string;
  faviconUrl: string;
  appTheme: ThemeType;
}

export type ThemeType = "light" | "dark";
