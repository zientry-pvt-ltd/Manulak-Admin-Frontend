import { ContentLayout } from "@/components/layouts";
import AppInputShowcase from "@/components/temp/AppInputShowcase";
import AppSelectShowcase from "@/components/temp/AppSelectShowcase";
import AppTextareaShowcase from "@/components/temp/AppTextareaShowcase";
import AppSwitch from "@/components/ui/app-switch";
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
          <AppTextareaShowcase />

          <AppSelectShowcase />

          <div className="flex gap-4">
            <AppSwitch defaultChecked size="sm" />
            <AppSwitch defaultChecked size="lg" />
            <AppSwitch defaultChecked size="md" />
          </div>
        </div>
      </Authorization>
    </ContentLayout>
  );
};

export default Products;
