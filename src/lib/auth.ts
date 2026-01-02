import { api } from "./api"

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password })
  localStorage.setItem("token", res.data.accessToken)
  return res.data
}

export const register = async (body: any) => {
  return api.post("/auth/register", body)
}

export const getToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export const isLoggedIn = () => {
  return !!getToken()
}

export const logout = () => {
  localStorage.removeItem("token")
  window.location.href = "/login"
}

export const getProfile = async () => {
  const token = getToken()
  if (!token) throw new Error("NO TOKEN")

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}
