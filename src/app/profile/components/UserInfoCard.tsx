"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { axiosInstance } from "@/lib/axios"

export default function UserInfoCard() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated" && session?.user?.userToken) {
      axiosInstance
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${session.user.userToken}`,
          },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Failed to fetch user profile:", err)
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [session, status])

  if (loading) return <div className="bg-white rounded-lg p-4 animate-pulse h-40" />
  if (!user) return null

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl border p-4 sm:p-6 shadow-sm space-y-3">
      <h2 className="text-base sm:text-lg font-bold">My Account</h2>

      <div>
        <p className="text-xs sm:text-sm text-gray-500">Name</p>
        <p className="font-semibold text-sm sm:text-base">{user.name}</p>
      </div>

      <div>
        <p className="text-xs sm:text-sm text-gray-500">Email</p>
        <p className="font-semibold text-sm sm:text-base break-all">{user.email}</p>
      </div>

      <div>
        <p className="text-xs sm:text-sm text-gray-500">Points</p>
        <p className="font-semibold text-sm sm:text-base">{user.pointsBalance} pts</p>
      </div>
    </div>
  )
}
