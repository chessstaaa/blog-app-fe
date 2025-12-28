"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="bg-white border-b-2 border-[#3f3f3f] w-full">
      <div className="container mx-auto flex items-center justify-between p-4">
        <p className="text-2xl font-bold">LOKET<span className="">CO</span></p>

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
