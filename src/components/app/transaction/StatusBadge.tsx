"use client";

import { cn } from "@/lib/utils";
import { TransactionStatus } from "@/types/transaction";

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles = {
    WAITING_FOR_PAYMENT: "bg-gray-100 text-gray-700 border-gray-200",
    WAITING_FOR_ADMIN_CONFIRMATION:
      "bg-yellow-50 text-yellow-700 border-yellow-200 animate-pulse",
    PAID: "bg-green-50 text-green-700 border-green-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    EXPIRED: "bg-gray-100 text-gray-500 border-gray-200 line-through",
    CANCELED: "bg-red-50 text-red-700 border-red-200 line-through",
  };

  const labels = {
    WAITING_FOR_PAYMENT: "Waiting Payment",
    WAITING_FOR_ADMIN_CONFIRMATION: "Need Approval",
    PAID: "Completed",
    REJECTED: "Rejected",
    EXPIRED: "Expired",
    CANCELED: "Canceled",
  };

  console.log(status);

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
