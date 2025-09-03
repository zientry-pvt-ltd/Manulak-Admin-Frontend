/* eslint-disable no-unused-vars */
import { createContext, type ReactNode, useContext, useState } from "react";

import { AppConfirmDialog } from "@/components";
import type { AppConfirmDialogProps } from "@/components/ui/app-confirm-dialog";

type AppConfirmDialogContextType = {
  confirm: (options: AppConfirmDialogOptions) => void;
};

const AppConfirmDialogContext =
  createContext<AppConfirmDialogContextType | null>(null);

type AppConfirmDialogOptions = Omit<
  AppConfirmDialogProps,
  "open" | "isLoading" | "onCancel"
>;

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<AppConfirmDialogOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = (opts: AppConfirmDialogOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!options?.onSubmit) return;
    try {
      setIsLoading(true);
      await options.onSubmit();
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AppConfirmDialog
        open={open}
        isLoading={isLoading}
        variant={options?.variant}
        title={options?.title}
        description={options?.description}
        onCancel={() => setOpen(false)}
        onSubmit={handleSubmit}
        confirmText={options?.confirmText}
        cancelText={options?.cancelText}
      />
    </AppConfirmDialogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirmDialog() {
  const ctx = useContext(AppConfirmDialogContext);
  if (!ctx) {
    throw new Error(
      "useConfirmDialog must be used within AppConfirmDialogProvider",
    );
  }
  return ctx;
}
