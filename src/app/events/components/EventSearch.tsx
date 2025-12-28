"use client"
import { useEffect, useState } from "react"

export default function EventSearch({
  defaultValue = "",
  onSearch
}: {
  defaultValue?: string
  onSearch: (q: string) => void
}) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    const t = setTimeout(() => onSearch(value), 350)
    return () => clearTimeout(t)
  }, [value])

  return (
    <input
      placeholder="Search event..."
      className="border p-2 rounded-xl w-full mb-4"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}
