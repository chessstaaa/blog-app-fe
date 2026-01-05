"use client"
import { useTransactionStore } from "@/stores/transaction"

export default function OrderDetailCard() {
    const tx = useTransactionStore(s => s.tx)
    if (!tx) return null

    return (
        <div className="space-y-4">
            <div className="flex gap-3 sm:gap-4">
                <div className="w-full h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-2xl overflow-hidden bg-gray-100">
                    {tx.event?.image ? (
                        <img
                            src={tx.event.image}
                            alt={tx.event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Image not available
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t pt-3 flex justify-between items-end gap-3">
                <div>
                    <p className="font-semibold text-sm sm:text-base">{tx.ticket?.name}</p>
                    <p className="text-xs text-gray-400">{tx.qty} ticket</p>
                </div>
                <p className="font-semibold text-sm sm:text-base">Rp {tx.price.toLocaleString("id-ID")}</p>
            </div>
        </div>
    )
}
