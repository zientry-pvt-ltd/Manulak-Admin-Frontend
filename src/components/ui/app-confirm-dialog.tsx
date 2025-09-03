import type { VariantProps } from "class-variance-authority";

import { AppButton, AppText } from "@/components";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { buttonVariants } from "@/components/ui/button";

type AppConfirmDialogVariants =
  | "destructive"
  | "outline"
  | "secondary"
  | "default"
  | "ghost"
  | "link"
  | "success";

export type AppConfirmDialogProps = {
  variant?: AppConfirmDialogVariants;
  open: boolean;
  isLoading: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onSubmit: () => Promise<void> | void;
};

const variants: Record<
  AppConfirmDialogVariants,
  { confirmButton: VariantProps<typeof buttonVariants>["variant"] }
> = {
  destructive: {
    confirmButton: "destructive",
  },
  outline: {
    confirmButton: "outline",
  },
  secondary: {
    confirmButton: "secondary",
  },
  default: {
    confirmButton: "default",
  },
  ghost: {
    confirmButton: "ghost",
  },
  link: {
    confirmButton: "link",
  },
  success: {
    confirmButton: "success",
  },
};

export function AppConfirmDialog({
  variant = "secondary",
  open,
  isLoading,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "cancel",
  onCancel,
  onSubmit,
}: AppConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <AppText variant="subheading">{title ?? "Confirm Action"}</AppText>
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription asChild>
              <AppText color="muted">{description}</AppText>
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AppButton
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </AppButton>
          <AppButton
            isLoading={isLoading}
            onClick={onSubmit}
            disabled={isLoading}
            variant={variants[variant].confirmButton}
            size="sm"
          >
            {confirmText}
          </AppButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
