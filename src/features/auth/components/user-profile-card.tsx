import {
  EllipsisVertical,
  LogOut,
  Settings,
  SunMoon,
  User,
} from "lucide-react";
import { memo, type MouseEvent, useCallback } from "react";

import {
  AppAvatar,
  AppIcon,
  AppSwitch,
  AppText,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useSidebar,
} from "@/components";
import { useApp } from "@/features/settings";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

const UserProfileCard = () => {
  const { toggleTheme, appTheme } = useApp();
  const { state, setOpen } = useSidebar();
  const { userInfo } = useAppSelector(selectAuth);

  const isCollapsed = state === "collapsed";

  const fullName = userInfo?.user_name || "Unknown";
  const profileUrl = "";
  const role = userInfo?.user_role || "Unknown";

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
    (e: MouseEvent) => {
      e.stopPropagation();
      toggleTheme();
    },
    [toggleTheme],
  );

  const renderUserDetails = (
    <div className="flex items-center gap-x-2 cursor-default">
      <AppAvatar name={fullName} imageUrl={profileUrl} size="md" />
      {!isCollapsed && (
        <>
          <div className="flex flex-col max-w-[130px]">
            <AppText size="text-xs" weight="font-semibold" ellipsis truncate>
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
          <AppSwitch
            checked={appTheme === "dark"}
            onClick={handleThemeToggle}
          />
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
