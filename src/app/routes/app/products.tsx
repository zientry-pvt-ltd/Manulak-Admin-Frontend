import { ContentLayout } from "@/components/layouts";
import AppChipShowcase from "@/components/temp/AppChipShowcase";
import AppInputShowcase from "@/components/temp/AppInputShowcase";
import AppMultiSelectShowcase from "@/components/temp/AppMultiSelectShowcase";
import AppSelectShowcase from "@/components/temp/AppSelectShowcase";
import AppSwitchShowcase from "@/components/temp/AppSwitchShowcase";
import AppTextareaShowcase from "@/components/temp/AppTextareaShowcase";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";

const Products = () => {
  return (
    <ContentLayout title="Products">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <div className="flex flex-col gap-8">
          <AppInputShowcase />
          <AppSelectShowcase />
          <AppMultiSelectShowcase />
          <AppTextareaShowcase />
          <AppSwitchShowcase />
          <AppChipShowcase />
        </div>
      </Authorization>
    </ContentLayout>
  );
};

export default Products;
