"use client";

import { useState, useMemo } from "react";
import { Search, Mail, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialAttendees, eventsList } from "@/types/attendee";

export default function AttendeesPage() {
  // State Filter
  const [selectedEventId, setSelectedEventId] = useState<string>(
    eventsList[0].id,
  );
  const [search, setSearch] = useState("");

  // Logic Filtering
  const filteredAttendees = useMemo(() => {
    return initialAttendees.filter((attendee) => {
      const matchEvent = attendee.eventId === selectedEventId;

      const matchSearch =
        attendee.name.toLowerCase().includes(search.toLowerCase()) ||
        attendee.email.toLowerCase().includes(search.toLowerCase());

      return matchEvent && matchSearch;
    });
  }, [selectedEventId, search]);

  const currentEventName = eventsList.find(
    (e) => e.id === selectedEventId,
  )?.title;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            List of Participants
          </h1>
          <p className="text-blue-500">
            Monitor attendance and ticket purchase data per event.
          </p>
        </div>
      </div>

      <Separator className="h-px bg-blue-100" />

      {/* --- TOOLBAR FILTER --- */}
      <div className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4 md:flex-row">
        <div className="w-full md:w-[300px]">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-blue-900 uppercase">
            Select Event
          </label>
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="border-blue-200 bg-white">
              <SelectValue placeholder="Select Event..." />
            </SelectTrigger>
            <SelectContent>
              {eventsList.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 2. Search Nama */}
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-bold tracking-wider text-blue-900 uppercase">
            Search for Participants
          </label>
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Name or Email..."
              className="border-blue-200 bg-white pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- SUMMARY CARD --- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500 uppercase">Total Participants</p>
          <p className="text-2xl font-bold text-blue-900">
            {filteredAttendees.length}
          </p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500 uppercase">Already Checked-in</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredAttendees.filter((a) => a.checkInStatus).length}
          </p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500 uppercase">
            Total Sales (This Event)
          </p>
          <p className="text-2xl font-bold text-blue-900">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(
              filteredAttendees.reduce((sum, a) => sum + a.totalPaid, 0),
            )}
          </p>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-100 bg-blue-50 font-semibold text-blue-900">
              <tr>
                <th className="px-6 py-4">Participant Name</th>
                <th className="px-6 py-4">Ticket</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4">Total Payment</th>
                <th className="px-6 py-4">Purchase Time</th>
                <th className="px-6 py-4 text-center">Check-in Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="transition-colors hover:bg-blue-50/50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {attendee.name}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                        <Mail className="h-3 w-3" />
                        {attendee.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                        {attendee.ticketType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono text-gray-600">
                      {attendee.quantity}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {new Intl.NumberFormat("id-ID").format(
                        attendee.totalPaid,
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(attendee.purchaseDate).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {attendee.checkInStatus ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          <CheckCircle className="h-3 w-3" /> Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                          <XCircle className="h-3 w-3" /> Not yet
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <p className="mb-1 font-medium">No participants found.</p>
                    <p className="text-xs">
                      Try changing the event filter or search keywords.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
