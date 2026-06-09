"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // মোবাইলের মেনু ওপেন/ক্লোজ করার স্টেট
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", href: "/dashboard/vendor" },
    { name: "My Properties", icon: "apartment", href: "/dashboard/vendor/properties" },
    { name: "Bookings", icon: "book_online", href: "/dashboard/vendor/bookings" },
    { name: "Financials", icon: "payments", href: "/dashboard/vendor/financials" },
    { name: "Analytics", icon: "assessment", href: "/dashboard/vendor/analytics" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-800 overflow-hidden">
      
      {/* Mobile/Tab Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Area */}
      <aside
        className={`
          fixed md:relative z-50 h-full bg-white border-r border-gray-100 flex flex-col justify-between py-5 shrink-0 
          transition-[width,transform] duration-300 ease-in-out overflow-hidden whitespace-nowrap group
          /* Desktop: 84px default, hover 260px */
          md:w-[84px] md:hover:w-[260px] md:translate-x-0
          /* Mobile/Tab: Hidden by default, slides in when open */
          w-[260px] ${isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}
      >
        <div>
          {/* Logo Section */}
          <div className="mb-8 flex items-center h-10 px-3">
            {/* Short icon logo for collapsed desktop view */}
            <div className="hidden md:flex md:group-hover:hidden w-full justify-center">
              <span className="material-symbols-outlined text-[#ba0036] text-[32px]">storefront</span>
            </div>
            
            {/* Full Logo for mobile or hovered desktop */}
            <div className="hidden md:group-hover:block transition-all pl-2">
              <h1 className="text-2xl font-extrabold text-[#ba0036] tracking-tight">DhakaStay</h1>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Vendor Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 px-3 relative">
            {menuItems.map((item) => {
              // Active route matching correctly
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? "text-[#ba0036] bg-rose-50/50 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-[#ba0036] before:rounded-r"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">
                    {item.icon}
                  </span>
                  <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions Section */}
        <div className="space-y-3 px-3">
          <Link href={"/dashboard/vendor/addProperty"} className="w-full flex items-center md:justify-center md:group-hover:justify-start gap-3 bg-[#ba0036] text-white px-3 py-3 rounded-xl text-xs font-bold hover:bg-[#9a002d] transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">add_circle</span>
            <span className="md:hidden md:group-hover:inline text-sm">Add Property</span>
          </Link>

          <div className="pt-3 border-t border-gray-100 space-y-1">
            <Link href="/dashboard/vendor/settings" className="flex items-center gap-4 px-3 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50">
              <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">settings</span>
              <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Settings</span>
            </Link>
            <Link href="/dashboard/vendor/help" className="flex items-center gap-4 px-3 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50">
              <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">help</span>
              <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">Help</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-30">
          
          <div className="flex items-center gap-3">
            {/* Hamburger Icon for Mobile & Tablet */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-gray-500 hover:text-[#ba0036] hover:bg-rose-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>

            {/* Search Bar - Responsive */}
            <div className="relative w-full max-w-[200px] sm:max-w-xs lg:max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
              <input
                type="text"
                placeholder="Search analytics, properties or guests..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-[#ba0036]/30 focus:ring-2 focus:ring-[#ba0036]/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Mobile Search Icon Only */}
            <button className="sm:hidden text-gray-500 hover:text-gray-800 p-2">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            <button className="text-gray-500 hover:text-[#ba0036] relative p-2 transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba0036] rounded-full ring-2 ring-white"></span>
            </button>
            <button className="text-gray-500 hover:text-[#ba0036] p-2 transition-colors hidden sm:block">
              <span className="material-symbols-outlined text-[24px]">mail</span>
            </button>
            
            <div className="flex items-center gap-3 border-l pl-3 sm:pl-5 border-gray-200 ml-1">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900">Rahat Kabir</p>
                <p className="text-[10px] font-medium text-gray-400">Superhost</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
                alt="Vendor Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-gray-100 cursor-pointer hover:ring-[#ba0036]/30 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content Rendered Here */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f8f9fa]">
          {children}
        </main>
      </div>
    </div>
  );
}