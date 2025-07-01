import { createSlice } from "@reduxjs/toolkit";

import { APP_CONFIG_SLICE } from "@/features/settings/constants";
import type { IAppState } from "@/features/settings/types/appConfig.type";

const initialState: IAppState = {
  appName: "Manulak Agro",
  appDescription: "Your Inventory Management System for Modern Businesses",
  appLogo: [
    "https://wordpress.validthemes.net/agrica/wp-content/uploads/2024/01/cropped-favicon-270x270.png",
    "https://manulakagro.com/wp-content/uploads/2025/02/logo-2.png",
  ],
  faviconUrl: "https://manulakagro.com/wp-content/uploads/2025/02/logo-2.png",
  appTheme: "light",
  appVersion: "1.0.0",
};

const appSlice = createSlice({
  name: APP_CONFIG_SLICE.NAME,
  initialState,
  reducers: {
    toggleAppTheme: (state) => {
      state.appTheme = state.appTheme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleAppTheme } = appSlice.actions;
export default appSlice.reducer;
