import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram, FaTicketAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-t-2">
            <div className="container mx-auto text-center px-4 py-10">

                {/* Logo */}
                <h2 className="text-2xl font-bold flex items-center justify-center gap-1 mb-6">
                    <FaTicketAlt className="text-3xl" />
                    LOKET<span>CO</span>
                </h2>

                {/* Navigation */}
                <nav className="flex justify-center gap-8 text-sm uppercase tracking-widest mb-8">
                    <Link href="#" className="hover:underline underline-offset-4 decoration-2 transition">Home</Link>
                    <Link href="#" className="hover:underline underline-offset-4 decoration-2 transition">About</Link>
                    <Link href="#" className="hover:underline underline-offset-4 decoration-2 transition">Blog</Link>
                    <Link href="#" className="hover:underline underline-offset-4 decoration-2 transition">Contact</Link>
                    <Link href="#" className="hover:underline underline-offset-4 decoration-2 transition">Terms</Link>
                    <Link href="#" className="hover:underline underline-offset-4 decoration-2 transition">Privacy</Link>
                </nav>

                {/* Social icons */}
                <div className="flex justify-center gap-6 mb-10">
                    <Social icon={<FaTwitter />} />
                    <Social icon={<FaFacebookF />} />
                    <Social icon={<FaInstagram />} />
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-500">
                    Copyright ©{new Date().getFullYear()} All rights reserved by loketco.com
                </p>
            </div>
        </footer>
    );
}

function Social({ icon }: { icon: React.ReactNode }) {
    return (
        <a
            href="#"
            className="w-10 h-10 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-black transition"
        >
            {icon}
        </a>
    );
}
