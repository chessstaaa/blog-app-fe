"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TicketCard } from "./TicketCard";
import { TicketForm } from "./TicketForm";
import { Ticket } from "@/types/ticket";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketListProps {
  tickets: Ticket[];
  onAddTicket: (data: {
    eventId: number;
    name: string;
    price: number;
    quantityAvailable: number;
  }) => Promise<any>;
  onDeleteTicket: (id: number) => Promise<any>;
  onEditTicket?: (id: number, data: any) => Promise<any>;
  selectedEventId: number | null;
  isLoading?: boolean;
  isCreating?: boolean;
  isDeleting?: boolean;
}

export function TicketList({
  tickets,
  onAddTicket,
  onDeleteTicket,
  onEditTicket,
  selectedEventId,
  isLoading,
  isCreating,
  isDeleting,
}: TicketListProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets.filter((ticket) =>
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.price - b.price;
      }
    });

    return filtered;
  }, [tickets, searchQuery, sortBy]);

  const handleEditClick = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTicket(null);
  };

  const handleFormSubmit = async (data: {
    name: string;
    price: number;
    quantityAvailable: number;
  }) => {
    if (editingTicket) {
      // Handle edit - for now we'll show a message
      console.log("Edit not yet implemented in backend");
      handleFormClose();
    } else {
      // Handle create
      if (selectedEventId) {
        await onAddTicket({
          eventId: selectedEventId,
          ...data,
        });
        handleFormClose();
      }
    }
  };

  if (!selectedEventId) {
    return (
      <div className="rounded-lg border border-dashed border-blue-200 p-8 text-center">
        <p className="text-gray-500">
          Please select an event to manage its tickets
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-950">
            Ticket Management
          </h2>
          <p className="text-blue-500">
            Create and manage tickets for your selected event
          </p>
        </div>
        {!isFormOpen && (
          <Button
            onClick={() => {
              setEditingTicket(null);
              setIsFormOpen(true);
            }}
            className="gap-2"
          >
            + Add Ticket
          </Button>
        )}
      </div>

      <Separator className="h-px bg-blue-100" />

      {/* Form Section */}
      {isFormOpen && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-950">
              {editingTicket ? "Edit Ticket" : "Add New Ticket"}
            </h3>
            <button
              onClick={handleFormClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <TicketForm
            onSubmit={handleFormSubmit}
            initialData={editingTicket || undefined}
            isLoading={isCreating}
            onCancel={handleFormClose}
          />
        </div>
      )}

      {/* Search and Filter */}
      {tickets.length > 0 && (
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Tickets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <div className="col-span-3 py-10 text-center">
            <p className="text-lg font-semibold text-gray-500">
              Loading tickets...
            </p>
          </div>
        )}

        {!isLoading && tickets.length === 0 && (
          <div className="col-span-3 rounded-lg border border-dashed border-gray-200 py-10 text-center">
            <p className="text-gray-500 mb-4">No tickets created yet</p>
            <Button
              onClick={() => {
                setEditingTicket(null);
                setIsFormOpen(true);
              }}
              variant="outline"
            >
              Create First Ticket
            </Button>
          </div>
        )}

        {filteredAndSortedTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onEdit={handleEditClick}
            onDelete={onDeleteTicket}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}
