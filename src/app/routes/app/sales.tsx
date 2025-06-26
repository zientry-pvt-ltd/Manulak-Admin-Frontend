import { ContentLayout } from "@/components/layouts";
import AppDummyForm from "@/components/temp/AppDummyForm";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";

const Sales = () => {
  return (
    <ContentLayout title="Sales">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <AppDummyForm />
      </Authorization>
    </ContentLayout>
  );
};

export default Sales;
