import React from 'react'
import { FaRegCopyright } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-[#3f3f3f] w-full">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Footer Links */}
          <div className="flex flex-col gap-3">
            <a href="#" className="font-semibold text-black hover:text-[#99a2aa] transition">
              About Us
            </a>
            <a href="#" className="font-semibold text-black hover:text-[#99a2aa] transition">
              Contact Us
            </a>
            <a href="#" className="font-semibold text-black hover:text-[#99a2aa] transition">
              FAQ
            </a>
            <a href="#" className="font-semibold text-black hover:text-[#99a2aa] transition">
              Privacy Policy
            </a>
            <a href="#" className="font-semibold text-black hover:text-[#99a2aa] transition">
              Terms of Service
            </a>
            <a href="#" className="font-semibold text-black hover:text-[#99a2aa] transition">
              Careers
            </a>
          </div>

          {/* Footer Branding */}
          <div className="space-y-4 text-black">
            <p className="text-2xl font-bold">LOKET<span className="">CO</span></p>
            <p className="flex items-center gap-1 text-sm text-[#99a2aa]">
              <FaRegCopyright />
              2025 LOKETCO. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
