"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/static/sidebar";
import { signOut } from "next-auth/react";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-blue-100 bg-blue-950 text-white shadow-xl md:flex">
      {/* Header / Logo Area */}
      <div className="flex h-16 items-center px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm shadow-blue-900/50">
            EP
          </div>
          <span className="text-blue-50">EventPro</span>
        </Link>
      </div>

      <Separator className="mx-6 h-px bg-blue-800" />

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {/* Main Management Section */}
        <p className="mb-3 px-2 text-xs font-bold tracking-wider text-blue-400 uppercase">
          Management
        </p>

        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "text-blue-200 hover:bg-blue-900 hover:text-white",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-blue-400 group-hover:text-white",
                )}
              />
              {item.title}
            </Link>
          );
        })}

        {/* Settings Section */}
        <div className="mt-2 pt-6">
          <p className="mb-3 px-2 text-xs font-bold tracking-wider text-blue-400 uppercase">
            Settings
          </p>
          <Link
            href="/dashboard/profile"
            className={cn(
              "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
              pathname === "/dashboard/profile"
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                : "text-blue-200 hover:bg-blue-900 hover:text-white",
            )}
          >
            <Settings
              className={cn(
                "h-5 w-5 transition-colors",
                pathname === "/dashboard/profile"
                  ? "text-white"
                  : "text-blue-400 group-hover:text-white",
              )}
            />
            Profile
          </Link>
        </div>
      </nav>

      {/* Footer / User Profile */}
      <div className="mt-auto border-t border-blue-900/50 p-4">
        <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-blue-800 bg-blue-900/40 p-3 transition-colors hover:bg-blue-900/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-600 bg-blue-700 text-sm font-bold shadow-sm">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">John Doe</p>
            <p className="truncate text-xs text-blue-300">Organizer</p>
          </div>
          <button
            className="rounded-md p-1 text-blue-300 transition-colors hover:bg-red-400/10 hover:text-red-400"
            title="Logout"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
