import { AppText, Card } from "@/components";
import { Progress } from "@/components/ui/progress";

export const MostSoldItems = () => {
  return (
    <Card className="w-xs rounded-lg shadow-none gap-4">
      <AppText variant="subheading" size="text-sm" className="px-4">
        Most sold items
      </AppText>

      <div className="space-y-4 max-h-64 overflow-y-auto px-4 pb-2">
        <div className="space-y-1">
          <div className="flex justify-between">
            <AppText variant="caption" size="text-xs">
              Plant Nursery
            </AppText>
            <AppText variant="caption" size="text-xs">
              70%
            </AppText>
          </div>
          <Progress value={70} className="w-full h-3" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <AppText variant="caption" size="text-xs">
              Online
            </AppText>
            <AppText variant="caption" size="text-xs">
              10%
            </AppText>
          </div>
          <Progress value={10} className="w-full h-3" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <AppText variant="caption" size="text-xs">
              Accessories
            </AppText>
            <AppText variant="caption" size="text-xs">
              40%
            </AppText>
          </div>
          <Progress value={40} className="w-full h-3" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <AppText variant="caption" size="text-xs">
              Accessories
            </AppText>
            <AppText variant="caption" size="text-xs">
              40%
            </AppText>
          </div>
          <Progress value={40} className="w-full h-3" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <AppText variant="caption" size="text-xs">
              Accessories
            </AppText>
            <AppText variant="caption" size="text-xs">
              40%
            </AppText>
          </div>
          <Progress value={40} className="w-full h-3" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <AppText variant="caption" size="text-xs">
              Accessories
            </AppText>
            <AppText variant="caption" size="text-xs">
              40%
            </AppText>
          </div>
          <Progress value={40} className="w-full h-3" />
        </div>
      </div>
    </Card>
  );
};
