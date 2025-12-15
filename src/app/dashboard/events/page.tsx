"use client";

import { useState } from "react";
import { Plus, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { EventForm } from "@/components/app/event/AddEventForm";
import { EventFormValues } from "@/lib/validators/event";
import { formatIDR } from "@/lib/utils";

const initialEvents = [
  {
    id: 1,
    title: "Java Jazz Festival 2024",
    location: "JIExpo Kemayoran",
    startDate: "2024-05-24T18:00",
    endDate: "2024-05-24T23:00",
    description: "Festival jazz terbesar di Jakarta.",
    category: "Music",
    price: 350000,
    ticketType: "Paid",
    availableSeats: 5000,
    image: "",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(
    null,
  );

  const handleSaveEvent = (data: EventFormValues) => {
    let imageUrl = data.image;
    if (data.image instanceof File) {
      imageUrl = URL.createObjectURL(data.image);
    }

    if (editingEvent) {
      const updatedEvents = events.map((ev) =>
        ev.title === editingEvent.title
          ? { ...ev, ...data, image: imageUrl }
          : ev,
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        id: Math.random(),
        ...data,
        image: imageUrl,
      };
      setEvents([newEvent, ...events]);
    }
  };

  const handleEditClick = (event: any) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">Event Management</h1>
          <p className="text-blue-500">
            Manage your event schedule, ticket prices, and promotions.
          </p>
        </div>
        <Button onClick={handleCreateClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <Separator className="h-px bg-blue-100" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            {/* Image Cover */}
            <div className="relative h-40 w-full overflow-hidden bg-gray-100">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-sm">
                {event.category}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-start justify-between">
                <span
                  className={`text-sm font-bold ${event.ticketType === "Free" ? "text-green-600" : "text-blue-900"}`}
                >
                  {event.ticketType === "Free"
                    ? "GRATIS"
                    : formatIDR(event.price)}
                </span>
              </div>

              <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-blue-700">
                {event.title}
              </h3>

              <div className="mb-4 flex-1 space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString("id-ID")}
                  </span>
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
                  onClick={() => handleEditClick(event)}
                  variant="outline"
                  className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Edit Detail
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal (Reusable untuk Create & Edit) */}
      <EventForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleSaveEvent}
        initialData={editingEvent} // <-- Pass data event jika sedang edit
      />
    </div>
  );
}
