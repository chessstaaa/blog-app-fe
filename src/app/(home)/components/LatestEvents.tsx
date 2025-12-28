import React from 'react'
import Link from "next/link";
import { events } from '@/lib/events';
import EventList from './EventList';
import { Button } from '@/components/ui/button';

const LatestEvents = () => {
    return (
        <div className='container mx-auto mt-12'>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Latest Events</h2>

                <Link href="/events">
                    <Button variant="outline" className="rounded-full hover:bg-blue-500 hover:text-white transition">
                        See all
                    </Button>
                </Link>
            </div>
            <EventList events={events} limit={4} />
        </div>
    )
}

export default LatestEvents