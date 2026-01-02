"use client"
import { useTransactionStore } from "@/stores/transaction"

export default function WaitingAdminBanner() {
  const paying = useTransactionStore(s => s.isPaying)
  if (!paying) return null

  return (
    <div className="bg-purple-300 text-purple-900 px-5 py-3 rounded-xl flex items-center gap-2">
      ℹ️ Please wait while the admin confirms your payment.
    </div>
  )
}
