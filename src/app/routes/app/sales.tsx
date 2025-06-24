import { ContentLayout } from "@/components/layouts";
import { Authorization, ROLES } from "@/lib/authorization";

const Sales = () => {
  return (
    <ContentLayout title="Sales">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <span>Sales Content</span>
      </Authorization>
    </ContentLayout>
  );
};

export default Sales;
