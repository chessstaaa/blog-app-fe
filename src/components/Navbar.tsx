"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { FaTicketAlt, FaUserCircle } from "react-icons/fa"
import { useEffect, useState } from "react"
import { getToken, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter() // 👈 WAJIB

  useEffect(() => {
    setIsLogin(!!getToken())
  }, [])

  return (
    <div className="bg-white border-b-2">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="text-xl font-bold flex items-center gap-1 cursor-pointer">
            <FaTicketAlt className="text-3xl" /> LOKET<span>CO</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">

          {!isLogin ? (
            <>
              <Link href="/login">
                <Button className="bg-white text-black border rounded-full hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-black border rounded-full hover:bg-gray-100">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="px-4 py-2 rounded-full border hover:bg-slate-100"
              >
                Profile
              </button>

              <Button
                onClick={logout}
                className="bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default Navbar
