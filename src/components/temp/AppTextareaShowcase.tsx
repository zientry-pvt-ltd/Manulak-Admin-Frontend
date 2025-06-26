import { AppTextarea } from "@/components";

const AppTextareaShowcase = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">AppTextarea Showcase</h2>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Variants</h3>
        <AppTextarea
          label="Outline Variant"
          placeholder="Enter your comment..."
          variant="outline"
        />
        <AppTextarea
          label="Fill Variant"
          placeholder="Enter your comment..."
          variant="fill"
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Sizes</h3>
        <AppTextarea
          label="Small"
          placeholder="Small textarea"
          size="sm"
          rows={3}
        />
        <AppTextarea
          label="Medium"
          placeholder="Medium textarea"
          size="md"
          rows={4}
        />
        <AppTextarea
          label="Large"
          placeholder="Large textarea"
          size="lg"
          rows={6}
        />
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Full Width</h3>
        <AppTextarea
          label="Full Width"
          placeholder="This textarea stretches to full width"
          fullWidth
        />
      </div>

      {/* Error State */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Error State</h3>
        <AppTextarea
          label="Feedback"
          placeholder="Leave your feedback"
          error="Feedback is required"
        />
      </div>
    </div>
  );
};

export default AppTextareaShowcase;
