import { AppText } from "@/components";
import { getCurrentDateParts } from "@/utils/date";

const AppFooter = () => {
  return (
    <footer className="flex w-full justify-end h-[4vh] items-center">
      <AppText size="text-xs" color="muted" className="px-2">
        © {getCurrentDateParts().year}, Zientry Pvt Ltd
      </AppText>
    </footer>
  );
};

export default AppFooter;
