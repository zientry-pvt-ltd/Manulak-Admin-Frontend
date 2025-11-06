import { AppButton, AppText } from "@/components";
import { selectApp } from "@/store/selectors";
import { useAppSelector } from "@/store/utils";

type OrderReceiptViewProps = {
  orderId: string;
};

export const OrderReceiptView = ({ orderId }: OrderReceiptViewProps) => {
  const { appLogo, appName } = useAppSelector(selectApp);

  const receiptData = {
    companyName: appName || "My Company",
    companyAddress: "123 Main Street, Colombo 00700, Sri Lanka",
    companyPhone: "+94 11 234 5678",
    receiverName: "John Doe",
    receiverAddress: "456 Galle Road, Dehiwala",
    postalCode: "10350",
    contactNo: "+94 77 123 4567",
    packageDescription: "Electronic items - Laptop and accessories",
    packageValue: "125,000.00",
    orderId: orderId,
    date: new Date().toLocaleDateString("en-GB"),
  };

  const handleDownloadPDF = async () => {
    const printWindow = window.open("", "", "height=800,width=800");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Receipt - Order ${receiptData.orderId}</title>
        <style>
          @page {
          size: auto;
          margin-top: 0;
          }
          body { 
            font-family: Arial, sans-serif; 
            margin-top: 10px;
            padding: 20px;
            color: #222;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
            margin-top: 60px;
          }
          .logo {
            height: 60px;
            margin-bottom: 10px;
          }
          .section {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
          }
          h3 {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .row {
            display: flex;
            font-size: 14px;
            margin: 4px 0;
          }
          .label {
            width: 120px;
            font-weight: bold;
            color: #555;
          }
          .value {
            color: #000;
          }
          @media print {
            body { padding: 0; margin: 0; }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <div>
            <img src="${appLogo}" alt="Company Logo" class="logo" />
            <div style="font-size: 24px; font-weight: bold;">${receiptData.companyName}</div>
            <div style="font-size: 14px; color: #555;">Order #${receiptData.orderId}</div>
          </div>
          <div style="text-align: right; font-size: 13px;">
            <div><strong>${receiptData.companyAddress}</strong></div>
            <div>${receiptData.companyPhone}</div>
            <div style="margin-top: 4px;">Date: ${receiptData.date}</div>
          </div>
        </div>

        <!-- Receiver Details -->
        <div class="section">
          <h3>Receiver Details</h3>
          <div class="row"><div class="label">Name:</div><div class="value">${receiptData.receiverName}</div></div>
          <div class="row"><div class="label">Address:</div><div class="value">${receiptData.receiverAddress}</div></div>
          <div class="row"><div class="label">Postal Code:</div><div class="value">${receiptData.postalCode}</div></div>
          <div class="row"><div class="label">Contact No.:</div><div class="value">${receiptData.contactNo}</div></div>
        </div>

        <!-- Package Details -->
        <div class="section">
          <h3>Package Details</h3>
          <div class="row"><div class="label">Description:</div><div class="value">${receiptData.packageDescription}</div></div>
          <div class="row"><div class="label">Value (Rs.):</div><div class="value" style="font-weight: bold;">${receiptData.packageValue}</div></div>
        </div>

        <div style="text-align: center; margin-top: 40px; font-size: 13px; color: #666;">
          Thank you for choosing ${receiptData.companyName}!
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `);

    printWindow.document.close();
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            <div className="flex">
              <AppText variant="caption">Name:</AppText>
              <AppText variant="caption">{receiptData.receiverName}</AppText>
            </div>
            <div className="flex">
              <AppText variant="caption">Address:</AppText>
              <AppText variant="caption">{receiptData.receiverAddress}</AppText>
            </div>
            <div className="flex">
              <AppText variant="caption">Postal Code:</AppText>
              <AppText variant="caption">{receiptData.postalCode}</AppText>
            </div>
            <div className="flex">
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
            <div className="flex">
              <AppText variant="caption">Description:</AppText>
              <AppText variant="caption">
                {receiptData.packageDescription}
              </AppText>
            </div>
            <div className="flex ml-auto">
              <AppText variant="caption" weight="font-bold">
                Value (Rs.):
              </AppText>
              <AppText variant="caption" weight="font-bold">
                {receiptData.packageValue}
              </AppText>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <AppButton onClick={handleDownloadPDF} size="sm" fullWidth>
          Download/Print PDF
        </AppButton>
      </div>
    </div>
  );
};

export default OrderReceiptView;
