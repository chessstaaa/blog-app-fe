import { EventTypes } from "@/types/event";
import { formatIDR } from "@/lib/utils";
import { MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EventCardProps {
  event: EventTypes;
  handleEditClick: (event: EventTypes) => void;
}

export function EventCard(props: EventCardProps) {
  const { event, handleEditClick } = props;
  return (
    <div
      key={event.id}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
      {/* Image Cover */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            fill
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-sm">
          {event.category.name}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <span
            className={`text-sm font-bold ${event.isFree ? "text-green-600" : "text-blue-900"}`}
          >
            {event.isFree ? "GRATIS" : formatIDR(event.price)}
          </span>
        </div>

        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-blue-700">
          {event.title}
        </h3>

        <div className="mb-4 flex-1 space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span>{new Date(event.startAt).toLocaleDateString("id-ID")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span>Kuota: {event.availableSeats}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Button
            onClick={() => handleEditClick(props.event)}
            variant="outline"
            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Edit Detail
          </Button>
        </div>
      </div>
    </div>
  );
}
