"use client";

// import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaTicketAlt } from "react-icons/fa";


const Navbar = () => {

    return (
        <div className="bg-white border-b-2">
            <div className="container mx-auto flex items-center justify-between p-4">
                <a href="/">
                    <h1 className="text-xl font-bold flex items-center gap-1"><FaTicketAlt className="text-3xl" />LOKET<span className="">CO</span></h1>
                </a>

                <div className="flex items-center gap-2">
                    <Link href="#">
                        <Button className="bg-white text-black border rounded-full hover:bg-gray-100">Login</Button>
                    </Link>
                    <Link href="#">
                        <Button className="bg-white text-black border rounded-full hover:bg-gray-100">Register</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;