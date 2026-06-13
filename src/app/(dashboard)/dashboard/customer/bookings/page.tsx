"use client";

import React, { useState, useEffect } from "react";

interface PropertyImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

interface Property {
  id: number;
  title?: string;
  name?: string;
  location?: string;
  address?: string;
  images?: PropertyImage[];
  imageUrl?: string; 
}

interface BookingData {
  id: number;
  bookingReference: string;
  property: Property;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}

export default function ProfessionalBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All Stays");
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = ["All Stays", "Upcoming", "Completed", "Cancelled"];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const customerId = localStorage.getItem("userId") || "1"; 
        const response = await fetch(`http://localhost:8080/bookings/customer/${customerId}`);
        
        if (!response.ok) throw new Error("Failed to load bookings.");
        
        const data = await response.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", { 
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
    });
  };

  const getStatusDetails = (status: string) => {
    const s = status?.toLowerCase() || "";
    if (s === "pending" || s === "upcoming") return { label: "Upcoming", color: "bg-amber-100 text-amber-800 border-amber-200" };
    if (s === "active" || s === "confirmed") return { label: "Active", color: "bg-blue-100 text-blue-800 border-blue-200" };
    if (s === "completed") return { label: "Completed", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    if (s === "cancelled") return { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200" };
    return { label: "Unknown", color: "bg-gray-100 text-gray-800 border-gray-200" };
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeFilter === "All Stays") return true;
    const { label } = getStatusDetails(booking.status);
    return label === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Trips & Bookings</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage your upcoming stays and past adventures.</p>
          </div>
          
          {/* Filters */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white shadow-md shadow-gray-900/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-5">
          
          {/* Loading Skeleton */}
          {isLoading && (
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 border border-gray-100 shadow-sm animate-pulse">
                <div className="w-full md:w-64 h-48 bg-gray-200 rounded-2xl"></div>
                <div className="flex-1 space-y-4 py-2">
                  <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded-md w-full mt-4"></div>
                </div>
              </div>
            ))
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-10 text-center">
              <span className="material-symbols-outlined text-[48px] text-red-400 mb-4">cloud_off</span>
              <h3 className="text-lg font-bold text-red-900">Unable to load bookings</h3>
              <p className="text-red-600 mt-1">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors">Try Again</button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredBookings.length === 0 && (
            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-16 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[40px] text-gray-400">luggage</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">No {activeFilter !== "All Stays" ? activeFilter.toLowerCase() : ""} bookings found</h3>
              <p className="text-gray-500 mt-2 max-w-sm">Time to dust off your bags and start planning your next great adventure.</p>
              <button className="mt-8 px-8 py-3 bg-[#ba0036] text-white font-bold rounded-full hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/20">
                Explore Properties
              </button>
            </div>
          )}

          {/* Booking Cards List */}
          {!isLoading && !error && filteredBookings.length > 0 && (
            filteredBookings.map((booking) => {
              const { label, color } = getStatusDetails(booking.status);
              const propertyName = booking.property?.title || booking.property?.name || "Premium Stay";
              const propertyLocation = booking.property?.location || booking.property?.address || "Location Unavailable";
              const nights = calculateNights(booking.checkInDate, booking.checkOutDate);

              const propertyImages = booking.property?.images;
              const displayImage = propertyImages?.find((img) => img.isPrimary)?.imageUrl 
                                   || propertyImages?.[0]?.imageUrl 
                                   || booking.property?.imageUrl 
                                   || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop";

              return (
                <div key={booking.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                  
                  {/* Left: Property Image */}
                  <div className="w-full md:w-72 h-56 md:h-auto relative overflow-hidden shrink-0">
                    <img 
                      src={displayImage} 
                      alt={propertyName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-gray-100"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border backdrop-blur-md ${color} bg-opacity-90`}>
                        {label}
                      </span>
                    </div>
                  </div>

                  {/* Right: Booking Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-1.5">
                          <span className="material-symbols-outlined text-[18px]">location_on</span>
                          {propertyLocation}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#ba0036] transition-colors line-clamp-1">
                          {propertyName}
                        </h2>
                        <p className="text-sm font-semibold text-gray-400 mt-1">Booking Ref: #{booking.bookingReference}</p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
                        <p className="text-2xl font-extrabold text-gray-900">৳ {booking.totalPrice?.toLocaleString() || "0"}</p>
                      </div>
                    </div>

                    {/* Date & Action Section */}
                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-gray-100 pt-6">
                      
                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Check-in</p>
                          <p className="text-sm sm:text-base font-semibold text-gray-900">{formatDate(booking.checkInDate)}</p>
                        </div>
                        <div className="hidden sm:flex items-center pt-4">
                          <div className="w-12 h-[1px] bg-gray-300 relative">
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] font-bold text-gray-400 rounded-full border border-gray-200">
                              {nights}N
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Check-out</p>
                          <p className="text-sm sm:text-base font-semibold text-gray-900">{formatDate(booking.checkOutDate)}</p>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto flex gap-3">
                        <button className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-50 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 text-center">
                          View Details
                        </button>
                        {label === "Upcoming" && (
                          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#ba0036] text-white font-bold text-sm rounded-xl hover:bg-rose-800 transition-colors shadow-sm text-center">
                            Manage
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}