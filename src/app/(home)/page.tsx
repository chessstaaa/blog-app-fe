import React from "react"
import FirstMainSec from "./components/FirstMainSec"
import SecondMainSec from "./components/SecondMainSec"
import LatestEvents from "./components/LatestEvents"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const page = () => {
  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto px-4 py-10">

        {/* 1ST SECTION */}
        <FirstMainSec />

        {/* 2ND SECTION */}
        <SecondMainSec />

        {/* 3RD SECTION – EVENT LIST */}
        <LatestEvents />

      </div>
      <Footer />
    </div>
  )
}

export default page
