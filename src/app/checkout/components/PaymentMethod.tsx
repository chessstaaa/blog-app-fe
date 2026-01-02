"use client"
import { useTransactionStore } from "@/stores/transaction"
import QRCode from "react-qr-code"

export default function PaymentMethod() {
  const tx = useTransactionStore(s => s.tx)
  if (!tx) return null

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm space-y-3">
      <h3 className="font-semibold">QRIS</h3>

      <QRCode
        value={`PAY|TRX-${tx.id}|TOTAL-${tx.price}`}
        size={180}
      />

      <p className="text-sm text-gray-500">
        Scan this QR with any E-Wallet to pay
      </p>
    </div>
  )
}
