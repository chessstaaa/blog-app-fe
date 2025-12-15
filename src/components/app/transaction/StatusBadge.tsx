import { cn } from "@/lib/utils";
import { TransactionStatus } from "@/types/transaction";

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles = {
    waiting_payment: "bg-gray-100 text-gray-700 border-gray-200",
    waiting_admin:
      "bg-yellow-50 text-yellow-700 border-yellow-200 animate-pulse",
    done: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    expired: "bg-gray-100 text-gray-500 border-gray-200 line-through",
    canceled: "bg-red-50 text-red-700 border-red-200 line-through",
  };

  const labels = {
    waiting_payment: "Waiting Payment",
    waiting_admin: "Need Approval",
    done: "Completed",
    rejected: "Rejected",
    expired: "Expired",
    canceled: "Canceled",
  };

  return (
    <span
      className={cn(
        "focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
