import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  darkMode: boolean;
}

const initialState: AppState = {
  darkMode: false,
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
