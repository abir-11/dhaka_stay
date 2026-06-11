"use client";

import React, { useState, useEffect, use } from "react";
import { Star, MapPin, Share, Heart, Wifi, Car, Coffee, Tv, Shield } from "lucide-react";
import Link from "next/link";

export default function PropertyDetailsPage({ params }) {
    const { id } = use(params);

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [nights, setNights] = useState(0);

    // Fetch Property Details
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/property/${id}`);
                if (!response.ok) throw new Error("Failed to fetch property details");
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPropertyDetails();
    }, [id]);

    // Calculate nights
    useEffect(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            setNights(diffDays > 0 ? diffDays : 0);
        } else {
            setNights(0);
        }
    }, [checkIn, checkOut]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ba0036]"></div>
            </div>
        );
    }

    if (!property) {
        return <div className="text-center text-xl mt-20 font-bold text-gray-800">Property not found!</div>;
    }

    // Pricing Calculation (Fallback values used if backend doesn't provide fees)
    const basePrice = property.basePrice || 0;
    const cleaningFee = property.cleaningFee || 20;
    const serviceFee = property.serviceFee || 15;
    const totalNightlyPrice = basePrice * (nights > 0 ? nights : 1);
    const totalBeforeTaxes = totalNightlyPrice + cleaningFee + serviceFee;

    // Fallback images if backend returns less than 5 images
    const fallbackImages = [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=600",
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600"
    ];
    const images = property.images && property.images.length >= 5 ? property.images : fallbackImages;

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-8 text-gray-900">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-1"><Star size={16} className="fill-gray-900" /> {property.rating || "New"}</span>
                        <span className="underline cursor-pointer hover:text-gray-900">120 reviews</span>
                        <span className="flex items-center gap-1"><MapPin size={16} /> {property.location || property.loc}</span>
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

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12">
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer">
                    <img src={images[0]} alt="Main view" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="hidden md:block relative group overflow-hidden cursor-pointer">
                    <img src={images[1]} alt="View 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="hidden md:block relative group overflow-hidden cursor-pointer">
                    <img src={images[2]} alt="View 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="hidden md:block relative group overflow-hidden cursor-pointer">
                    <img src={images[3]} alt="View 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="hidden md:block relative group overflow-hidden cursor-pointer">
                    <img src={images[4]} alt="View 5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="border-b border-gray-200 pb-8 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Entire rental unit hosted by {property.host || "Host"}</h2>
                            <p className="text-gray-600">4 guests · 2 bedrooms · 2 beds · 2 baths</p>
                        </div>
                        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                            {(property.host || "H").charAt(0)}
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
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {property.description || "No description provided for this property."}
                        </p>
                    </div>

                    <div className="border-b border-gray-200 pb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">What this place offers</h3>
                        <div className="grid grid-cols-2 gap-y-4 text-gray-700 text-lg">
                            <div className="flex items-center gap-3"><Wifi size={24} /> Fast Wi-Fi</div>
                            <div className="flex items-center gap-3"><Car size={24} /> Free Parking</div>
                            <div className="flex items-center gap-3"><Coffee size={24} /> Coffee Maker</div>
                            <div className="flex items-center gap-3"><Tv size={24} /> 55" Smart TV</div>
                        </div>
                    </div>
                </div>

                {/* Right Sticky Booking Card */}
                <div className="relative">
                    <div className="sticky top-28 bg-white p-6 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <span className="text-2xl font-bold text-gray-900">${basePrice}</span>
                                <span className="text-gray-500 text-sm"> / night</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <Star size={14} className="fill-gray-900" /> {property.rating || "New"}
                            </div>
                        </div>

                        <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
                            <div className="flex border-b border-gray-300">
                                <div className="w-1/2 p-3 border-r border-gray-300 cursor-pointer">
                                    <label className="block text-[10px] font-bold uppercase text-gray-900">Check-in</label>
                                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm outline-none bg-transparent mt-1 text-gray-700 cursor-pointer" />
                                </div>
                                <div className="w-1/2 p-3 cursor-pointer">
                                    <label className="block text-[10px] font-bold uppercase text-gray-900">Check-out</label>
                                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} min={checkIn} className="w-full text-sm outline-none bg-transparent mt-1 text-gray-700 cursor-pointer" />
                                </div>
                            </div>
                            <div className="p-3">
                                <label className="block text-[10px] font-bold uppercase text-gray-900">Guests</label>
                                <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full text-sm outline-none bg-transparent mt-1 text-gray-700 cursor-pointer">
                                    <option value="1">1 guest</option>
                                    <option value="2">2 guests</option>
                                    <option value="3">3 guests</option>
                                    <option value="4">4 guests</option>
                                </select>
                            </div>
                        </div>

                        <Link href="/checkout" className="flex items-center justify-center w-full bg-[#ba0036] hover:bg-[#a0002d] text-white font-bold text-lg py-3.5 rounded-xl transition-colors mb-4">
                            Reserve
                        </Link>

                        <p className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

                        {nights > 0 && (
                            <div className="space-y-3 text-gray-700 mb-6">
                                <div className="flex justify-between">
                                    <span className="underline">${basePrice} x {nights} nights</span>
                                    <span>${totalNightlyPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">Cleaning fee</span>
                                    <span>${cleaningFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="underline">DhakaStay service fee</span>
                                    <span>${serviceFee}</span>
                                </div>
                            </div>
                        )}

                        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                            <span>Total before taxes</span>
                            <span>${totalBeforeTaxes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}