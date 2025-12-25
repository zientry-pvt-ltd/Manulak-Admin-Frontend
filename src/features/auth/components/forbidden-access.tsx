import { AlertCircle } from "lucide-react";

export type ForbiddenAccessProps = {
  message?: string;
  title?: string;
  className?: string;
};

export const ForbiddenAccess: React.FC<ForbiddenAccessProps> = ({
  message = "You don't have permission to view this content.",
  title = "Access Denied",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[400px] p-8 ${className}`}
    >
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="rounded-full bg-red-100 dark:bg-red-800 p-3">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-secondary-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  );
};
