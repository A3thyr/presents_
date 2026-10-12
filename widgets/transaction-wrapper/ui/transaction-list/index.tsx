import { PaymentService } from "@/entities/payment/payment.service";
import { useQuery } from "@tanstack/react-query";
import { EmptyTransactions } from "../empty-transaction";
import { TransactionItem } from "../transaction-item";

export const TransactionList = () => {
  const query = useQuery({
    queryKey: ["payment/transactions"],
    queryFn: PaymentService.getTransactions,
    staleTime: 3 * 60 * 1000,
  });

  if (query.isLoading) return null;

  if (!query.data || query.data.length === 0) return <EmptyTransactions />;

  return (
    <div className="flex gap-1 flex-col">
      {query.data.map((tx) => (
        <TransactionItem transaction={tx} key={tx.id} />
      ))}
    </div>
  );
};
