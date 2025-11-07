import { formatDate } from "date-fns";
import { Calendar, CreditCard, Image } from "lucide-react";

import { AppButton, AppText } from "@/components";
import type { OrderTransactionHistoryItem } from "@/features/orders/types/order.type";

interface PaymentHistoryCardProps {
  paymentHistory?: OrderTransactionHistoryItem[];
}

export const PaymentHistoryCard = ({
  paymentHistory,
}: PaymentHistoryCardProps) => {
  if (!paymentHistory || paymentHistory.length === 0)
    return (
      <div className="flex justify-center items-center p-8 w-full">
        <AppText variant="body" color="muted">
          No payment history available.
        </AppText>
      </div>
    );

  return (
    <div className="space-y-1 px-1.5 w-full max-h-[90vh] overflow-y-auto">
      {paymentHistory.map((payment, index) => (
        <div className="flex gap-4" key={payment.payment_id}>
          {/* Timeline indicator */}
          <div className="flex flex-col items-center relative pt-1">
            <div className="w-2 h-2 bg-primary rounded-full ring-4 ring-primary/20 z-10" />
            {index !== paymentHistory.length - 1 && (
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
                    Partial Payment
                  </AppText>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <AppText variant="caption" size="text-xs" color="muted">
                      {formatDate(new Date(payment.payment_date), "dd/MM/yyyy")}
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
                  {payment.payment_slip_number}
                </AppText>
              </div>

              {/* View slip button */}
              <AppButton
                onClick={() => window.open(payment.payment_slip_url, "_blank")}
                Icon={Image}
                size="sm"
                fullWidth
                variant={"secondary"}
                disabled={!payment.payment_slip_url}
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
