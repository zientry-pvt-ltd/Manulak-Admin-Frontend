import { useEffect } from "react";
import { toast } from "sonner";

const useOnlineStatus = (): void => {
  useEffect(() => {
    const handleStatusChange = () => {
      const newStatus = navigator.onLine;

      toast(newStatus ? "You are online" : "You are offline", {});
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);
};

export default useOnlineStatus;
