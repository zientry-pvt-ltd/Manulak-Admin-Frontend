/* eslint-disable no-unused-vars */
import { createContext, type ReactNode, useContext, useState } from "react";

import { AppDialog } from "@/components";

type AppDialogContextType = {
  openAppDialog: (options: {
    title: string;
    description: string;
    content: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
  }) => void;
  closeAppDialog: () => void;
};
const AppDialogContext = createContext<AppDialogContextType | undefined>(
  undefined,
);

export const AppDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<{
    title: string;
    description: string;
    content: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
  } | null>(null);

  const openAppDialog: AppDialogContextType["openAppDialog"] = (options) => {
    setDialogOptions(options);
    setOpen(true);
  };

  const closeAppDialog = () => {
    setOpen(false);
    setDialogOptions(null);
  };

  return (
    <AppDialogContext.Provider value={{ openAppDialog, closeAppDialog }}>
      {children}
      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title={dialogOptions?.title}
        description={dialogOptions?.description}
        onSubmit={(e) => {
          e.preventDefault();
          dialogOptions?.onSubmit(e);
        }}
      >
        {dialogOptions?.content}
      </AppDialog>
    </AppDialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppDialog = () => {
  const context = useContext(AppDialogContext);
  if (!context) {
    throw new Error("useAppDialog must be used within an AppDialogProvider");
  }
  return context;
};
