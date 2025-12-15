// src/app/articles/[objectId]/page.tsx
import Navbar from "@/components/Navbar";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Image from "next/image";
import { cache } from "react";
import { MapPin, Calendar, Clock, User } from "lucide-react";

interface ArticleDetailProps {
  params: Promise<{ objectId: string }>;
}

const getBlog = cache(async (objectId: string) => {
  const response = await fetch(
    `https://betterkiss-us.backendless.app/api/data/Blogs/${objectId}`
  );
  const blog: Blog = await response.json();
  return blog;
});

const ArticleDetail = async (props: ArticleDetailProps) => {
  const { objectId } = await props.params;
  const blog = await getBlog(objectId);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-gray-200">
              <Image
                src={blog.thumbnail}
                alt="thumbnail"
                fill
                className="object-cover"
              />
            </div>

            {/* Ticket Info */}
            <div className="flex items-center gap-4">
              <div className="rounded-lg border px-4 py-2">
                <p className="text-sm font-semibold text-orange-500">
                  12HJ89
                </p>
                <p className="text-sm">Rp 20.000</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 rounded-lg bg-gray-100 p-1 text-sm">
              <button className="flex-1 rounded-md bg-white py-2 font-semibold">
                Description
              </button>
              <button className="flex-1 rounded-md py-2 text-gray-400">
                Tickets
              </button>
            </div>

            {/* Description */}
            <div className="text-sm leading-relaxed text-gray-700">
              {blog.content}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <div className="rounded-2xl border p-6 space-y-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-orange-500" />
                  <span>Jakarta</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  <span>
                    {format(new Date(blog.created), "dd MMM yyyy")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <span>12:00 - 23:00</span>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">
                  {blog.author}
                </span>
              </div>
            </div>

            {/* Checkout Card */}
            <div className="rounded-2xl border p-6 space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <span className="text-orange-500">🎟️</span>
                <p>
                  You haven't selected any tickets. Please choose one
                  first in the <span className="text-orange-500">Tickets</span> tab.
                </p>
              </div>

              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Total price</span>
                <span>Rp 0</span>
              </div>

              <button
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-orange-300 py-2 text-sm font-semibold text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
