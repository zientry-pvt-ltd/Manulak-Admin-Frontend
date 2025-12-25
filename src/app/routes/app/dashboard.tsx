import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { ForbiddenAccess } from "@/features/auth";
import { Dashboard } from "@/features/dashboard";
import { Authorization } from "@/lib/authorization";

const DashBoard = () => {
  return (
    <ContentLayout>
      <Authorization
        forbiddenFallback={<ForbiddenAccess />}
        allowedRoles={[ROLES.ADMIN]}
      >
        <Dashboard />
      </Authorization>
    </ContentLayout>
  );
};

export default DashBoard;
