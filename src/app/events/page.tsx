import { Suspense } from "react";
import EventBrowser from "./components/EventBrowser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 md:px-4 py-6 sm:py-8 md:py-10">
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
