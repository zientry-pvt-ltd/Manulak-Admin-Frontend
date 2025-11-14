import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  AppMetadata,
  AppMobileWarning,
  AppOnlineStatusBanner,
  LoadingFallback,
  MainErrorFallback,
  Toaster,
} from "@/components";
import { ThemeEffect } from "@/features/settings";
import {
  AppDialogProvider,
  AuthRefreshProvider,
  ConfirmDialogProvider,
} from "@/providers";
import { persistor, store } from "@/store";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AppMobileWarning>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthRefreshProvider>
                <ConfirmDialogProvider>
                  <AppDialogProvider>{children}</AppDialogProvider>
                </ConfirmDialogProvider>
              </AuthRefreshProvider>
              <Toaster expand theme="light" richColors closeButton />
              <AppMetadata />
              <ThemeEffect />
              <AppOnlineStatusBanner />
            </PersistGate>
          </Provider>
        </ErrorBoundary>
      </Suspense>
    </AppMobileWarning>
  );
};
