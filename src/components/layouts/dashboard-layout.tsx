import AppContentHeader from "@/components/ui/app-content-header";
import AppFooter from "@/components/ui/app-footer";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col justify-between overflow-hidden">
        {/* side bar trigger header */}
        <AppContentHeader />
        {children}
        <AppFooter />
      </main>
    </SidebarProvider>
  );
}
