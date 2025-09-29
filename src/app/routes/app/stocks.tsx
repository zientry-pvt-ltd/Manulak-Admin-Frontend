import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { StockTabs } from "@/features/stock";
import { Authorization } from "@/lib/authorization";

const UsersRoute = () => {
  return (
    <ContentLayout>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <StockTabs />
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
