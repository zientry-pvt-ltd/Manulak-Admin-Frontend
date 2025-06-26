import { ContentLayout } from "@/components/layouts";
import AppIconButtonShowcase from "@/components/temp/AppIconButtonShowcase";
import AppTextShowcase from "@/components/temp/AppTextShowcase";
import ButtonShowcase from "@/components/temp/ButtonShowcase";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";

const UsersRoute = () => {
  return (
    <ContentLayout title="Dashboard">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <div className="flex gap-4 mt-3">
          <ButtonShowcase />
          <AppTextShowcase />
          <AppIconButtonShowcase />
        </div>
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
