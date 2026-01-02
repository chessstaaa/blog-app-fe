import { create } from "zustand"
import axios from "axios"
import { API_URL } from "@/lib/constants"

export const useReviewStore = create(() => ({
  getByEvent: async (eventId: number) => {
    const res = await axios.get(`${API_URL}/review?eventId=${eventId}`)
    return res.data
  },

  create: async (payload: { eventId: number; rating: number; comment: string }) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("NO_LOGIN")

    return axios.post(`${API_URL}/review`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}))