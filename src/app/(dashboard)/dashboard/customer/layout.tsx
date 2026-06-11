"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

function CustomerDashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  // মোবাইলের মেনু ওপেন/ক্লোজ করার স্টেট
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // কাস্টমার প্রোফাইল ডাটা স্টেট
  const [customerData, setCustomerData] = useState({
    name: "Loading...",
    avatar: "",
    initials: "C",
    roleTitle: "Customer",
    isLoading: true
  });

  const isAuthenticated = status === "authenticated";

  // 📡 সেশন ইমেইল দিয়ে ডাটাবেজ থেকে কাস্টমার প্রোফাইল ফ্যাচ করা
  useEffect(() => {
    async function fetchCustomerProfile() {
      if (isAuthenticated && session?.user?.email) {
        try {
          const response = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const dbUser = await response.json();
            
            // নাম প্রসেস করা
            const firstName = dbUser?.firstName ? String(dbUser.firstName).trim() : "";
            const lastName = dbUser?.lastName ? String(dbUser.lastName).trim() : "";
            const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || session?.user?.name || "Customer";

            // ইনিশিয়াল লেটার (যদি প্রোফাইল পিকচার না থাকে)
            const firstLetter = fullName.charAt(0).toUpperCase();

            // প্রোফাইল পিকচার ইউআরএল চেক করা
            let finalAvatar = "";
            if (dbUser?.profilePictureUrl) {
              finalAvatar = dbUser.profilePictureUrl.startsWith("http")
                ? dbUser.profilePictureUrl
                : `http://localhost:8080${dbUser.profilePictureUrl}`;
            }

            setCustomerData({
              name: fullName,
              avatar: finalAvatar,
              initials: firstLetter,
              roleTitle: dbUser?.role ? String(dbUser.role) : "CUSTOMER",
              isLoading: false
            });
          } else {
            setCustomerData((prev) => ({ ...prev, isLoading: false, name: session?.user?.name || "Customer" }));
          }
        } catch (error) {
          console.error("Failed to fetch customer profile:", error);
          setCustomerData((prev) => ({ ...prev, isLoading: false, name: session?.user?.name || "Customer" }));
        }
      } else if (status !== "loading") {
        setCustomerData((prev) => ({ ...prev, isLoading: false }));
      }
    }
    fetchCustomerProfile();
  }, [isAuthenticated, session?.user?.email, status]);

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", href: "/dashboard/customer" },
    { name: "All Property", icon: "apartment", href: "/dashboard/customer/allProperty" },
    { name: "Account", icon: "person", href: "/dashboard/customer/account" },
    { name: "Bookings", icon: "book_online", href: "/dashboard/customer/bookings" },
    { name: "Reviews", icon: "rate_review", href: "/dashboard/customer/reviews" },
    { name: "Wishlist", icon: "favorite", href: "/dashboard/customer/wishlist" },
    { name: "Support", icon: "contact_support", href: "/dashboard/customer/support" },
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
            <Link href="/" className="hidden md:flex md:group-hover:hidden w-full justify-center cursor-pointer">
              <span className="material-symbols-outlined text-[#ba0036] text-[32px]">luggage</span>
            </Link>
            
            {/* Full Logo for mobile or hovered desktop */}
            <div className="hidden group-hover:block md:hidden pl-2 transition-all">
              <Link href={"/"} className="cursor-pointer block">
                <h1 className="text-2xl font-extrabold text-[#ba0036] tracking-tight">DhakaStay</h1>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Premium Hosting</p>
              </Link>
            </div>
            <div className="block md:hidden pl-2">
              <Link href={"/"} className="cursor-pointer block">
                <h1 className="text-2xl font-extrabold text-[#ba0036] tracking-tight">DhakaStay</h1>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Premium Hosting</p>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 px-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#fff0f3] text-[#ba0036]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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

        {/* Bottom Upgrade Card Widget */}
        <div className="px-3">
          {/* Collapsed State */}
          <div className="hidden md:flex md:group-hover:hidden justify-center items-center bg-[#fff0f3] w-12 h-12 rounded-xl border border-rose-100/50 mx-auto text-[#ba0036] cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">stars</span>
          </div>

          {/* Expanded State */}
          <div className="hidden group-hover:block md:hidden bg-[#fff0f3] p-4 rounded-2xl border border-rose-100/50 transition-all duration-300 opacity-100">
            <p className="text-xs font-bold text-gray-900">Upgrade to Pro</p>
            <p className="text-[10px] text-gray-500 mt-1 leading-relaxed whitespace-normal">
              Get exclusive deals and priority support.
            </p>
            <button className="w-full mt-3 bg-[#ba0036] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#9a002d] transition-colors shadow-sm">
              Upgrade Now
            </button>
          </div>
          <div className="block md:hidden bg-[#fff0f3] p-4 rounded-2xl border border-rose-100/50">
            <p className="text-xs font-bold text-gray-900">Upgrade to Pro</p>
            <p className="text-[10px] text-gray-500 mt-1 leading-relaxed whitespace-normal">
              Get exclusive deals and priority support.
            </p>
            <button className="w-full mt-3 bg-[#ba0036] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#9a002d] transition-colors shadow-sm">
              Upgrade Now
            </button>
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
                placeholder="Search experiences, stays..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-[#ba0036]/30 focus:ring-2 focus:ring-[#ba0036]/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Search Icon Only */}
            <button className="sm:hidden text-gray-500 hover:text-gray-800 p-2">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            <button className="text-gray-500 hover:text-[#ba0036] relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba0036] rounded-full ring-2 ring-white"></span>
            </button>
            
            {/* Dynamic Profile Pill - এপিআই থেকে ডাটা রেন্ডার হচ্ছে */}
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 py-1.5 pl-1.5 sm:pl-3 pr-1.5 rounded-full cursor-pointer hover:border-gray-200 hover:bg-gray-100 transition-all ml-1">
              {customerData.isLoading ? (
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="h-3 w-20 bg-gray-200 rounded hidden sm:block"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                </div>
              ) : (
                <>
                  <span className="text-xs font-bold text-gray-800 hidden sm:block truncate max-w-[120px]">
                    {customerData.name}
                  </span>
                  {customerData.avatar ? (
                    <img 
                      src={customerData.avatar} 
                      alt="Customer Profile" 
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#ba0036]/10 text-[#ba0036] rounded-full flex items-center justify-center font-bold text-sm">
                      {customerData.initials}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f8f9fa]">
          {children}
        </main>
      </div>
    </div>
  );
}

// 📦 মূল এক্সপোর্ট যা সেশন প্রোভাইডার দিয়ে সিকিউরড করা
export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CustomerDashboardContent>{children}</CustomerDashboardContent>
    </SessionProvider>
  );
}