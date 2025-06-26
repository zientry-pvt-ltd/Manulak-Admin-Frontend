import { AppText } from "@/components";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <AppText variant="caption" color="muted" className="px-2 pb-1">
        Copyright © {currentYear} - All right reserved by NexPhere Solutions
      </AppText>
    </footer>
  );
};

export default AppFooter;
