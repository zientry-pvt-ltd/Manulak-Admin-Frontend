import { EllipsisVertical, LogOut, Settings, User } from "lucide-react";
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
import { useUser } from "@/features/auth";

const UserProfileCard = () => {
  const { userInfo } = useUser();
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
        <DropdownMenuLabel>{renderUserDetails}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleProfile}>
          <AppIcon Icon={User} size="sm" />
          <AppText variant="caption">Profile</AppText>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <AppIcon Icon={Settings} size="sm" />
          <AppText variant="caption">Settings</AppText>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <AppIcon Icon={LogOut} size="sm" />
          <AppText variant="caption">Log out</AppText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(UserProfileCard);
