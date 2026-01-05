"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, Ticket, Users, CalendarDays, Filter } from "lucide-react";
import { GraphCard } from "@/components/card/GraphCard";
import { DashboardTypes } from "@/types/dashboard";
import { formatIDR } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function DashboardOverviewPage() {
  const { data: session, status } = useSession();

  const [timeFilter, setTimeFilter] = useState<"year" | "month" | "day">(
    "year",
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const { data: dashboard, isPending } = useQuery({
    queryKey: ["dashboard", timeFilter, selectedDate],
    queryFn: async () => {
      const token = session?.user?.userToken;
      const blogs = await axiosInstance.get<DashboardTypes>("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          filter: timeFilter,
          date: selectedDate,
        },
      });
      return blogs.data;
    },
    enabled: status === "authenticated",
  });

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-extrabold text-blue-900">
          Dashboard Overview
        </h1>

        {/* Filter Controls UI */}
        <div className="flex items-center gap-3 rounded-lg border border-blue-100 bg-white p-2 shadow-sm">
          <Filter className="h-5 w-5 text-blue-600" />

          {/* Dropdown Tipe Filter */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="cursor-pointer bg-transparent text-sm font-semibold text-gray-600 outline-none"
          >
            <option value="year">Yearly View</option>
            <option value="month">Monthly View</option>
            <option value="day">Daily View</option>
          </select>

          <div className="mx-1 h-6 w-px bg-gray-300"></div>

          {/* Date Picker (Tipe input berubah sesuai filter) */}
          <input
            type={
              timeFilter === "year"
                ? "number"
                : timeFilter === "month"
                  ? "month"
                  : "date"
            }
            value={
              timeFilter === "year"
                ? selectedDate.split("-")[0]
                : timeFilter === "month"
                  ? selectedDate.slice(0, 7)
                  : selectedDate
            }
            onChange={(e) => {
              let val = e.target.value;
              if (timeFilter === "year") val = `${val}-01-01`;
              if (timeFilter === "month") val = `${val}-01`;
              setSelectedDate(val);
            }}
            className="border-none text-sm text-gray-600 outline-none"
          />
        </div>
      </div>

      {/* --- Statistik Cards --- */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GraphCard
          title="Total Sales"
          value={formatIDR(dashboard?.totalSales || 0)}
          icon={CalendarDays}
          color="bg-blue-600"
        />
        <GraphCard
          title="Tickets Sold"
          value={`${dashboard?.ticketsSold || 0}`}
          icon={Ticket}
          color="bg-green-600"
        />
        <GraphCard
          title="Active Events"
          value={`${dashboard?.activeEvents || 0}`}
          icon={Users}
          color="bg-yellow-600"
        />
        <GraphCard
          title="Avg. Rating"
          value={`${dashboard?.avgRating || 0}/5`}
          icon={ArrowUp}
          color="bg-indigo-600"
        />
      </div>

      {/* --- Visualisasi Chart --- */}
      <div className="h-[450px] rounded-xl border border-blue-100/50 bg-white p-8 shadow-lg">
        <h2 className="mb-6 border-b border-blue-100 pb-2 text-xl font-bold text-blue-900 capitalize">
          {timeFilter === "year"
            ? "Yearly"
            : timeFilter === "month"
              ? "Monthly"
              : "Daily"}{" "}
          Sales Performance
        </h2>

        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={dashboard?.salesChart || []}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis dataKey="name" stroke="#1e40af" fontSize={12} />
            <YAxis
              stroke="#1e40af"
              tickFormatter={(value) => formatIDR(value)}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#eff6ff",
                borderColor: "#bfdbfe",
                color: "#1e3a8a",
                borderRadius: "8px",
              }}
              formatter={(value) => [formatIDR(value as number), "Sales"]}
            />
            <Bar dataKey="total" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
