import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosInstance.get("/event")
      return res.data
    },
  })
}