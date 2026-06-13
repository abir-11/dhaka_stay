"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2"; 

interface Property {
  id: number;
  title?: string;
  name?: string;
}

interface Customer {
  name?: string;
  avatar?: string;
  imageUrl?: string;
}

interface BookingData {
  id: number;
  bookingReference: string;
  property: Property;
  customer?: Customer;
  guestName?: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}

export default function VendorBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Bookings");
  
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  useEffect(() => {
    async function initBookings() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const userRes = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (!userRes.ok) throw new Error("Failed to resolve identity.");
          
          const textData = await userRes.text();
          if (!textData) return;
          
          const user = JSON.parse(textData);
          setVendorId(user.id);

          if (user.id) {
            const bookingsRes = await fetch(`http://localhost:8080/bookings/vendor/${user.id}`);
            if (bookingsRes.ok) {
              const data = await bookingsRes.json();
              setBookings(data);
            }
          }
        } catch (error) {
          console.error("Booking fetch error:", error);
        } finally {
          setLoading(false);
        }
      } else if (status === "unauthenticated") {
        setLoading(false);
      }
    }
    initBookings();
  }, [session, status]);

  const handleConfirmBooking = async (bookingId: number) => {
    try {
      setConfirmingId(bookingId);
      
      const response = await fetch(`http://localhost:8080/updateBookingStatus/${bookingId}?status=confirmed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // রিলোড ছাড়াই UI আপডেট (এখানেও confirmed ছোট হাতের করে দেওয়া হলো)
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === bookingId ? { ...b, status: "confirmed" } : b
          )
        );

        Swal.fire({
          icon: 'success',
          title: 'Confirmed!',
          text: 'Booking has been confirmed successfully.',
          timer: 2000,
          showConfirmButton: false,
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Failed to confirm booking. Please try again.',
          confirmButtonColor: '#e11d48',
        });
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error!',
        text: 'An error occurred while connecting to the server. Please check CORS or Server status.',
        confirmButtonColor: '#e11d48',
      });
    } finally {
      setConfirmingId(null);
    }
  };

  const formatDates = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return "N/A";
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const start = new Date(checkIn).toLocaleDateString("en-US", options);
    const end = new Date(checkOut).toLocaleDateString("en-US", options);
    return `${start} - ${end}`;
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const incomingCount = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
  const activeCount = bookings.filter(b => b.status?.toLowerCase() === "confirmed" || b.status?.toLowerCase() === "active").length;
  const completedCount = bookings.filter(b => b.status?.toLowerCase() === "completed").length;

  const summaryStats = [
    { label: "PENDING REQUESTS", value: `${incomingCount} Bookings`, icon: "➔", bgColor: "bg-amber-50 text-amber-600" },
    { label: "ACTIVE BOOKINGS", value: `${activeCount} Live`, icon: "🛏️", bgColor: "bg-emerald-50 text-emerald-600" },
    { label: "PAST RESERVATIONS", value: `${completedCount} Done`, icon: "✓", bgColor: "bg-gray-50 text-gray-700" },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === "All Bookings") return true;
    return b.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500">Syncing reservation ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-1 font-sans">
      
      {/* SUMMARY OVERVIEW STATS BARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {summaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">{stat.label}</span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex flex-wrap gap-2">
              {["All Bookings", "Confirmed", "Pending", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === tab
                      ? "bg-gray-100 text-gray-900 border border-gray-200"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center space-x-1 border border-gray-200 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 bg-white hover:bg-gray-50">
                <span>📅</span>
                <span>Active Ledger</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            
            <div className="grid grid-cols-6 bg-gray-50/50 border-b border-gray-100 py-3.5 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span className="col-span-1">Guest Name</span>
              <span className="col-span-1">Property</span>
              <span className="col-span-1">Dates</span>
              <span className="col-span-1">Amount</span>
              <span className="col-span-1">Status</span>
              <span className="col-span-1 text-center">Action</span>
            </div>

            <div className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <div className="p-8 text-center text-sm font-medium text-gray-400">
                  No reservations matching your filter query.
                </div>
              ) : (
                filteredBookings.map((booking) => {
                  const guestName = booking.customer?.name || booking.guestName || "Anonymous Guest";
                  const guestAvatar = booking.customer?.avatar || booking.customer?.imageUrl || null;
                  const propertyName = booking.property?.title || booking.property?.name || "Unknown Property";
                  const dateRange = formatDates(booking.checkInDate, booking.checkOutDate);
                  const nights = calculateNights(booking.checkInDate, booking.checkOutDate);
                  const isPending = booking.status?.toLowerCase() === "pending";

                  return (
                    <div key={booking.id} className="grid grid-cols-6 items-center py-5 px-6 hover:bg-gray-50/30 transition text-xs">
                      
                      <div className="col-span-1 flex items-center space-x-3">
                        {guestAvatar ? (
                          <img src={guestAvatar} alt={guestName} className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-[10px] font-bold text-gray-500">
                            {guestName.substring(0, 2).toUpperCase()}
                            <span className="text-[7px] text-gray-400 font-normal">Guest</span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-extrabold text-gray-900 leading-tight line-clamp-1">{guestName}</h4>
                          <span className="text-[10px] font-medium text-gray-400 mt-1 block font-mono">Ref: {booking.bookingReference || `#${booking.id}`}</span>
                        </div>
                      </div>

                      <div className="col-span-1 pr-2 font-semibold text-gray-700 truncate">
                        {propertyName}
                      </div>

                      <div className="col-span-1">
                        <div className="text-gray-900 font-bold">{dateRange}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">{nights} Nights</div>
                      </div>

                      <div className="col-span-1 text-sm font-black text-gray-900">
                        ৳ {booking.totalPrice?.toLocaleString() || "0"}
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                            booking.status?.toLowerCase() === "confirmed" || booking.status?.toLowerCase() === "active"
                              ? "bg-green-50 text-green-600"
                              : booking.status?.toLowerCase() === "pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      {/* 🛠️ Action Column */}
                      <div className="col-span-1 flex justify-center">
                        {isPending ? (
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            disabled={confirmingId === booking.id}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              confirmingId === booking.id
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                            }`}
                          >
                            {confirmingId === booking.id ? "Confirming..." : "Confirm"}
                          </button>
                        ) : (
                          <span className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                            No Action
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-400">
              <span>Showing {filteredBookings.length} of {bookings.length} reservations</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDEBAR PANEL */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-gray-900">Live Workspace Calendar</h3>
            </div>
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-gray-700">
              {Array.from({ length: 28 }, (_, idx) => (
                <span key={idx} className="w-7 h-7 mx-auto flex items-center justify-center rounded-full hover:bg-gray-50 cursor-pointer">
                  {idx + 1}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-rose-50/60 border border-rose-100/70 p-5 rounded-2xl flex flex-col space-y-4 relative overflow-hidden group">
            <div className="space-y-1.5 z-10">
              <h3 className="text-sm font-black text-gray-900 tracking-tight">Need a property clean?</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Coordinate turnover cleanings between check-outs and check-ins directly with our reliable workspace cleaning service partners team.
              </p>
            </div>
            <div className="z-10">
              <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors duration-200 shadow-sm">
                Book Cleaning Service
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}