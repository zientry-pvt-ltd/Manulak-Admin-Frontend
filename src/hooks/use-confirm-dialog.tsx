import { useContext } from "react";

import { AppConfirmDialogContext } from "@/contexts";

export function useConfirmDialog() {
  const ctx = useContext(AppConfirmDialogContext);
  if (!ctx) {
    throw new Error(
      "useConfirmDialog must be used within AppConfirmDialogProvider",
    );
  }
  return ctx;
}
