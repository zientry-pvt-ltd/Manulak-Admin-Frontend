import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { OrderTabs } from "@/features/orders";
import { Authorization } from "@/lib/authorization";

const Orders = () => {
  return (
    <ContentLayout>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <OrderTabs />
      </Authorization>
    </ContentLayout>
  );
};

export default Orders;
