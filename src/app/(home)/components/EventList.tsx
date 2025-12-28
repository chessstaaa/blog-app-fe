import EventCard from "./EventCard"
import { Event } from "@/types/event"

export default function EventList({
  events,
  limit,
}: {
  events: Event[]
  limit?: number
}) {
  const shown = limit ? events.slice(0, limit) : events

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {shown.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
