"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link"; // Next.js Link ইমপোর্ট করা হয়েছে
import { SlidersHorizontal, Heart, Star } from "lucide-react";
import type { Listing } from "../Map/Map"; // SSR এরর এড়াতে শুধু type ইমপোর্ট করা হয়েছে

// Next.js ডাইনামিক ইম্পোর্টের জন্য জেনেরিক টাইপ সেট করা হলো
const MapComponent = dynamic<{ listings: Listing[] }>(
    () => import("../Map/Map"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                <p className="text-gray-400 text-sm font-medium">Loading Map...</p>
            </div>
        )
    }
);

// লিস্টিং ডেটাতে Listing[] টাইপ অ্যাসাইন করা হলো
const listingsData: Listing[] = [
    { id: 1, title: "Luxe Penthouse with View", loc: "Gulshan 2, Dhaka", price: "$145", rating: "4.95", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600", lat: 23.7949, lng: 90.4143 },
    { id: 2, title: "Modern Minimalist Studio", loc: "Banani, Dhaka", price: "$68", rating: "4.82", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600", lat: 23.7937, lng: 90.4042 },
    { id: 3, title: "Cozy Garden Duplex", loc: "Baridhara DOHS", price: "$120", rating: "5.0", img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=600", lat: 23.8115, lng: 90.4124 },
    { id: 4, title: "Artist's Loft in Dhanmondi", loc: "Dhanmondi, Dhaka", price: "$55", rating: "4.75", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600", lat: 23.7461, lng: 90.3742 },
    { id: 5, title: "Business Suite Platinum", loc: "Uttara Sector 4", price: "$85", rating: "4.90", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600", lat: 23.8643, lng: 90.3986 },
    { id: 6, title: "Colonial Charm Villa", loc: "Eskaton, Dhaka", price: "$190", rating: "4.98", img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600", lat: 23.7441, lng: 90.3976 },
    { id: 7, title: "Skyline View Apartment", loc: "Bashundhara R/A", price: "$72", rating: "4.65", img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=600", lat: 23.8182, lng: 90.4358 },
    { id: 8, title: "Quiet Retreat Near Lake", loc: "Gulshan 1, Dhaka", price: "$110", rating: "4.88", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600", lat: 23.7801, lng: 90.4161 }
];

export default function PropertySection() {
    // Favorites অবজেক্টের জন্য টাইপ ডিফাইন করা হলো Record<id_number, boolean_state>
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const toggleFavorite = (id: number, e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        e.preventDefault(); // লিংক ক্লিক হওয়া থেকে আটকাতে
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 bg-[#fbfbfb]">

            {/* Left Column: Properties Grid */}
            <div className="w-full lg:w-3/5">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <p className="text-[#ba0036] font-bold tracking-widest text-[11px] uppercase mb-1">Featured Homes</p>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Homes in Dhaka</h2>
                    </div>
                    <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                        <SlidersHorizontal size={16} className="text-gray-700" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                    {listingsData.map((item) => (
                        <div key={item.id} className="group flex flex-col h-full">

                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-3 shadow-sm group-hover:shadow-md transition-all duration-300 bg-gray-100">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                    loading="lazy"
                                />
                                <button
                                    onClick={(e) => toggleFavorite(item.id, e)}
                                    className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/10 backdrop-blur-sm transition-transform active:scale-90 z-10"
                                >
                                    <Heart
                                        size={18}
                                        className={`transition-colors ${favorites[item.id] ? "fill-[#ff385c] text-[#ff385c]" : "text-white"}`}
                                    />
                                </button>
                            </div>

                            {/* Content & Button Wrapper */}
                            <div className="flex flex-col flex-grow justify-between">
                                <div className="flex justify-between items-start w-full mb-4">
                                    <div className="space-y-0.5">
                                        <h3 className="text-sm font-bold text-gray-950 line-clamp-1 group-hover:text-[#ba0036] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 font-medium">{item.loc}</p>
                                        <p className="text-xs text-gray-900 pt-1">
                                            <span className="font-bold text-sm">{item.price}</span>{" "}
                                            <span className="text-gray-400">per night</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-900 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                                        <Star size={12} className="fill-gray-900 text-gray-900" />
                                        <span className="text-xs font-bold">{item.rating}</span>
                                    </div>
                                </div>

                                {/* View Details Button Linked to Dynamic Route */}
                                <Link
                                    href={`/property/${item.id}`}
                                    className="block w-full text-center py-2.5 bg-[#ba0036] hover:bg-[#9a002d] text-white text-sm font-bold rounded-xl transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Real Map */}
            <div className="hidden lg:block w-2/5 h-[calc(100vh-120px)] sticky top-24 rounded-3xl overflow-hidden border border-gray-200/60 shadow-md">
                <MapComponent
                    key={new Date().getTime()} // এই লাইনটি যুক্ত করলে Fast Refresh-এ ক্র্যাশ করবে না
                    listings={listingsData}
                />
            </div>

        </section>
    );
}