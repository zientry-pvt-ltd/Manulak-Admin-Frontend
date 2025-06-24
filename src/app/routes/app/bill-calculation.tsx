import { ContentLayout } from "@/components/layouts";
import { Authorization, ROLES } from "@/lib/authorization";

const BillCalculation = () => {
  return (
    <ContentLayout title="Bill Calculation">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <span>Bill Cal Content</span>
      </Authorization>
    </ContentLayout>
  );
};

export default BillCalculation;
