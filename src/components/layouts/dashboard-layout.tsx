import { ChevronRight } from "lucide-react";

import AppButton from "@/components/ui/app-button";
import AppFooter from "@/components/ui/app-footer";
import AppIcon from "@/components/ui/app-icon";
import { AppSidebar } from "@/components/ui/app-sidebar";
import AppText from "@/components/ui/app-text";
import { SidebarProvider } from "@/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col justify-between">
        {/* side bar trigger header */}
        <div className="flex items-center bg-sidebar h-[6vh] px-2">
          <AppText variant="caption">Dashboard</AppText>
          <AppIcon Icon={ChevronRight} size="sm" />
          <AppButton size="sm" className="ml-auto">
            Add Item
          </AppButton>
        </div>

        {children}
        <AppFooter />
      </main>
    </SidebarProvider>
  );
}
