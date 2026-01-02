"use client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransactionStore } from "@/stores/transaction"

export default function PriceSummary() {
  const tx = useTransactionStore(s => s.tx)
  const setPaying = useTransactionStore(s => s.setPaying)
  const router = useRouter()
  if (!tx) return null

  const payNow = () => {
    setPaying(true)

    setTimeout(() => {
      toast.success("Payment success. You can check it in your history.")
      router.push("/")
    }, 5000)
  }

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-lg space-y-3">
      <p className="font-semibold">Detail Price</p>

      <div className="flex justify-between text-sm">
        <span>Total ticket price</span>
        <span>Rp {tx.price.toLocaleString("id-ID")}</span>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-blue-500 text-lg">
        <span>Total</span>
        <span>Rp {tx.price.toLocaleString("id-ID")}</span>
      </div>

      <button
        onClick={payNow}
        className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-xl w-full"
      >
        Pay
      </button>
    </div>
  )
}
