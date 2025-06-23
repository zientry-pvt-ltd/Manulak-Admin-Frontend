import { SplinePointer } from "lucide-react";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { MainErrorFallback } from "@/components/errors/main";
import { persistor, store } from "@/store";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
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
            {children}
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  );
};
