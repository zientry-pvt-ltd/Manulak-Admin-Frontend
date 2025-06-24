import {
  BadgeDollarSign,
  Boxes,
  Calculator,
  LayoutDashboard,
  Package,
  Settings,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import { AppTitle } from "@/components";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { paths } from "@/config/paths";
import { ROLES, useAuthorization } from "@/lib/authorization";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: React.ComponentType<{}>;
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
    checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
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
      <AppTitle />
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
                    <NavLink
                      key={item.name}
                      to={item.to}
                      end={item.name !== "Discussions"}
                    >
                      <item.icon />
                      {item.name}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
