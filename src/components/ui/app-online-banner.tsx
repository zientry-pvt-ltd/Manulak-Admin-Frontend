import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

import AppIcon from "@/components/ui/app-icon";
import AppText from "@/components/ui/app-text";

const OnlineStatusBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed -top-0.5 -left-0.5 -right-0.5 z-50 border bg-amber-500 dark:bg-amber-600 text-white py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AppIcon Icon={WifiOff} className="text-primary" size="sm" />
        <AppText color="primary" size="text-xs">
          You seem to be offline. Data in this workspace might not be up to
          date.
        </AppText>
      </div>
    </div>
  );
};

export default OnlineStatusBanner;
