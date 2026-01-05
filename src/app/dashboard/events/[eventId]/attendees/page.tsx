"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { TransactionTypes } from "@/types/transaction";
import { formatDate, formatIDR, useDebounce } from "@/lib/utils";
import PaginationSection from "@/components/Pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { PageableResponse } from "@/types/pagination";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

export default function AttendeePage() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: attendees, isPending } = useQuery({
    queryKey: ["attendees", debouncedSearch, page],
    queryFn: async () => {
      const attendee = await axiosInstance.get<
        PageableResponse<TransactionTypes>
      >(`/attendee/${params.eventId}`, {
        params: { page },
      });
      return attendee.data;
    },
  });

  const onClickPagination = (page: number) => {
    setPage(page);
  };

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => router.back()}
          className="flex w-fit items-center text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Event
        </button>
        <h1 className="text-2xl font-bold text-gray-900">List Attendee</h1>
        <p className="text-sm text-gray-500">
          Manage and monitor participants who have purchased tickets.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari nama, email, atau kode tiket...."
            className="border-blue-200 bg-white pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 font-semibold text-gray-700">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Ticket Code</th>
                <th className="px-6 py-4">Attendee Name</th>
                <th className="px-6 py-4">Total Payment</th>
                <th className="px-6 py-4">Purchase Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isPending ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : attendees?.data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No participants found.
                  </td>
                </tr>
              ) : (
                attendees?.data.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-mono font-medium text-blue-600">
                      {item.ticketId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {item.user.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatIDR(item.price)}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Component Pagination */}
        {attendees?.meta && (
          <PaginationSection
            meta={attendees.meta}
            onClick={onClickPagination}
          />
        )}
      </div>
    </div>
  );
}
