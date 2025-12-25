import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { ForbiddenAccess } from "@/features/auth";
import { StockTabs } from "@/features/stock";
import { Authorization } from "@/lib/authorization";

const UsersRoute = () => {
  return (
    <ContentLayout>
      <Authorization
        allowedRoles={[ROLES.ADMIN]}
        forbiddenFallback={<ForbiddenAccess />}
      >
        <StockTabs />
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
