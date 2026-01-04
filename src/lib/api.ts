import axios from "axios"
import { getSession } from "next-auth/react"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config) => {
  try {
    const session = await getSession()
    if (session?.user?.userToken) {
      config.headers.Authorization = `Bearer ${session.user.userToken}`
    }
  } catch (error) {
    console.error("Error getting session:", error)
  }
  return config
})