import { Suspense } from "react";
import { TicketViews } from "./components/TicketViews";

export const metadata = {
  title: "Ticket Management",
  description: "Manage your event tickets here",
};

export default function TicketsPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading Tickets...</div>}
    >
      <TicketViews />
    </Suspense>
  );
}
