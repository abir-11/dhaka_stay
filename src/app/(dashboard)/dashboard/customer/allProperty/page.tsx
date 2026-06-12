"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SlidersHorizontal, Heart, Star, Loader2 } from "lucide-react";
import type { Listing } from "../map/map";

// ম্যাপ ইম্পোর্ট
const MapComponent = dynamic<{ listings: Listing[] }>(
    () => import("../map/map"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                <p className="text-gray-400 text-sm font-medium">Loading Map...</p>
            </div>
        )
    }
);

export default function PropertySection() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8080/properties");

                if (!response.ok) {
                    throw new Error("সার্ভার থেকে প্রপার্টি ডেটা লোড করা যায়নি।");
                }

                const data = await response.json();
                setListings(data);
            } catch (err: any) {
                console.error("Fetch Error:", err);
                setError(err.message || "ডেটা ফেচ করতে সমস্যা হয়েছে।");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const toggleFavorite = (id: number, e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        e.preventDefault();
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] gap-3">
                <Loader2 className="animate-spin text-[#ba0036]" size={40} />
                <p className="text-gray-500 font-medium">প্রপার্টি লিস্ট লোড হচ্ছে...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 font-semibold mb-2">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                >
                    আবার চেষ্টা করুন
                </button>
            </div>
        );
    }

    return (
        <section className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 bg-[#fbfbfb]">

            {/* বাম পাশ: প্রপার্টি গ্রিড */}
            <div className="w-full lg:w-3/5">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <p className="text-[#ba0036] font-bold tracking-widest text-[11px] uppercase mb-1">Featured Homes</p>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Properties ({listings.length})</h2>
                    </div>
                    <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                        <SlidersHorizontal size={16} className="text-gray-700" />
                    </button>
                </div>

                {listings.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 font-medium">কোনো প্রপার্টি পাওয়া যায়নি!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                        {listings.map((item) => {
                            // JSON এ ইমেজ না থাকলে আনস্প্ল্যাশ ইমেজ দেখাবে
                            const displayImage = item.img || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600";
                            const displayPrice = item.pricePerNight ? `৳${item.pricePerNight}` : "৳0";
                            const location = item.city ? `${item.address}, ${item.city}` : "Unknown Location";

                            return (
                                <div key={item.id} className="group flex flex-col h-full bg-white p-3 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 bg-gray-100">
                                        <img
                                            src={displayImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <button
                                            onClick={(e) => toggleFavorite(item.id, e)}
                                            className="absolute top-3 right-3 p-2 rounded-full bg-white/30 backdrop-blur-md transition-transform active:scale-90 z-10 hover:bg-white/50"
                                        >
                                            <Heart
                                                size={18}
                                                className={`transition-colors ${favorites[item.id] ? "fill-[#ba0036] text-[#ba0036]" : "text-gray-900"}`}
                                            />
                                        </button>
                                        
                                        {/* প্রপার্টি টাইপ ব্যাজ (যেমন: Villa) */}
                                        {item.propertyType && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                                {item.propertyType}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-col flex-grow justify-between px-1">
                                        <div className="flex justify-between items-start w-full mb-4">
                                            <div className="space-y-1 pr-4">
                                                <h3 className="text-[15px] font-bold text-gray-950 line-clamp-1 group-hover:text-[#ba0036] transition-colors capitalize">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 font-medium capitalize">{location}</p>
                                                <p className="text-sm text-gray-900 pt-1">
                                                    <span className="font-extrabold">{displayPrice}</span>{" "}
                                                    <span className="text-gray-500 font-medium">per night</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-900 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 shrink-0">
                                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-bold">{item.rating || "New"}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/dashboard/customer/allProperty/${item.id}`}
                                            className="block w-full text-center py-3 bg-gray-50 hover:bg-[#ba0036] text-gray-900 hover:text-white text-sm font-bold rounded-xl transition-colors mt-auto border border-gray-100 hover:border-[#ba0036]"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ডান পাশ: লাইভ ম্যাপ */}
            <div className="hidden lg:block w-2/5 h-[calc(100vh-120px)] sticky top-24 rounded-3xl overflow-hidden border border-gray-200/60 shadow-md bg-gray-50 z-0">
                <MapComponent listings={listings} />
            </div>

        </section>
    );
}