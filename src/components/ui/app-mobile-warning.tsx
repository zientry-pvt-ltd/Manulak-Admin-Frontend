import { Monitor, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import AppText from "@/components/ui/app-text";

type AppMobileWarningProps = {
  children?: React.ReactNode;
};

const AppMobileWarning = ({ children }: AppMobileWarningProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileRegex =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isSmallDevice =
        mobileRegex.test(userAgent) || window.innerWidth < 1000;
      setIsSmallScreen(isSmallDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isSmallScreen) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <Smartphone className="w-12 h-12 text-red-600" />
          </div>
        </div>

        <AppText variant="heading" align="center" className="pb-4">
          Small Screen Detected
        </AppText>

        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-6">
          <AppText color="destructive" align="center">
            This dashboard is not supported on small screen sizes
          </AppText>
        </div>

        <div className="space-y-3 text-gray-600">
          <p className="flex items-start gap-2">
            <AppText className="text-red-500 font-bold">•</AppText>
            <AppText>
              Complex data visualizations require larger screens
            </AppText>
          </p>
          <p className="flex items-start gap-2">
            <AppText className="text-red-500 font-bold">•</AppText>
            <AppText>
              Multiple panels and controls need more screen space
            </AppText>
          </p>
          <p className="flex items-start gap-2">
            <AppText className="text-red-500 font-bold">•</AppText>
            <AppText>
              Optimal experience is on desktop or tablet devices
            </AppText>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Monitor className="w-5 h-5" />
            <AppText variant="caption" color="muted">
              Please access from a desktop computer
            </AppText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppMobileWarning;
