import Image from "next/image"
import Link from "next/link"
import { Event } from "@/types/event"

function formatRange(start: string, end: string) {
  const opt: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
  return `${new Date(start).toLocaleDateString("en-GB", opt)} – ${new Date(end).toLocaleDateString("en-GB", opt)}`
}

function getStatus(e: Event) {
  const now = new Date()
  if (now < new Date(e.startAt)) return "Upcoming"
  if (now > new Date(e.endAt)) return "Past"
  return "Ongoing"
}

export default function EventCard({ event }: { event: Event }) {
  const status = getStatus(event)
  const soldRatio = event.availableSeats / event.totalSeats

  const categoryName =
    typeof event.category === "string"
      ? event.category
      : event.category?.name || "-"

  const organizerName =
    typeof event.organizer === "string"
      ? event.organizer
      : event.organizer?.name || "-"

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="relative rounded-2xl bg-white hover:shadow-md transition overflow-hidden border">

        {soldRatio < 0.15 && (
          <span className="absolute z-20 top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Almost Sold Out
          </span>
        )}

        <span
          className={`absolute z-20 top-3 left-3 text-xs px-3 py-1 rounded-full
          ${status === "Upcoming" && "bg-blue-500 text-white"}
          ${status === "Ongoing" && "bg-green-500 text-white"}
          ${status === "Past" && "bg-gray-500 text-white"}
          `}
        >
          {status}
        </span>

        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full h-full group-hover:scale-101 transition"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <span className="inline-block text-xs bg-blue-500 text-white rounded-full px-3 py-1">
            {categoryName}
          </span>

          <h3 className="font-bold truncate">{event.title}</h3>

          <p className="text-sm text-gray-500">
            {formatRange(event.startAt, event.endAt)}
          </p>

          <p className="font-semibold text-blue-500">
            {event.isFree ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
          </p>

          {/* Seat progress */}
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-500 rounded"
              style={{ width: `${soldRatio * 100}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">
            {event.availableSeats} seats left
          </p>

          <p className="text-sm text-gray-600 pt-2">
            {organizerName}
          </p>
        </div>
      </div>
    </Link>
  )
}
