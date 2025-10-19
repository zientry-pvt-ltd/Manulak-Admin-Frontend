import { useCallback, useState } from "react";

import { AppButton, AppText } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  OnlineOrderPlacementForm,
  PlantNurseryOrderPlacementForm,
} from "@/features/orders";
import { useAppDialog } from "@/providers";

export const OrderPlacementMenu = () => {
  const { openAppDialog } = useAppDialog();

  const [open, setOpen] = useState(false);

  const handleOrderPlacementFromText = useCallback(() => {
    setOpen(false);
    openAppDialog({
      description: "Order placement from text message",
      title: "Order Placement",
      content: <div>Order placement form goes here</div>,
      disableFooter: true,
    });
  }, [openAppDialog]);

  const handleOrderPlacementManually = useCallback(() => {
    setOpen(false);
    openAppDialog({
      description: "Manual order placement",
      title: "Order Placement",
      content: <OnlineOrderPlacementForm />,
      formId: "online-order-placement-form",
    });
  }, [openAppDialog]);

  const handlePlantNurserySales = useCallback(() => {
    setOpen(false);
    openAppDialog({
      description: "Plant nursery sales order",
      title: "Plant Nursery Sales",
      content: <PlantNurseryOrderPlacementForm />,
      formId: "plant-nursery-order-placement-form",
    });
  }, [openAppDialog]);
  return (
    <div className="w-full flex justify-end ">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <AppButton variant="outline" size="sm">
            Order Placement
          </AppButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>
            <AppText variant="body" size="text-sm">
              Select Order Type
            </AppText>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <AppText variant="caption" size="text-xs">
                  Online Orders
                </AppText>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={handleOrderPlacementFromText}>
                    <AppText variant="caption" size="text-xs">
                      From Text Message
                    </AppText>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOrderPlacementManually}>
                    <AppText variant="caption" size="text-xs">
                      Add Manually
                    </AppText>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={handlePlantNurserySales}>
              <AppText variant="caption" size="text-xs">
                Plant Nursery Sales
              </AppText>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
