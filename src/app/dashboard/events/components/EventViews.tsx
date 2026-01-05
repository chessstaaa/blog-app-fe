"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { EventForm } from "@/components/app/event/AddEventForm";
import { EventFormValues } from "@/lib/validators/event";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import PaginationSection from "@/components/Pagination";
import { EventCard } from "@/components/app/event/EventCard";
import { parseAsInteger, useQueryState } from "nuqs";
import { useSession } from "next-auth/react";

export function EventViews() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormValues | null>(
    null,
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: events, isPending } = useQuery({
    queryKey: ["events", isModalOpen, page],
    queryFn: async () => {
      const token = session?.user?.userToken;
      const events = await axiosInstance.get<PageableResponse<Event>>(
        "/event/dashboard",
        {
          params: { page },
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return events.data;
    },
    enabled: status === "authenticated",
  });

  const onClickPagination = (page: number) => {
    setPage(page);
  };

  const handleEditClick = (event: Event) => {
    const data = {
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      startDate: event.startAt,
      endDate: event.endAt,
      ticketType: event.isFree ? "Free" : "Paid",
      price: event.price,
      availableSeats: event.availableSeats,
      category: event.category.id.toString(),
      image: event.image,
    } as EventFormValues;
    setEditingEvent(data);
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
        {isPending && (
          <div className="col-span-3 my-16 text-center">
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        )}

        {/* Jika Data Kosong */}
        {events?.data.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center text-gray-500">
            No Data.
          </div>
        )}

        {events?.data.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            handleEditClick={handleEditClick}
          />
        ))}
      </div>

      {/* Component Pagination */}
      {events?.meta && (
        <PaginationSection meta={events.meta} onClick={onClickPagination} />
      )}

      {/* Form Modal (Reusable untuk Create & Edit) */}
      <EventForm
        key={`modal-${editingEvent?.id}`}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={editingEvent}
      />
    </div>
  );
}
