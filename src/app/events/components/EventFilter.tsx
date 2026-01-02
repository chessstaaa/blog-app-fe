import { Event } from "@/types/event"

export default function EventFilter({
  events,
  category,
  onCategory,
  onLocation,
}: {
  events: Event[]
  category: string
  onCategory: (c: string) => void
  onLocation: (l: string) => void
}) {
  const categories = Array.from(new Set(events.map(e => (typeof e.category === 'string' ? e.category : e.category?.name)).filter(Boolean)))
  const locations = Array.from(new Set(events.map(e => e.location).filter(Boolean)))

  console.log('Events:', events); // Debug: lihat data events
  console.log('Categories:', categories); // Debug: lihat categories yang diekstrak

  return (
    <div className="flex flex-wrap gap-4 mb-6">

      {/* CATEGORY */}
      <select
        value={category}
        onChange={e => onCategory(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">All Category</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* LOCATION */}
      <select
        defaultValue=""
        onChange={e => onLocation(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">All Location</option>
        {locations.map(l => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

    </div>
  )
}