import { API_URL } from "@/lib/constants"
import Image from "next/image"
import { notFound } from "next/navigation"
import EventTabs from "./components/EventTabs"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import { TbClockHour4Filled } from "react-icons/tb"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function EventDetail({ params }: Props) {
  const { slug } = await params   // 🔥 INI WAJIB DI NEXT 16

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/slug/${slug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return notFound()
  const event = await res.json()

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-3 gap-4">

          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-80 rounded-2xl overflow-hidden bg-gray-100">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Image not available
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-5 h-fit space-y-3 shadow-sm rounded-2xl">
            <h2 className="font-bold text-xl">{event.title}</h2>

            <p className="flex items-center gap-4">
              <FaMapMarkerAlt /> {event.location}
            </p>

            <p className="flex items-center gap-4">
              <FaCalendarAlt /> {new Date(event.startAt).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-4">
              <TbClockHour4Filled />
              {new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(event.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>

            <p className="pt-3 text-sm text-gray-600">
              {event.organizer.name}
            </p>
          </div>

          <div className="col-span-3">
            <EventTabs event={event} />
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
