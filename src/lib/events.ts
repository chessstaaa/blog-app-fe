import { axiosInstance } from "./axios"
import { Event } from "@/types/event"

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await axiosInstance.get("/event")
  return res.data
}

export const getEventBySlug = async (slug: string): Promise<Event> => {
  const res = await axiosInstance.get(`/event/slug/${slug}`)
  return res.data
}
