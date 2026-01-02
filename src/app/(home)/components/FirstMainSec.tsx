"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const banners = [
    {
        id: 1,
        title: "Brazil GP 2026",
        image: "/imgAssets/brazilgp-picture.jpeg",
        link: "/events/brazil-gp",
    },
    {
        id: 2,
        title: "Abu Dhabi GP 2026",
        image: "/imgAssets/banner-2.jpg",
        link: "/events/abu-dhabi-gp",
    },
    {
        id: 3,
        title: "Australia GP 2026",
        image: "/imgAssets/banner-4.jpg",
        link: "/events/australia-gp-2026",
    },
];

export default function FirstMainSec() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % banners.length);
    const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, []);

    const active = banners[index];

    return (
        <div className="relative overflow-hidden rounded-xl">
            <Link href={active.link}>
                <Image
                    src={active.image}
                    alt={active.title}
                    width={1400}
                    height={500}
                    priority
                    className="w-full h-90 object-cover"
                />
            </Link>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 bg-black/60 px-4 py-2 rounded-lg text-white text-lg font-semibold">
                {active.title}
            </div>

            {/* Left */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full flex items-center justify-center shadow hover:scale-110 transition"
            >
                <ChevronLeft />
            </button>

            {/* Right */}
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full flex items-center justify-center shadow hover:scale-110 transition"
            >
                <ChevronRight />
            </button>
        </div>
    );
}
