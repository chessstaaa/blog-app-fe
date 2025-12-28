import { events } from "@/lib/events"
import Image from "next/image"
import { notFound } from "next/navigation"
import EventTabs from "./components/EventTabs"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { TbClockHour4Filled } from "react-icons/tb";

type Props = {
  params: Promise<{ slug: string }>
}

export default async function EventDetail({ params }: Props) {
  const { slug } = await params
  const event = events.find(e => e.slug === slug)
  if (!event) return notFound()

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-3 gap-4">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={600}
              className="rounded-2xl"
            />


          </div>
          {/* RIGHT INFO CARD */}
          <div className="bg-white p-5 h-fit space-y-3 shadow-sm rounded-2xl">
            <h2 className="font-bold text-xl">{event.title}</h2>
            <p className="flex items-center gap-4"><FaMapMarkerAlt />{event.location}</p>
            <p className="flex items-center gap-4"><FaCalendarAlt />{new Date(event.startAt).toLocaleDateString()}</p>
            {/* <p>💰 {event.isFree ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}</p> */}
            <p className="flex items-center gap-4"><TbClockHour4Filled />{new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

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
