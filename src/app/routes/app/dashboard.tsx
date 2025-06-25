import { Button } from "@/components";
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
        <span>Dashboard Content</span>
      </Authorization>

      <Button onClick={fetchData} title="Fetch">
        Fetch User Profile
      </Button>

      <Button
        onClick={() => {
          dispatchAll([logout(), setError("error message")]);
        }}
      >
        Log out
      </Button>
    </ContentLayout>
  );
};

export default UsersRoute;
