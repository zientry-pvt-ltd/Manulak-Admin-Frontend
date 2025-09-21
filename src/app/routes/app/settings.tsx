import { ContentLayout } from "@/components/layouts";
import { ROLES } from "@/constants";
import { Authorization } from "@/lib/authorization";

const Settings = () => {
  return (
    <ContentLayout>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
        isLoading
        loadingLabel="Fetching..."
        className="flex items-center justify-center h-full hidden"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Settings Page</h2>
          <p className="text-gray-600">
            This page is accessible only to admin users.
          </p>
        </div>
      </Authorization>
    </ContentLayout>
  );
};

export default Settings;
