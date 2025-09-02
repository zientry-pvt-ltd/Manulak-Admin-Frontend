/* eslint-disable no-unused-vars */
import { createContext } from "react";

import type { AppConfirmDialogOptions } from "@/providers/confirm-dialog-provider";

export type AppConfirmDialogContextType = {
  confirm: (options: AppConfirmDialogOptions) => void;
};

export const AppConfirmDialogContext =
  createContext<AppConfirmDialogContextType | null>(null);
