import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { Dashboard } from "@/features/dashboard";
import { Authorization } from "@/lib/authorization";

const DashBoard = () => {
  return (
    <ContentLayout>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <Dashboard />
      </Authorization>
    </ContentLayout>
  );
};

export default DashBoard;
