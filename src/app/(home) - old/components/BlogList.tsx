// src/app/(home)/components/BlogList.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/blog";

const BlogList = () => {
  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get<Blog[]>(
        "/api/data/Blogs?sortBy=%60created%60%20desc"
      );
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="my-16 text-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {blogs?.slice(0, 3).map((blog) => (
        <BlogCard key={blog.objectId} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
