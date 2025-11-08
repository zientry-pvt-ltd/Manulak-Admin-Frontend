export interface ReceiptData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  receiverName: string;
  receiverAddress: string;
  postalCode: string;
  contactNo: string;
  packageDescription: string;
  packageValue: string | number;
  orderId: string;
  date: string;
}

export const generateReceiptPDF = (
  receiptData: ReceiptData,
  appLogo?: string,
): void => {
  const printWindow = window.open("", "", "height=800,width=800");
  if (!printWindow) return;

  const htmlContent = createReceiptHTML(receiptData, appLogo);

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

const createReceiptHTML = (
  receiptData: ReceiptData,
  appLogo?: string,
): string => {
  return `
    <html>
      <head>
        <title>Receipt - Order ${receiptData.orderId}</title>
        <style>
          ${getReceiptStyles()}
        </style>
      </head>
      <body>
        ${createReceiptBody(receiptData, appLogo)}
        
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
  `;
};

const getReceiptStyles = (): string => {
  return `
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
  `;
};

const createReceiptBody = (
  receiptData: ReceiptData,
  appLogo?: string,
): string => {
  return `
    <!-- Header -->
    <div class="header">
      <div>
        ${appLogo ? `<img src="${appLogo}" alt="Company Logo" class="logo" />` : ""}
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
  `;
};
