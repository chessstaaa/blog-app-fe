import { Blog } from "@/types/blog";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/articles/${blog.objectId}`}>
      <div className="overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg">
        
        {/* Thumbnail */}
        <div className="relative h-[200px] w-full">
          <Image
            src={blog.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-3 p-5">
          {/* Category */}
          <p className="w-fit rounded-md bg-green-200 px-3 py-1 text-xs font-semibold text-black">
            {blog.category}
          </p>

          {/* Title */}
          <h2 className="line-clamp-2 text-lg font-bold">
            {blog.title}
          </h2>

          {/* Date */}
          <p className="text-sm text-gray-600">
            {format(new Date(blog.created), "dd MMM yyyy")}
          </p>

          {/* Description */}
          <p className="line-clamp-3 text-sm text-gray-700">
            {blog.description}
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 border-t px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
            {blog.author.charAt(0)}
          </div>
          <p className="text-sm font-medium">{blog.author}</p>
        </div>

      </div>
    </Link>
  );
};

export default BlogCard;
