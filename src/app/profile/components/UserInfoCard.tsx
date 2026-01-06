import { auth } from "@/auth"
import { api } from "@/lib/api"

async function fetchUserProfile(userToken: string) {
  try {
    const res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    return res.data
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    return null
  }
}

export default async function UserInfoCard() {
  const session = await auth()
  const userToken = session?.user?.userToken

  if (!userToken) return null

  const user = await fetchUserProfile(userToken)

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
