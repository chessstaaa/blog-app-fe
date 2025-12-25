// src/app/(home)/components/BlogHome.tsx
"use client";

import Link from "next/link";
import BlogList from "./BlogList";

const BlogHome = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">LATEST EVENTS</h1>

        <Link
          href="/events"
          className="rounded-lg border border-orange-500 px-5 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
        >
          Show more
        </Link>
      </div>

      <BlogList />
    </div>
  );
};

export default BlogHome;
