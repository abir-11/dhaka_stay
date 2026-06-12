"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// নতুন JSON অনুযায়ী ইমেজের ইন্টারফেস
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
  images?: PropertyImage[]; // নতুন image ফিল্ড
  imageUrl?: string; // ব্যাকআপ হিসেবে আগের ফিল্ড
  hostName?: string;
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

export default function CustomerDashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Guest";

  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const customerId = localStorage.getItem("userId") || "1";
        const response = await fetch(`http://localhost:8080/bookings/customer/${customerId}`);
        
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalBookings = bookings.length;
  const activeStays = bookings.filter(b => ["ACTIVE", "CONFIRMED"].includes(b.status?.toUpperCase())).length;
  const completedStays = bookings.filter(b => b.status?.toUpperCase() === "COMPLETED").length;
  const pendingBookings = bookings.filter(b => ["PENDING", "UPCOMING"].includes(b.status?.toUpperCase())).length;

  const stats = [
    { title: "TOTAL BOOKINGS", value: totalBookings.toString(), change: "+12%", icon: "calendar_month", hasBadge: true },
    { title: "ACTIVE STAYS", value: activeStays.toString(), icon: "home" },
    { title: "COMPLETED STAYS", value: completedStays.toString(), icon: "check_circle" },
    { title: "PENDING BOOKINGS", value: pendingBookings.toString(), icon: "assignment_late" },
  ];

  const featuredBooking = bookings.find(b => ["ACTIVE", "CONFIRMED", "PENDING", "UPCOMING"].includes(b.status?.toUpperCase()));

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const activities = bookings.slice(0, 4).map((b, i) => ({
    title: b.status?.toUpperCase() === "COMPLETED" ? "Stay Completed" : "Booking Confirmed",
    desc: b.property?.title || b.property?.name || "Premium Property",
    time: formatDate(b.checkInDate),
    active: i === 0,
  }));

  const displayActivities = activities.length > 0 ? activities : [
    { title: "Account Created", desc: "Welcome to DhakaStay", time: "JUST NOW", active: true },
    { title: "Profile Updated", desc: "Basic information added", time: "TODAY" }
  ];

  // Base64 ইমেজ বের করার লজিক
  const propertyImages = featuredBooking?.property?.images;
  const featuredImage = propertyImages?.find((img) => img.isPrimary)?.imageUrl 
                        || propertyImages?.[0]?.imageUrl 
                        || featuredBooking?.property?.imageUrl 
                        || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back, {firstName}!</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Your next adventure in Dhaka is just a few clicks away.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <span className="text-[#ba0036] bg-rose-50/50 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined font-light text-[22px]">{stat.icon}</span>
              </span>
              {stat.hasBadge && totalBookings > 0 && (
                <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded-md">{stat.change}</span>
              )}
            </div>
            <div className="mt-5">
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{stat.title}</p>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">{isLoading ? "..." : stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {isLoading ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm h-[400px] animate-pulse flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#ba0036] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : featuredBooking ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
              <div className="h-[280px] w-full relative bg-gray-100 overflow-hidden">
                {/* ইমেজ রেন্ডার করা হচ্ছে */}
                <img 
                  src={featuredImage} 
                  alt="Property" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className={`absolute top-4 left-4 font-bold text-xs px-3 py-1 rounded-full shadow-sm ${
                  featuredBooking.status?.toUpperCase() === "ACTIVE" ? "bg-[#ba0036] text-white" : "bg-blue-600 text-white"
                }`}>
                  {featuredBooking.status?.toUpperCase() === "ACTIVE" ? "Active Stay" : "Upcoming Trip"}
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 pb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{featuredBooking.property?.title || "Premium Suite"}</h2>
                    <p className="text-xs font-semibold text-gray-400 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> 
                      {featuredBooking.property?.location || featuredBooking.property?.address || "Location unavailable"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 bg-gray-50/70 rounded-2xl p-4 my-5 gap-4">
                  <div className="space-y-1 pl-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Check-In</p>
                    <p className="text-sm font-extrabold text-gray-800">{formatDate(featuredBooking.checkInDate)}</p>
                  </div>
                  <div className="space-y-1 border-l border-gray-200 pl-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Check-Out</p>
                    <p className="text-sm font-extrabold text-gray-800">{formatDate(featuredBooking.checkOutDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 flex flex-col items-center justify-center text-center h-[400px]">
              <span className="material-symbols-outlined text-[64px] text-gray-200 mb-4">luggage</span>
              <h3 className="text-xl font-bold text-gray-800">No upcoming trips</h3>
              <p className="text-sm text-gray-500 mt-2">Ready for your next adventure?</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="relative border-l-2 border-gray-100 ml-2.5 space-y-6">
              {displayActivities.map((act, i) => (
                <div key={i} className="relative pl-6">
                  <span className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-white ring-4 ${
                    act.active ? "bg-[#ba0036] ring-rose-100" : "bg-gray-300 ring-gray-50"
                  }`} />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">{act.title}</h5>
                    <p className="text-[11px] text-gray-500 mt-1">{act.desc}</p>
                    <p className="text-[9px] font-bold text-gray-400 mt-1.5 uppercase">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}