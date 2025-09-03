import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  AppMetadata,
  LoadingFallback,
  MainErrorFallback,
  Toaster,
} from "@/components";
import { ThemeEffect } from "@/features/settings";
import useOnlineStatus from "@/hooks/use-online-status";
import { AuthRefreshProvider, ConfirmDialogProvider } from "@/providers";
import { persistor, store } from "@/store";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  useOnlineStatus();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthRefreshProvider>
              <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
            </AuthRefreshProvider>
            <Toaster expand theme="light" richColors closeButton />
            <AppMetadata />
            <ThemeEffect />
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
};
