import {
  EllipsisVertical,
  LogOut,
  Settings,
  SunMoon,
  User,
} from "lucide-react";
import { memo, useCallback } from "react";

import {
  AppAvatar,
  AppIcon,
  AppText,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useSidebar,
} from "@/components";
import AppSwitch from "@/components/ui/app-switch";
import { useUser } from "@/features/auth";
import { useTheme } from "@/providers/theme-provider";

const UserProfileCard = () => {
  const { userInfo } = useUser();
  const { theme, setTheme } = useTheme();
  const { state, setOpen } = useSidebar();

  const isCollapsed = state === "collapsed";
  const fullName = `${userInfo?.firstName} ${userInfo?.lastName}`;
  const profileUrl = userInfo?.profileUrl || "";
  const role = userInfo?.role || "Unknown";

  const handleProfile = useCallback(() => {
    console.log("Go to profile");
    setOpen(true);
  }, [setOpen]);

  const handleSettings = useCallback(() => {
    console.log("Open settings");
  }, []);

  const handleLogout = useCallback(() => {
    console.log("Logging out...");
  }, []);

  const handleThemeToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setTheme(theme === "dark" ? "light" : "dark");
    },
    [setTheme, theme],
  );

  const renderUserDetails = (
    <div className="flex items-center gap-x-2 cursor-default">
      <AppAvatar name={fullName} imageUrl={profileUrl} size="md" />
      {!isCollapsed && (
        <>
          <div className="flex flex-col">
            <AppText size="text-xs" weight="font-semibold" ellipsis>
              {fullName}
            </AppText>
            <AppText size="text-xs" color="muted">
              {role}
            </AppText>
          </div>
          <AppIcon Icon={EllipsisVertical} size="sm" className="ml-auto" />
        </>
      )}
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderUserDetails}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleProfile}>
          <AppIcon Icon={User} />
          <AppText variant="caption">Profile</AppText>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <AppIcon Icon={SunMoon} />
          <AppText variant="caption" className="mr-auto">
            Dark Mode
          </AppText>
          <AppSwitch checked={theme === "dark"} onClick={handleThemeToggle} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <AppIcon Icon={Settings} />
          <AppText variant="caption">Settings</AppText>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <AppIcon Icon={LogOut} />
          <AppText variant="caption">Log out</AppText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(UserProfileCard);
