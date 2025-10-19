import { PaymentHistoryCard } from "@/features/orders/components/payment-history-card";

export const PaymentInfoTab = () => {
  return (
    <div className="flex gap-4 h-full overflow-hidden">
      {/* form for add payment*/}
      <form className="min-w-1/2 h-full overflow-hidden">Payment data</form>

      <PaymentHistoryCard />
    </div>
  );
};
