import { AppText } from "@/components";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full justify-end h-[4vh] items-center">
      <AppText size="text-xs" color="muted" className="px-2">
        © {currentYear}, NexPhere Solutions
      </AppText>
    </footer>
  );
};

export default AppFooter;
