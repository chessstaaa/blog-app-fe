"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BannerItem {
    id: number;
    image: string;
    alt: string;
}

const banners: BannerItem[] = [
    {
        id: 1,
        image: "/banners/yoasobi.jpg",
        alt: "Yoasobi Asia Tour 2024-2025",
    },
    {
        id: 2,
        image: "/banners/banner-2.jpg",
        alt: "Music Festival",
    },
];

const HeroBanner = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => {
        setCurrent((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1
        );
    };

    const next = () => {
        setCurrent((prev) =>
            prev === banners.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="container mx-auto px-4 mt-12">
            <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200">
                {/* Image */}
                <div className="relative h-[280px] w-full md:h-[360px]">
                    <Image
                        src={banners[current].image}
                        alt={banners[current].alt}
                        fill
                        priority
                        className="object-contain"
                    />
                </div>

                {/* Left Chevron */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                >
                    <ChevronLeft />
                </button>

                {/* Right Chevron */}
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default HeroBanner;
