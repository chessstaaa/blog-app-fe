import { create } from "zustand"
import { axiosInstance } from "@/lib/axios"
import { API_URL } from "@/lib/constants"

export const useReviewStore = create(() => ({
  getByEvent: async (eventId: number) => {
    const res = await axiosInstance.get(`/review?eventId=${eventId}`)
    return res.data
  },

  create: async (payload: { eventId: number; rating: number; comment: string }) => {
    return axiosInstance.post(`/review`, payload)
  }
}))