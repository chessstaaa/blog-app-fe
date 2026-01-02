"use client"
import { useTransactionStore } from "@/stores/transaction"

export default function OrderDetailCard() {
    const tx = useTransactionStore(s => s.tx)
    if (!tx) return null

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <img src={`/uploads/events/${tx.event?.image}`} className="w-44 rounded-xl" />
                <div>
                    <h2 className="font-bold text-lg">{tx.event?.title}</h2>
                    <p className="text-sm text-gray-500">{tx.event?.location}</p>
                    <p className="text-sm text-gray-500">
                        {tx.event?.startAt && new Date(tx.event.startAt).toLocaleDateString()} • {tx.event?.startAt && new Date(tx.event.startAt).toLocaleTimeString()}
                    </p>
                </div>
            </div>

            <div className="border-t pt-3 flex justify-between">
                <div>
                    <p className="font-semibold">{tx.ticket?.name}</p>
                    <p className="text-xs text-gray-400">{tx.qty} ticket</p>
                </div>
                <p className="font-semibold">Rp {tx.price.toLocaleString("id-ID")}</p>
            </div>
        </div>
    )
}
