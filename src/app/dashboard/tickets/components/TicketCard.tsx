"use client";

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/types/ticket";
import { formatCurrency } from "@/lib/utils";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export function TicketCard({
  ticket,
  onEdit,
  onDelete,
  isDeleting,
}: TicketCardProps) {
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ticket "${ticket.name}"?`
      )
    ) {
      onDelete(ticket.id);
    }
  };

  return (
    <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-blue-950">
              {ticket.name}
            </CardTitle>
            <CardDescription className="text-sm">
              Event ID: {ticket.eventId}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">
              {formatCurrency(ticket.price)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-2">
            <span className="text-sm font-medium text-blue-700">
              Available Quantity:
            </span>
            <span className="font-semibold text-blue-950">
              {ticket.quantityAvailable} seats
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(ticket)}
            className="flex-1 gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
