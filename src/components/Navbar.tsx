"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaTicketAlt } from "react-icons/fa";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="bg-white border-b-2 border-[#3f3f3f] w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold flex items-center gap-1"><FaTicketAlt className="text-3xl"/> LOKET.CO</h1>

        <div className="flex items-center gap-1">
          <Button>Daftar</Button>

          {session.status === "unauthenticated" ? (
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          ) : (
            <Button variant="destructive" onClick={() => signOut()}>
              Keluar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
