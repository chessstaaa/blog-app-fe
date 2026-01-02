import { create } from "zustand"
import axios from "axios"
import { API_URL } from "@/lib/constants"

export type Tx = {
  id: number
  price: number
  qty: number
  status: string
  expiresAt: string

  ticket?: {
    id: number
    name: string
    price: number
  }

  event?: {
    id: number
    title: string
    location: string
    image: string
    startAt: string
  }
}

type Store = {
  tx: Tx | null
  isPaying: boolean
  setPaying: (v: boolean) => void
  resetTx: () => void

  createTransaction: (payload: any) => Promise<void>
  uploadProof: (file: File) => Promise<void>

  fetchMyHistory: () => Promise<Tx[]>   // ✅ WAJIB ADA DI TYPE
}

export const useTransactionStore = create<Store>((set, get) => ({
  tx: null,
  isPaying: false,

  setPaying: (v) => set({ isPaying: v }),

  resetTx: () => set({ tx: null, isPaying: false }),

  createTransaction: async (payload) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("NO TOKEN")

    const items = payload.items.map(
      (i: { ticketId: number; qty: number }) => ({
        ticketId: i.ticketId,
        qty: i.qty
      })
    )

    const res = await axios.post(
      `${API_URL}/transactions`,
      {
        eventId: payload.eventId,
        items,                                  // DTO (future)
        ticketId: items[0].ticketId,            // legacy
        qty: items[0].qty,                      // legacy
        voucherId: payload.voucherId,
        pointsUsed: payload.pointsUsed || 0
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    set({ tx: res.data, isPaying: false })
  },

  uploadProof: async (file) => {
    const { tx } = get()
    const token = localStorage.getItem("token")

    const fd = new FormData()
    fd.append("image", file)

    const res = await axios.post(
      `${API_URL}/transactions/${tx!.id}/proof`,
      fd,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    set({ tx: res.data })
  },

  fetchMyHistory: async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${API_URL}/transactions/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  }
}))
