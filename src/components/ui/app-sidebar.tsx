import {
  BadgeDollarSign,
  Boxes,
  Calculator,
  LayoutDashboard,
  type LucideProps,
  Package,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import {
  AppIcon,
  AppText,
  AppTitle,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { paths } from "@/config/paths";
import { ROLES } from "@/constants";
import { UserProfileCard } from "@/features/auth";
import { useAuthorization } from "@/lib/authorization";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export function AppSidebar() {
  const location = useLocation();
  const { checkAccess } = useAuthorization();
  const navigation = [
    {
      name: "Dashboard",
      to: paths.app.dashboard.getHref(),
      icon: LayoutDashboard,
    },
    { name: "Products", to: paths.app.products.getHref(), icon: Package },
    checkAccess({ allowedRoles: [ROLES.SUPER_ADMIN] }) && {
      name: "Stocks",
      to: paths.app.stocks.getHref(),
      icon: Boxes,
    },
    {
      name: "Sales",
      to: paths.app.sales.getHref(),
      icon: BadgeDollarSign,
    },
    {
      name: "Bill Calculation",
      to: paths.app.billCalculation.getHref(),
      icon: Calculator,
    },
    {
      name: "Settings",
      to: paths.app.settings.getHref(),
      icon: Settings,
    },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                  >
                    <NavLink key={item.name} to={item.to}>
                      <AppIcon Icon={item.icon} />
                      <AppText as="span" variant="caption">
                        {item.name}
                      </AppText>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
        <UserProfileCard />
      </SidebarFooter>
    </Sidebar>
  );
}
