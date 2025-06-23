import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  darkMode: boolean;
  appName: string;
  appVersion: string;
  appDescription: string;
  appLogo: string;
  faviconUrl: string;
}

const initialState: AppState = {
  darkMode: false,
  appDescription: "A modern web application",
  appName: "Manulak Agro",
  appVersion: "1.0.0",
  appLogo: "https://manulakagro.com/wp-content/uploads/2025/02/logo-2.png",
  faviconUrl: "https://manulakagro.com/wp-content/uploads/2025/02/logo-2.png",
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
