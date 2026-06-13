"use client";

import React, { useState, useEffect, use } from "react";
import { Star, MapPin, Share, Heart, Wifi, Car, Coffee, Tv, Shield, Loader2 } from "lucide-react";
import Link from "next/link";

interface PropertyDetailsProps {
    params: Promise<{ id: string }>;
}

export default function PropertyDetailsPage({ params }: PropertyDetailsProps) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const defaultCheckIn = new Date().toISOString().split("T")[0];
    const defaultCheckOut = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const defaultGuests = 1;

    useEffect(() => {
        if (!id) return;

        const fetchPropertyDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/property/${id}`);
                
                if (!response.ok) {
                    if (response.status === 404) throw new Error("দুঃখিত, এই প্রপার্টিটি খুঁজে পাওয়া যায়নি।");
                    throw new Error("সার্ভার থেকে ডেটা লোড করতে সমস্যা হচ্ছে।");
                }
                
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    setProperty(data[0]);
                } else {
                    setProperty(data);
                }
            } catch (err: any) {
                console.error("Details Fetch Error:", err);
                setError(err.message || "কোনো একটি ত্রুটি ঘটেছে।");
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3">
                <Loader2 className="animate-spin text-[#ba0036]" size={48} />
                <p className="text-gray-500 font-medium text-lg">Loading...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || "Property not found!"}</h2>
                <Link href="/" className="px-5 py-2.5 bg-[#ba0036] text-white font-bold rounded-xl transition-colors hover:bg-[#9a002d]">
                    Back to Home
                </Link>
            </div>
        );
    }

    const basePrice = property.pricePerNight || 0;
    const maxGuests = property.maxGuests || 2;
    const propertyType = property.propertyType || "Rental Unit";
    const locationName = property.city ? `${property.address}, ${property.city}` : "Dhaka, Bangladesh";
    
    const cleaningFee = 500;
    const serviceFee = 300;
    const totalBeforeTaxes = basePrice + cleaningFee + serviceFee;

    const images = property.images?.map((img: any) => img.imageUrl) || [];

    const renderImageGallery = () => {
        const totalImages = images.length;
        if (totalImages === 0) {
            return (
                <div className="w-full h-[40vh] bg-gray-100 flex items-center justify-center rounded-2xl border border-gray-200">
                    <p className="text-gray-400">No images available</p>
                </div>
            );
        }
        if (totalImages === 1) {
            return (
                <div className="w-full h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden shadow-sm">
                    <img src={images[0]} alt="Property Main View" className="w-full h-full object-cover" />
                </div>
            );
        }
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[45vh] md:h-[60vh] rounded-2xl overflow-hidden">
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer">
                    <img src={images[0]} alt="Main view" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                {images.slice(1, 5).map((imgUrl: string, index: number) => (
                    <div key={index} className="hidden md:block relative group overflow-hidden cursor-pointer">
                        <img src={imgUrl} alt={`View ${index + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-8 text-gray-900">
            {/* হেডার */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{property.title}</h1>
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-1"><Star size={16} className="fill-yellow-400 text-yellow-400" /> {property.rating || "New"}</span>
                        <span className="underline cursor-pointer hover:text-gray-900">120 reviews</span>
                        <span className="flex items-center gap-1 capitalize"><MapPin size={16} /> {locationName}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                            <Share size={16} /> Share
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
                            <Heart size={16} /> Save
                        </button>
                    </div>
                </div>
            </div>

           
            <div className="mb-12">
                {renderImageGallery()}
            </div>

          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
               
                <div className="lg:col-span-2 space-y-8">
                    <div className="border-b border-gray-200 pb-8 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 capitalize">Entire {propertyType.toLowerCase()} hosted by Host</h2>
                            <p className="text-gray-600">{maxGuests} guests · 2 bedrooms · 2 beds · 2 baths</p>
                        </div>
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 uppercase">
                            H
                        </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8 space-y-4 text-gray-700">
                        <div className="flex items-start gap-4">
                            <Shield className="w-6 h-6 mt-1 text-gray-800" />
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">Self check-in</h4>
                                <p>Check yourself in with the smartlock.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 mt-1 text-gray-800" />
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">Great location</h4>
                                <p>95% of recent guests gave the location a 5-star rating.</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">About this space</h3>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                            {property.description || "এই প্রপার্টির জন্য কোনো ডেসক্রিপশন দেওয়া হয়নি।"}
                        </p>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">What this place offers</h3>
                        <div className="grid grid-cols-2 gap-y-4 text-gray-700 text-lg">
                            <div className="flex items-center gap-3"><Wifi size={24}/> Fast Wi-Fi</div>
                            <div className="flex items-center gap-3"><Car size={24}/> Free Parking</div>
                            <div className="flex items-center gap-3"><Coffee size={24}/> Coffee Maker</div>
                            <div className="flex items-center gap-3"><Tv size={24}/> 55" Smart TV</div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="sticky top-28 bg-white p-6 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <span className="text-2xl font-extrabold text-gray-900">৳{basePrice}</span>
                                <span className="text-gray-500 text-sm font-medium"> / night</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" /> {property.rating || "New"}
                            </div>
                        </div>

                        <Link 
                            href={`/checkout?propertyId=${id}&title=${encodeURIComponent(property.title)}&checkIn=${defaultCheckIn}&checkOut=${defaultCheckOut}&guests=${defaultGuests}`} 
                            className="flex items-center justify-center w-full bg-[#ba0036] hover:bg-[#a0002d] text-white font-bold text-lg py-3.5 rounded-xl transition-colors mb-4"
                        >
                            Reserve
                        </Link>
                        
                        <p className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

                        <div className="space-y-3 text-gray-700 mb-6 text-sm">
                            <div className="flex justify-between">
                                <span className="underline">৳{basePrice} x 1 night</span>
                                <span>৳{basePrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="underline">Cleaning fee</span>
                                <span>৳{cleaningFee}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="underline">DhakaStay service fee</span>
                                <span>৳{serviceFee}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                            <span>Total before taxes</span>
                            <span>৳{totalBeforeTaxes}</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}