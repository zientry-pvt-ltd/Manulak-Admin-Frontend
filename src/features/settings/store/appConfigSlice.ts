import { createSlice } from "@reduxjs/toolkit";

import type { ICompanyInfo } from "@/features/auth";
import { APP_CONFIG_SLICE, type IAppState } from "@/features/settings";
import { authApi } from "@/services";

const initialState: IAppState = {
  appName: "App Name",
  appDescription: "App Description",
  companyAddress: "",
  companyEmail: "",
  companyPhone: "",
  appLogo: "",
  faviconUrl: "",
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
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const company: ICompanyInfo = action.payload.data.company;
        if (company) {
          state.appName = company.company_name;
          state.appDescription = company.company_description;
          state.appLogo = company.company_images?.[0] ?? state.appLogo;
          state.faviconUrl = company.company_images?.[1] ?? state.faviconUrl;
          state.companyAddress = company.address || state.companyAddress;
          state.companyEmail = company.email || state.companyEmail;
          state.companyPhone = company.phone || state.companyPhone;
        }
      },
    );

    builder.addMatcher(
      authApi.endpoints.refreshAccessToken.matchFulfilled,
      (state, action) => {
        const company: ICompanyInfo = action.payload.data.company;
        if (company) {
          state.appName = company.company_name;
          state.appDescription = company.company_description;
          state.companyAddress = company.address || state.companyAddress;
          state.companyEmail = company.email || state.companyEmail;
          state.companyPhone = company.phone || state.companyPhone;
          state.appLogo = company.company_images?.[0] ?? state.appLogo;
          state.faviconUrl = company.company_images?.[1] ?? state.faviconUrl;
        }
      },
    );
  },
});

export const { toggleAppTheme } = appSlice.actions;
export default appSlice.reducer;
