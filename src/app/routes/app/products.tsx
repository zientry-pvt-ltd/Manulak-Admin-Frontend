import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";

const Products = () => {
  return (
    <ContentLayout title="Products">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <span>Products Content</span>
      </Authorization>
    </ContentLayout>
  );
};

export default Products;
