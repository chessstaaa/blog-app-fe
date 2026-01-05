"use client";

import { useState } from "react";
import { useTickets } from "@/hooks/useTickets";
import { TicketList } from "./TicketList";
import { EventSelector } from "./EventSelector";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function TicketViews() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const {
    tickets,
    isPending,
    isCreatingTicket,
    isDeletingTicket,
    createTicket,
    deleteTicket,
  } = useTickets(selectedEventId);

  const handleAddTicket = async (data: {
    eventId: number;
    name: string;
    price: number;
    quantityAvailable: number;
  }) => {
    try {
      await createTicket(data);
      toast.success("Ticket created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create ticket");
    }
  };

  const handleDeleteTicket = async (id: number) => {
    try {
      await deleteTicket(id);
      toast.success("Ticket deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete ticket");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-950">Ticket Management</h1>
        <p className="text-blue-500">
          Create and manage event tickets with pricing and availability
        </p>
      </div>

      <Separator className="h-px bg-blue-100" />

      {/* Event Selector */}
      <div className="rounded-lg border border-blue-100 bg-white p-6">
        <EventSelector value={selectedEventId} onChange={setSelectedEventId} />
      </div>

      {/* Ticket List */}
      <TicketList
        tickets={tickets}
        onAddTicket={handleAddTicket}
        onDeleteTicket={handleDeleteTicket}
        selectedEventId={selectedEventId}
        isLoading={isPending}
        isCreating={isCreatingTicket}
        isDeleting={isDeletingTicket}
      />
    </div>
  );
}
