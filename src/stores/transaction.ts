import { create } from "zustand"
import { axiosInstance } from "@/lib/axios"
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

  fetchMyHistory: () => Promise<Tx[]>
}

export const useTransactionStore = create<Store>((set, get) => ({
  tx: null,
  isPaying: false,

  setPaying: (v) => set({ isPaying: v }),

  resetTx: () => set({ tx: null, isPaying: false }),

  createTransaction: async (payload) => {
    const items = payload.items.map(
      (i: { ticketId: number; qty: number }) => ({
        ticketId: i.ticketId,
        qty: i.qty
      })
    )

    const res = await axiosInstance.post(
      `/transactions`,
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
          "Content-Type": "application/json"
        }
      }
    )

    set({ tx: res.data, isPaying: false })
  },

  uploadProof: async (file) => {
    const { tx } = get()

    const fd = new FormData()
    fd.append("image", file)

    const res = await axiosInstance.post(
      `/transactions/${tx!.id}/proof`,
      fd
    )

    set({ tx: res.data })
  },

  fetchMyHistory: async () => {
    const res = await axiosInstance.get(`/transactions/my`)
    return res.data
  }
}))
