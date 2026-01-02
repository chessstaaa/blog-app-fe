"use client"

import React from 'react'
import Link from "next/link";
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@/lib/events';
import EventList from './EventList';
import { Button } from '@/components/ui/button';

const LatestEvents = () => {
    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

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
            {isLoading ? (
                <div className="text-center py-10">Loading events...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">Error loading events</div>
            ) : (
                <EventList events={events || []} limit={4} />
            )}
        </div>
    )
}

export default LatestEvents