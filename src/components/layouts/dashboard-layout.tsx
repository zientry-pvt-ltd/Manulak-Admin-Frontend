import AppFooter from "@/components/ui/app-footer";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col justify-between">
        <SidebarTrigger />
        {children}
        <AppFooter />
      </main>
    </SidebarProvider>
  );
}
