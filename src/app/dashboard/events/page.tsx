import { Suspense } from "react";
import { EventViews } from "./components/EventViews";

export const metadata = {
  title: "Event Management",
  description: "Manage your events here",
};

export default function EventsPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading Events...</div>}
    >
      <EventViews />
    </Suspense>
  );
}
