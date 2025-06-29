import { SplinePointer } from "lucide-react";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AppMetadata, MainErrorFallback, Toaster } from "@/components";
import useOnlineStatus from "@/hooks/use-online-status";
import { AuthRefreshProvider } from "@/providers/auth-refresh-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { persistor, store } from "@/store";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  useOnlineStatus();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <SplinePointer />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <AuthRefreshProvider>{children}</AuthRefreshProvider>
              <Toaster expand theme="light" richColors closeButton />
              <AppMetadata />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
};
