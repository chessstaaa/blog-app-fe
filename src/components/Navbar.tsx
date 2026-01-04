"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaTicketAlt, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user as any;
  const isOrganizer = user?.role === "organizer";
  const isLogin = status === "authenticated";

  const handleLogout = async () => {
    // Logout via NextAuth
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <div className="border-b-2 bg-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="flex cursor-pointer items-center gap-1 text-xl font-bold">
            <FaTicketAlt className="text-3xl" /> LOKET<span>CO</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          {!isLogin ? (
            <>
              <Link href="/login">
                <Button className="rounded-full border bg-white text-black hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-full border bg-white text-black hover:bg-gray-100">
                  Register
                </Button>
              </Link>
              {isOrganizer && (
                <Link href="/dashboard">
                  <Button className="rounded-full border bg-white text-black hover:bg-gray-100">
                    Dashboard
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="rounded-full border px-4 py-2 hover:bg-slate-100"
              >
                Profile
              </button>

              <Button
                onClick={handleLogout}
                className="rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
