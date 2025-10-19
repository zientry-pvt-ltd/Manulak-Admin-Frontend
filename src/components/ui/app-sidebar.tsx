import {
  LayoutDashboard,
  type LucideProps,
  Package,
  Warehouse,
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
  SidebarTrigger,
} from "@/components";
import { paths } from "@/config/paths";
import { UserProfileCard } from "@/features/auth";

type SideNavigationItem = {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export function AppSidebar() {
  const location = useLocation();
  const navigation = [
    {
      name: "Dashboard",
      to: paths.app.dashboard.getHref(),
      icon: LayoutDashboard,
    },
    { name: "Products", to: paths.app.products.getHref(), icon: Package },
    {
      name: "Orders",
      to: paths.app.orders.getHref(),
      icon: Package,
    },
    { name: "Stock", to: paths.app.stocks.getHref(), icon: Warehouse },

    // {
    //   name: "Sales",
    //   to: paths.app.sales.getHref(),
    //   icon: BadgeDollarSign,
    // },
    // {
    //   name: "Bill Calculation",
    //   to: paths.app.billCalculation.getHref(),
    //   icon: Calculator,
    // },
    // {
    //   name: "Settings",
    //   to: paths.app.settings.getHref(),
    //   icon: Settings,
    // },
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
