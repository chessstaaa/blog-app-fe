// src/app/events/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "../(home)/components/BlogList";

export default function EventsPage() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* Search & Filter (HOLD – UI ONLY) */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <input
            type="text"
            placeholder="Search event"
            disabled
            className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-2 md:w-1/2"
          />

          <select
            disabled
            className="cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-2"
          >
            <option>All Categories</option>
            <option>Music</option>
            <option>Nightlife</option>
            <option>Arts</option>
            <option>Food</option>
            <option>Business</option>
          </select>

          <select
            disabled
            className="cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-2"
          >
            <option>All Locations</option>
            <option>Jakarta</option>
            <option>Bandung</option>
            <option>Surabaya</option>
          </select>
        </div>

        <BlogList />
      </div>

      <Footer />
    </div>
  );
}
