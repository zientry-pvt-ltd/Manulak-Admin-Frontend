import { Calendar, CreditCard, Image } from "lucide-react";

import { AppButton, AppText } from "@/components";

const history = [
  {
    payment_method: "Partial Payment",
    date: "2025-10-12",
    paid_amount: 1250.0,
    slip_number: "SLIP-20251012-01",
    slip_file_url: "https://example.com/slip1.jpg",
    transaction_id: "TXN-20251012-01",
  },
  {
    payment_method: "Partial Payment",
    date: "2025-11-15",
    paid_amount: 2500.0,
    slip_number: "SLIP-20251115-01",
    slip_file_url: "https://example.com/slip2.jpg",
    transaction_id: "TXN-20251115-01",
  },
  {
    payment_method: "Full Payment",
    date: "2025-12-20",
    paid_amount: 3750.0,
    slip_number: "SLIP-20251220-01",
    slip_file_url: "https://example.com/slip3.jpg",
    transaction_id: "TXN-20251220-01",
  },
  {
    payment_method: "Refund",
    date: "2026-01-10",
    paid_amount: -500.0,
    slip_number: "SLIP-20260110-01",
    slip_file_url: "https://example.com/slip4.jpg",
    transaction_id: "TXN-20260110-01",
  },
  {
    payment_method: "Partial Payment",
    date: "2026-02-14",
    paid_amount: 1500.0,
    slip_number: "SLIP-20260214-01",
    slip_file_url: "https://example.com/slip5.jpg",
    transaction_id: "TXN-20260214-01",
  },
];

export const PaymentHistoryCard = () => {
  return (
    <div className="space-y-1 px-1.5 w-full max-h-[90vh] overflow-y-auto">
      {history.map((payment, index) => (
        <div className="flex gap-4" key={index}>
          {/* Timeline indicator */}
          <div className="flex flex-col items-center relative pt-1">
            <div className="w-2 h-2 bg-primary rounded-full ring-4 ring-primary/20 z-10" />
            {index !== history.length - 1 && (
              <div className="absolute top-4 w-0.5 h-full bg-gradient-to-b from-primary/40 to-transparent" />
            )}
          </div>

          {/* Payment card */}
          <div className="flex-1 pb-3">
            <div className="bg-card border rounded-lg p-3">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <AppText variant="caption" className="mb-1">
                    {payment.payment_method}
                  </AppText>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <AppText variant="caption" size="text-xs" color="muted">
                      {payment.date}
                    </AppText>
                  </div>
                </div>
                <div className="text-right">
                  <AppText variant="body" size="text-lg" weight="font-bold">
                    Rs. {payment.paid_amount.toFixed(2)}
                  </AppText>
                </div>
              </div>

              {/* Transaction details */}
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-3 h-3 text-muted-foreground" />
                <AppText
                  size="text-xs"
                  variant="caption"
                  color="muted"
                  className="font-mono"
                >
                  {payment.transaction_id}
                </AppText>
              </div>

              {/* View slip button */}
              <AppButton
                onClick={() => window.open(payment.slip_file_url, "_blank")}
                Icon={Image}
                size="sm"
                fullWidth
                variant={"secondary"}
              >
                View Payment Slip
              </AppButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
