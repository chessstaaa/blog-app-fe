"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, Ticket, Users, CalendarDays } from "lucide-react";
import { GraphCard } from "@/components/card/GraphCard";
import { ChartData } from "@/types/dashboard";
import { formatIDR } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const monthlySalesData: ChartData[] = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-extrabold text-blue-900">
        Dashboard Overview
      </h1>

      {/* --- 1. Statistik Cards --- */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GraphCard
          title="Total Sales"
          value={formatIDR(45000000)}
          icon={CalendarDays}
          color="bg-blue-600"
        />
        <GraphCard
          title="Tickets Sold"
          value="1,240"
          icon={Ticket}
          color="bg-green-600"
        />
        <GraphCard
          title="Active Events"
          value="3"
          icon={Users}
          color="bg-yellow-600"
        />
        <GraphCard
          title="Avg. Rating"
          value="4.7 / 5"
          icon={ArrowUp}
          color="bg-indigo-600"
        />
      </div>

      {/* --- 2. Visualisasi Chart --- */}
      <div className="h-[450px] rounded-xl border border-blue-100/50 bg-white p-8 shadow-lg">
        <h2 className="mb-6 border-b border-blue-100 pb-2 text-xl font-bold text-blue-900">
          Monthly Sales Performance
        </h2>

        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={monthlySalesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
            <XAxis dataKey="name" stroke="#1e40af" />
            <YAxis
              stroke="#1e40af"
              tickFormatter={(value) => formatIDR(value)}
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
            {/* Warna Bar: Biru Utama (#2563EB / blue-600) */}
            <Bar dataKey="sales" fill="#2563EB" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
