"use client"
import { useMemo, useState, useEffect } from "react"
import { Event } from "@/types/event"
import EventSearch from "./EventSearch"
import EventFilter from "./EventFilter"
import { useSearchParams, useRouter } from "next/navigation"
import EventCardList from "./EventCardList"
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/events';

export default function EventBrowser() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const params = useSearchParams()
  const router = useRouter()

  const initialCategory = params.get("category") || ""

  const [query, setQuery] = useState("")
  const [category, setCategory] = useState(initialCategory)
  const [location, setLocation] = useState("")
  const [page, setPage] = useState(1)

  const pageSize = 8

  useEffect(() => {
    setCategory(initialCategory)
    setPage(1)
  }, [initialCategory])

  const visible = useMemo(() => {
    if (!events) return [];
    return events.filter(e =>
      e.title.toLowerCase().includes(query.toLowerCase()) &&
      (!category || (e.category?.name || e.category) === category) &&
      (!location || e.location === location)
    )
  }, [events, query, category, location])

  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize))
  const paged = visible.slice((page - 1) * pageSize, page * pageSize)

  function syncURL(key: string, value: string) {
    const p = new URLSearchParams(params.toString())

    if (value) p.set(key, value)
    else p.delete(key)

    router.push(`/events?${p.toString()}`)
  }

  return (
    <>
      <EventSearch onSearch={q => { setQuery(q); syncURL("search", q); setPage(1) }} />


      <EventFilter
        events={events || []}
        category={category}
        onCategory={c => { setCategory(c); syncURL("category", c); setPage(1) }}
        onLocation={l => { setLocation(l); syncURL("location", l); setPage(1) }}
      />

      {isLoading ? (
        <div className="text-center py-10">Loading events...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">Error loading events</div>
      ) : (
        <EventCardList events={paged} />
      )}

      {!isLoading && !error && (
        <div className="flex justify-center items-center gap-2 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className={`px-4 py-2 rounded-lg border
            ${page === 1 ? "cursor-not-allowed bg-gray-100 text-gray-400" : "hover:bg-gray-100"}`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg border
              ${page === i + 1 ? "bg-orange-500 text-white border-orange-500" : "hover:bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className={`px-4 py-2 rounded-lg border
            ${page === totalPages ? "cursor-not-allowed bg-gray-100 text-gray-400" : "hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}
