import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IAppState } from "@/customTypes/app.types";

const initialState: IAppState = {
  appName: "Manulak Agro",
  appDescription: "A modern web application",
  appLogo:
    "https://wordpress.validthemes.net/agrica/wp-content/uploads/2024/01/cropped-favicon-270x270.png",
  faviconUrl: "https://manulakagro.com/wp-content/uploads/2025/02/logo-2.png",
  darkMode: false,
  appVersion: "1.0.0",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = appSlice.actions;
export default appSlice.reducer;
