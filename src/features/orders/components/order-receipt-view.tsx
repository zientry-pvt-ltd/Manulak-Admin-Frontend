import { type ReactNode, useEffect, useMemo } from "react";

import { AppButton, AppText } from "@/components";
import { setSelectedOrderId } from "@/features/orders/store/order-slice";
import {
  generateReceiptPDF,
  type ReceiptData,
} from "@/features/orders/utils/receiptPdfGenerator";
import { useGetOrderMetadataQuery } from "@/services/orders";
import { selectApp } from "@/store/selectors";
import { selectOrder } from "@/store/selectors/orderSelector";
import { useAppDispatch, useAppSelector } from "@/store/utils";
import { formatCurrencyInput } from "@/utils/Formatting";

type OrderReceiptViewProps = {
  orderId: string;
};

const ReceiptContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-md mx-auto h-[450px] flex flex-col">{children}</div>;
};

export const OrderReceiptView = ({ orderId }: OrderReceiptViewProps) => {
  const { appLogo, appName } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();

  const { selectedOrderId } = useAppSelector(selectOrder);

  const shouldSkip = useMemo(
    () => ({ skip: !selectedOrderId }),
    [selectedOrderId],
  );
  const { data, isLoading, isError } = useGetOrderMetadataQuery(
    selectedOrderId,
    shouldSkip,
  );

  const receiptData: ReceiptData = {
    companyName: appName || "My Company",
    companyAddress: "123 Main Street, Colombo 00700, Sri Lanka",
    companyPhone: "071 869 14 16",

    receiverName: data?.data
      ? `${data.data.first_name} ${data.data.last_name}`
      : "N/A",
    receiverAddress:
      `${data?.data?.address_line_1 || ""} ${
        data?.data?.address_line_2 || ""
      } ${data?.data?.address_line_3 || ""}`.trim() || "N/A",
    postalCode: data?.data?.postal_code.toString() || "N/A",
    contactNo: data?.data?.primary_phone_number || "N/A",
    packageDescription: "N/A",
    packageValue:
      formatCurrencyInput((data?.data?.order_value ?? "").toString()) || "N/A",
    orderId: orderId,
    date: new Date().toLocaleDateString("en-GB"),
  };

  const handleDownloadPDF = () => generateReceiptPDF(receiptData, appLogo);

  useEffect(() => {
    return () => {
      dispatch(setSelectedOrderId(null));
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <ReceiptContainer>
        <div className="flex justify-center items-center h-full">
          <AppText variant="body">Generating receipt...</AppText>
        </div>
      </ReceiptContainer>
    );
  }

  if (isError) {
    return (
      <ReceiptContainer>
        <div className="flex justify-center items-center h-full">
          <AppText variant="body" color="destructive">
            Failed to generate receipt
          </AppText>
        </div>
      </ReceiptContainer>
    );
  }

  if (!data) {
    return (
      <ReceiptContainer>
        <div className="flex justify-center items-center h-full">
          <AppText variant="body">No order data available</AppText>
        </div>
      </ReceiptContainer>
    );
  }

  return (
    <ReceiptContainer>
      <div className="border p-6 rounded-md space-y-3">
        {/* Header with Logo and Company Address */}
        <div className="flex justify-between items-start border-b">
          <div className="flex flex-col items-start flex-1 py-3">
            {appLogo && (
              <img
                src={appLogo}
                alt="Company Logo"
                className="h-10 object-cover"
              />
            )}
            <AppText variant="heading" size="text-2xl">
              {receiptData.companyName}
            </AppText>
          </div>
          <div className="text-right">
            <AppText variant="caption" weight="font-semibold">
              {receiptData.companyAddress}
            </AppText>
            <AppText variant="caption">{receiptData.companyPhone}</AppText>
            <AppText variant="caption">Date: {receiptData.date}</AppText>
          </div>
        </div>

        {/* Receiver Details */}
        <div>
          <AppText variant="subheading" className="mb-2">
            Receiver Details
          </AppText>
          <div className="space-y-0.5 text-sm">
            <div className="flex gap-x-1">
              <AppText variant="caption">Name:</AppText>
              <AppText variant="caption">{receiptData.receiverName}</AppText>
            </div>
            <div className="flex gap-x-1">
              <AppText variant="caption">Address:</AppText>
              <AppText variant="caption">{receiptData.receiverAddress}</AppText>
            </div>
            <div className="flex gap-x-1">
              <AppText variant="caption">Postal Code:</AppText>
              <AppText variant="caption">{receiptData.postalCode}</AppText>
            </div>
            <div className="flex gap-x-1">
              <AppText variant="caption">Contact No.:</AppText>
              <AppText variant="caption">{receiptData.contactNo}</AppText>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div>
          <AppText variant="subheading" className="mb-2">
            Package Details
          </AppText>
          <div className="space-y-2 text-sm">
            <div className="flex gap-x-1">
              <AppText variant="caption">Description:</AppText>
              <AppText variant="caption">
                {receiptData.packageDescription}
              </AppText>
            </div>
            <div className="flex gap-x-1">
              <AppText variant="caption" weight="font-bold">
                Value (Rs.):
              </AppText>
              <AppText variant="caption" weight="font-bold">
                {formatCurrencyInput(receiptData.packageValue.toString())}
              </AppText>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex justify-center gap-4">
        <AppButton onClick={handleDownloadPDF} size="sm" fullWidth>
          Download/Print PDF
        </AppButton>
      </div>
    </ReceiptContainer>
  );
};

export default OrderReceiptView;
