"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", href: "/dashboard/vendor" },
    { name: "My Properties", icon: "apartment", href: "/dashboard/vendor/properties" },
    { name: "Bookings", icon: "book_online", href: "/dashboard/vendor/bookings" },
    { name: "Financials", icon: "payments", href: "/dashboard/vendor/financials" },
    { name: "Analytics", icon: "assessment", href: "/dashboard/vendor/analytics" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="mb-6 pl-4">
            <h1 className="text-xl font-bold text-[#ba0036] tracking-tight">DhakaStay</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Vendor Dashboard</p>
          </div>
          <nav className="space-y-1 relative">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all relative ${
                    isActive
                      ? "text-[#ba0036] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-[#ba0036] before:rounded-r"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-[#ba0036] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#9a002d] transition-all flex items-center justify-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">add</span> Add Property
          </button>
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <Link href="/dashboard/vendor/settings" className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
              <span className="material-symbols-outlined text-[20px]">settings</span> Settings
            </Link>
            <Link href="/dashboard/vendor/help" className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
              <span className="material-symbols-outlined text-[20px]">help</span> Help
            </Link>
          </div>
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
              placeholder="Search analytics, properties or guests..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-gray-300 transition-colors"
            />
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-gray-800 relative">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba0036] rounded-full"></span>
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <span className="material-symbols-outlined text-[24px]">mail</span>
            </button>
            <div className="flex items-center gap-3 border-l pl-5 border-gray-200">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900">Rahat Kabir</p>
                <p className="text-[10px] font-medium text-gray-400">Superhost</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
                alt="Vendor"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
              />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}