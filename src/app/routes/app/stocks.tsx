import { ContentLayout } from "@/components/layouts";
import { Authorization, ROLES } from "@/lib/authorization";

const UsersRoute = () => {
  return (
    <ContentLayout title="Stocks">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <span>Stocks Content</span>
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
