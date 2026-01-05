"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventSelectorProps {
  value: number | null;
  onChange: (eventId: number | null) => void;
}

export function EventSelector({ value, onChange }: EventSelectorProps) {
  const { data: session, status } = useSession();

  const { data: eventsData } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axiosInstance.get<PageableResponse<Event>>(
        "/event/dashboard",
        {
          headers: { Authorization: `Bearer ${session?.user?.userToken}` },
        }
      );
      return response.data;
    },
    enabled: status === "authenticated",
  });

  const events = eventsData?.data || [];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-blue-950">
        Select Event
      </label>
      <Select
        value={value?.toString() || ""}
        onValueChange={(val) => onChange(val ? parseInt(val) : null)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an event..." />
        </SelectTrigger>
        <SelectContent>
          {events.map((event) => (
            <SelectItem key={event.id} value={event.id.toString()}>
              {event.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {events.length === 0 && (
        <p className="text-sm text-gray-500">
          No events available. Create an event first to manage tickets.
        </p>
      )}
    </div>
  );
}
