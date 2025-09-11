import {
  EllipsisVertical,
  LogOut,
  Settings,
  SunMoon,
  User,
} from "lucide-react";
import { memo, type MouseEvent, useCallback, useState } from "react";
import { toast } from "sonner";

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
import { useConfirmDialog } from "@/providers";
import { useLogoutMutation } from "@/services/auth";
import { selectAuth } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";
import { normalizeError } from "@/utils/error-handler";

const UserProfileCard = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const { toggleTheme, appTheme } = useApp();
  const { state, setOpen } = useSidebar();
  const { userInfo } = useAppSelector(selectAuth);
  const { confirm } = useConfirmDialog();
  const [logout] = useLogoutMutation();

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

  const handleLogout = useCallback(async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      const message = normalizeError(error);
      toast.error(message.message);
      console.error("Logout failed:", message.message);
    }
  }, [logout]);

  const handleConfirmLogout = useCallback(() => {
    confirm({
      title: "Confirm Logout",
      description: "Are you sure you want to log out?",
      variant: "destructive",
      confirmText: "Log Out",
      cancelText: "Cancel",
      onSubmit: handleLogout,
    });
    setOpenProfile(false);
  }, [confirm, handleLogout]);

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
    <DropdownMenu open={openProfile} onOpenChange={setOpenProfile}>
      <DropdownMenuTrigger asChild onClick={() => setOpenProfile(!openProfile)}>
        {renderUserDetails}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleProfile}>
          <AppIcon Icon={User} />
          <AppText variant="caption">Profile</AppText>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleThemeToggle}>
          <AppIcon Icon={SunMoon} />
          <AppText variant="caption" className="mr-auto">
            Dark Mode
          </AppText>
          <AppSwitch checked={appTheme === "dark"} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <AppIcon Icon={Settings} />
          <AppText variant="caption">Settings</AppText>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleConfirmLogout}>
          <AppIcon Icon={LogOut} />
          <AppText variant="caption">Log out</AppText>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(UserProfileCard);
