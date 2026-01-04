"use client"
import { useState, useEffect } from "react"
import { Event } from "@/types/event"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_URL } from "@/lib/constants"
import { useTransactionStore } from "@/stores/transaction"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useReviewStore } from "@/stores/review"


type Ticket = {
  id: number
  name: string
  price: number
  quantityAvailable: number
}

type Voucher = {
  id: number
  code: string
  discountAmount: number
  usageLimit: number
  usedCount: number
  startAt: string
  endAt: string
}

export default function EventTabs({ event }: { event: Event }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const createTransaction = useTransactionStore(s => s.createTransaction)
  const resetTx = useTransactionStore(s => s.resetTx)

  const [selectedTickets, setSelectedTickets] = useState<
    { id: number; name: string; price: number; qty: number }[]
  >([])

  const [voucherId, setVoucherId] = useState<number | undefined>()
  const [pointsUsed] = useState(0)

  const { data: related = [] } = useQuery<Ticket[]>({
    queryKey: ["tickets", event.id],
    queryFn: async () => (await axios.get(`${API_URL}/tickets?eventId=${event.id}`)).data
  })

  const { data: vouchers = [] } = useQuery<Voucher[]>({
    queryKey: ["vouchers", event.id],
    queryFn: async () => (await axios.get(`${API_URL}/voucher?eventId=${event.id}`)).data
  })

  const MAX_PER_TICKET = 5
  const [tab, setTab] = useState<"desc" | "ticket" | "rating">("ticket")
  const [cart, setCart] = useState<Record<number, number>>({})
  const [voucherCode, setVoucherCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [voucherError, setVoucherError] = useState("")

  const soldOutEvent = related.length > 0 && related.every(t => t.quantityAvailable === 0)

  function changeQty(id: number, delta: number) {
    setCart(prev => {
      const current = prev[id] || 0
      const stock = related.find(t => t.id === id)?.quantityAvailable || 0
      const maxAllowed = Math.min(stock, MAX_PER_TICKET)
      return { ...prev, [id]: Math.max(0, Math.min(maxAllowed, current + delta)) }
    })
  }

  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const t = related.find(x => x.id === Number(id))
    return sum + (t ? (event.isFree ? 0 : t.price * qty) : 0)
  }, 0)

  const relatedVoucher = vouchers.find(v => v.code === voucherCode)

  useEffect(() => {
    setDiscount(0)
    setVoucherError("")
  }, [JSON.stringify(cart)])

  function applyVoucher() {
    if (event.isFree) return setVoucherError("Voucher not applicable for free events")
    if (subtotal === 0) return setVoucherError("Select ticket first")
    if (!relatedVoucher) return setVoucherError("Invalid voucher")

    const now = new Date()
    if (now < new Date(relatedVoucher.startAt) || now > new Date(relatedVoucher.endAt))
      return setVoucherError("Voucher expired")
    if (relatedVoucher.usedCount >= relatedVoucher.usageLimit)
      return setVoucherError("Voucher quota exceeded")

    setVoucherId(relatedVoucher.id)
    setDiscount(Math.min(subtotal, relatedVoucher.discountAmount))
    setVoucherError("")
  }

  const total = Math.max(0, subtotal - discount)

  const checkout = async () => {
    if (status !== "authenticated") {
      toast.warning("Please login to continue", {
        description: "You must login before purchasing tickets"
      })
      return
    }

    const items = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({
        ticketId: Number(id),
        qty
      }))

    if (items.length === 0) {
      toast.error("Select ticket first")
      return
    }

    resetTx()
    await createTransaction({
      eventId: event.id,
      items,
      voucherId,
      pointsUsed
    })

    router.push("/checkout")
  }

  const reviewStore = useReviewStore()
  const [reviews, setReviews] = useState<any[]>([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  useEffect(() => {
    reviewStore.getByEvent(event.id).then(setReviews)
  }, [event.id])

  const submitReview = async () => {
    try {
      await reviewStore.create({ eventId: event.id, rating, comment })
      toast.success("Review submitted")
      setComment("")
      setReviews(await reviewStore.getByEvent(event.id))
    } catch (e: any) {
      if (e.message === "NO_LOGIN") toast.error("Please login to leave review")
      else toast.error(e.response?.data?.message || "Failed to submit review")
    }
  }


  return (
    <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm">
      <div className="flex gap-6 border-b">
        <button onClick={() => setTab("desc")}
          className={`pb-2 font-semibold ${tab === "desc" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}>
          Description
        </button>

        <button onClick={() => setTab("ticket")}
          className={`pb-2 font-semibold ${tab === "ticket" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}>
          Tickets
        </button>

        <button onClick={() => setTab("rating")}
          className={`pb-2 font-semibold ${tab === "rating" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}>
          Ratings
        </button>
      </div>

      {tab === "desc" && <p className="text-gray-700 leading-relaxed">{event.description}</p>}

      {tab === "ticket" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {soldOutEvent && (
              <div className="border border-red-200 bg-red-50 text-red-600 p-4 rounded-xl text-center font-semibold">
                🚫 All tickets are sold out
              </div>
            )}

            {related.map(t => {
              const current = cart[t.id] || 0
              const soldOut = t.quantityAvailable === 0
              const reachedLimit = current >= MAX_PER_TICKET

              return (
                <div key={t.id} className={`border rounded-xl p-4 ${soldOut && "opacity-60"}`}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      {t.name}
                      {event.isFree && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">FREE EVENT</span>}
                    </h3>
                    {soldOut && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">SOLD OUT</span>}
                  </div>

                  {!event.isFree && <p className="text-sm text-gray-500 mb-2">{t.quantityAvailable} seats left</p>}

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-500">
                      {event.isFree ? "FREE" : `Rp ${t.price.toLocaleString("id-ID")}`}
                    </span>

                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(t.id, -1)} disabled={current === 0 || soldOut}
                        className={`w-8 h-8 border rounded-lg ${current === 0 || soldOut ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-100"}`}>−</button>
                      <span className="w-6 text-center">{current}</span>
                      <button onClick={() => changeQty(t.id, 1)} disabled={soldOut || reachedLimit}
                        className={`w-8 h-8 rounded-lg ${soldOut || reachedLimit ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-slate-400"}`}>+</button>
                    </div>
                  </div>

                  {reachedLimit && <p className="text-xs text-red-500 mt-2">*Max {MAX_PER_TICKET} tickets per person</p>}
                </div>
              )
            })}
          </div>

          <div className="space-y-4">
            <div className="border rounded-xl p-4">
              <p className="font-semibold mb-1">Total price</p>
              <p className="text-2xl font-bold text-blue-500 mb-4">Rp {total.toLocaleString("id-ID")}</p>
              <button disabled={total === 0} onClick={checkout}
                className={`w-full py-2 rounded-xl ${total === 0 ? "bg-slate-200" : "bg-blue-500 text-white hover:bg-slate-400"}`}>
                Checkout
              </button>
            </div>

            <div className="border rounded-xl p-4">
              <p className="font-semibold mb-1">Voucher Code</p>
              <div className="flex gap-2">
                <input value={voucherCode} onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                  className="border px-3 py-2 rounded-full w-full" placeholder="XXXX" />
                <button onClick={applyVoucher} className="px-4 rounded-full bg-blue-500 text-white hover:bg-slate-400">Apply</button>
              </div>

              {relatedVoucher && !voucherError && (
                <div className="mt-2 text-sm bg-slate-50 border p-2 rounded">
                  <b>{relatedVoucher.code}</b> – Rp {relatedVoucher.discountAmount.toLocaleString("id-ID")} off<br />
                  Remaining: {relatedVoucher.usageLimit - relatedVoucher.usedCount}
                </div>
              )}

              {voucherError && <p className="text-xs text-red-500 mt-2">{voucherError}</p>}
            </div>
          </div>
        </div>
      )}

      {tab === "rating" && (
        <div className="space-y-4">

          <h3 className="font-bold text-lg">Reviews & Ratings</h3>

          {reviews.map(r => (
            <div key={r.id} className="border rounded-2xl p-3">
              <p className="font-semibold">{r.user.name}</p>
              <p className="text-yellow-500">⭐ {r.rating}/5</p>
              <p className="text-sm text-gray-600">{r.comment}</p>
            </div>
          ))}

          <div className="border rounded-xl p-4">
            <p className="font-semibold mb-2">Leave a Review</p>

            <select value={rating} onChange={e => setRating(+e.target.value)}
              className="border rounded-full p-2 w-full mb-2">
              {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
            </select>

            <textarea value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your experience..."
              className="border rounded-2xl p-2 w-full" />

            <button onClick={submitReview}
              className="mt-2 bg-blue-500 text-white w-full py-2 rounded-full hover:bg-blue-400">
              Submit Review
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
