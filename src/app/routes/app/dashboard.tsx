import { ContentLayout } from "@/components/layouts";
import { Authorization, ROLES } from "@/lib/authorization";

const UsersRoute = () => {
  return (
    <ContentLayout title="Dashboard">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <span>Dashboard Content</span>
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
