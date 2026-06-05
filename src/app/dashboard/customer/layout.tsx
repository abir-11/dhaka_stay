"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", href: "/dashboard/customer" },
    { name: "Account", icon: "person", href: "/dashboard/customer/account" },
    { name: "Bookings", icon: "book_online", href: "/dashboard/customer/bookings" },
    { name: "Reviews", icon: "rate_review", href: "/dashboard/customer/reviews" },
    { name: "Wishlist", icon: "favorite", href: "/dashboard/customer/wishlist" },
    { name: "Support", icon: "contact_support", href: "/dashboard/customer/support" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="mb-6 pl-2">
            <h1 className="text-xl font-bold text-[#ba0036] tracking-tight">DhakaStay</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Premium Hosting</p>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#fff0f3] text-[#ba0036]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Upgrade Card Widget from Image */}
        <div className="bg-[#fff0f3] p-4 rounded-2xl border border-rose-100/50">
          <p className="text-xs font-bold text-gray-900">Upgrade to Pro</p>
          <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
            Get exclusive deals and priority support.
          </p>
          <button className="w-full mt-3 bg-[#ba0036] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#9a002d] transition-colors shadow-sm">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
            <input
              type="text"
              placeholder="Search experiences, stays..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-gray-300 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-800 relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba0036] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 py-1.5 pl-3 pr-1.5 rounded-full">
              <span className="text-xs font-bold text-gray-800">Tanvir Rahman</span>
              <div className="w-8 h-8 bg-[#ba0036]/10 text-[#ba0036] rounded-full flex items-center justify-center font-bold text-sm">
                T
              </div>
            </div>
          </div>
        </header>

        {/* Content Dashboard */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}