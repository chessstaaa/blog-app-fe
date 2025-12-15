import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Tags,
  Users,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: CalendarDays,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: Ticket,
  },
  {
    title: "Vouchers",
    href: "/dashboard/vouchers",
    icon: Tags,
  },
  {
    title: "Attendees",
    href: "/dashboard/attendees",
    icon: Users,
  },
];
