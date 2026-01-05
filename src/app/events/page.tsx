import { Suspense } from "react";
import EventBrowser from "./components/EventBrowser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        {/* <h1 className="text-3xl font-bold mb-6">Browse Events</h1> */}
        <Suspense
          fallback={<div className="py-20 text-center">Loading Events...</div>}
        >
          <EventBrowser />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
