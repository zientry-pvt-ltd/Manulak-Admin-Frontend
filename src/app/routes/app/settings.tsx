import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";

const Settings = () => {
  return (
    <ContentLayout title="Settings">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <span>Settings Content</span>
      </Authorization>
    </ContentLayout>
  );
};

export default Settings;
