"use client";

import React, { useState, useEffect } from "react";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

// ব্যাকএন্ড থেকে আসা ডেটার টাইপ
interface Property {
    id: number;
    title: string;
    location: string;
    basePrice: number;
    rating: string | number;
    images: string[];
}

export default function AllPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("http://localhost:8080/properties");
                if (!response.ok) throw new Error("Failed to fetch properties");
                const data = await response.json();
                setProperties(data);
            } catch (err) {
                setError("Something went wrong while loading properties.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ba0036]"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Recommended for you</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {properties.map((property) => (
                    <Link href={`/customer/allProperty/${property.id}`} key={property.id} className="group cursor-pointer">
                        {/* Image Thumbnail */}
                        <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
                            <img 
                                src={property.images?.[0] || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600"} 
                                alt={property.title} 
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full backdrop-blur-sm">
                                <Star size={16} className="text-gray-900" />
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900 truncate w-[200px]">{property.title}</h3>
                                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                    <MapPin size={14} /> {property.location}
                                </p>
                                <p className="text-gray-900 mt-2">
                                    <span className="font-bold">${property.basePrice}</span> <span className="text-sm font-normal">night</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <Star size={14} className="fill-gray-900" /> {property.rating || "New"}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}