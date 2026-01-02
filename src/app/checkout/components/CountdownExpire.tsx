"use client"
import { useTransactionStore } from "@/stores/transaction"
import { useEffect, useState } from "react"

export default function CountdownExpire() {
    const tx = useTransactionStore(s => s.tx)
    const [left, setLeft] = useState(0)

    useEffect(() => {
        if (!tx?.expiresAt) return
        const t = setInterval(() => {
            setLeft(new Date(tx.expiresAt).getTime() - Date.now())
        }, 1000)
        return () => clearInterval(t)
    }, [tx?.expiresAt])

    if (left <= 0) return null

    return (
        <div className="bg-yellow-400 text-black px-5 py-3 rounded-xl flex justify-between items-center">
            <span>⏰ Your order will expire in</span>
            <b>{Math.floor(left / 60000)}:{Math.floor((left % 60000) / 1000).toString().padStart(2, "0")}</b>
        </div>
    )
}
