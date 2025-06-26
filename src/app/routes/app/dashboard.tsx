import { PlusCircle } from "lucide-react";

import { AppButton, AppText } from "@/components";
import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";
import { fetchUserProfile, logout, setError } from "@/store/slices/authSlice";
import { useAppDispatch, useAppDispatchAll } from "@/store/utils";

const UsersRoute = () => {
  const dispatch = useAppDispatch();
  const dispatchAll = useAppDispatchAll();

  const fetchData = async () => {
    try {
      await dispatch(fetchUserProfile());
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return (
    <ContentLayout title="Dashboard">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <AppText variant="caption">Dashboard Content</AppText>

        <div className="flex gap-4 mt-3">
          <AppButton
            rounded="full"
            size="sm"
            onClick={fetchData}
            variant="default"
          >
            Fetch User Profile
          </AppButton>

          <AppButton
            variant={"outline"}
            size="sm"
            rounded="full"
            onClick={() => {
              dispatchAll([logout(), setError("error message")]);
            }}
          >
            Log out
          </AppButton>

          <AppButton Icon={PlusCircle} size="sm" variant="outline">
            Add Item
          </AppButton>
        </div>
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
