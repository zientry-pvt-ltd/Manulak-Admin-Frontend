import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { ProductsTabs } from "@/features/products";
import { Authorization } from "@/lib/authorization";

const Products = () => {
  return (
    <ContentLayout>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <ProductsTabs />
      </Authorization>
    </ContentLayout>
  );
};

export default Products;
