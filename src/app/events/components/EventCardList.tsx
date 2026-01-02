import EventCard from "@/app/(home)/components/EventCard"
import { Event } from "@/types/event"

interface EventCardListProps {
  events: Event[]
}

export default function EventCardList({ events }: EventCardListProps) {
  if (events.length === 0) {
    return <div className="text-center py-10 text-gray-500">No events found matching your criteria.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {events.map((event, index) => (
        <EventCard key={event.id || index} event={event} />
      ))}
    </div>
  )
}