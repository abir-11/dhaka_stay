"use main";
"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

interface VendorContextType {
  vendorId: number | null;
  properties: any[];
  isPropertiesLoading: boolean;
  vendorData: {
    name: string;
    avatar: string;
    roleTitle: string;
    isLoading: boolean;
  };
  refreshProperties: () => Promise<void>;
}

const VendorContext = createContext<VendorContextType | null>(null);

export const useVendor = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error("useVendor must be used within a VendorLayout");
  return context;
};

function VendorDashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(false);

  const [vendorData, setVendorData] = useState({
    name: "Loading...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
    roleTitle: "Vendor",
    isLoading: true
  });

  const isAuthenticated = status === "authenticated";

  // ২. প্রথম ধাপ: ইউজারের ইমেইল দিয়ে প্রোফাইল ও সঠিক vendorId ডিটেক্ট করা
  useEffect(() => {
    async function fetchVendorProfile() {
      if (isAuthenticated && session?.user?.email) {
        try {
          const response = await fetch(`http://localhost:8080/user/email?email=${encodeURIComponent(session.user.email)}`);
          if (response.ok) {
            const dbUser = await response.json();
            
            // আপনার ডাটাবেজ স্ট্রাকচার অনুযায়ী vendorId, id অথবা userId ট্র্যাক করা
            const detectedId = dbUser?.vendorId || dbUser?.id || dbUser?.userId || null;
            if (detectedId) {
              setVendorId(Number(detectedId));
            }

            const firstName = dbUser?.firstName ? String(dbUser.firstName).trim() : "";
            const lastName = dbUser?.lastName ? String(dbUser.lastName).trim() : "";
            const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || session?.user?.name || "Vendor";

            let finalAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100";
            if (dbUser?.profilePictureUrl) {
              finalAvatar = dbUser.profilePictureUrl.startsWith("http")
                ? dbUser.profilePictureUrl
                : `http://localhost:8080${dbUser.profilePictureUrl}`;
            }

            setVendorData({
              name: fullName,
              avatar: finalAvatar,
              roleTitle: dbUser?.role ? String(dbUser.role) : "VENDOR",
              isLoading: false
            });
          } else {
            setVendorData((prev) => ({ ...prev, isLoading: false }));
          }
        } catch (error) {
          console.error("Failed to fetch vendor profile:", error);
          setVendorData((prev) => ({ ...prev, isLoading: false }));
        }
      } else if (status !== "loading") {
        setVendorData((prev) => ({ ...prev, isLoading: false }));
      }
    }
    fetchVendorProfile();
  }, [isAuthenticated, session?.user?.email, status]);

  // ৩. দ্বিতীয় ধাপ: vendorId পাওয়ার পর এপিআই থেকে রেসপন্স নিয়ে আসা
  const fetchVendorProperties = async () => {
    if (!vendorId) return;
    setIsPropertiesLoading(true);
    try {
      console.log(`📡 Fetching properties for Vendor ID: ${vendorId}`);
      const response = await fetch(`http://localhost:8080/properties/vendor/${vendorId}`);
      if (response.ok) {
        const data = await response.json();
        setProperties(Array.isArray(data) ? data : [data]); // যদি সিঙ্গেল অবজেক্ট আসে তবে অ্যারেতে কনভার্ট করবে
        console.log("✅ Properties loaded successfully:", data);
      } else {
        console.error("❌ Failed to load properties, status:", response.status);
      }
    } catch (error) {
      console.error("🚨 Error loading vendor properties:", error);
    } finally {
      setIsPropertiesLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchVendorProperties();
    }
  }, [vendorId]);

  const menuItems = [
    { name: "Dashboard", icon: "dashboard", href: "/dashboard/vendor" },
    { name: "My Properties", icon: "apartment", href: "/dashboard/vendor/properties", showCount: true },
    { name: "Bookings", icon: "book_online", href: "/dashboard/vendor/bookings" },
    { name: "Financials", icon: "payments", href: "/dashboard/vendor/financials" },
    { name: "Analytics", icon: "assessment", href: "/dashboard/vendor/analytics" },
  ];

  return (
    <VendorContext.Provider value={{ vendorId, properties, isPropertiesLoading, vendorData, refreshProperties: fetchVendorProperties }}>
      <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-800 overflow-hidden">
        {isMobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />}

        <aside className={`fixed md:relative z-50 h-full bg-white border-r border-gray-100 flex flex-col justify-between py-5 shrink-0 transition-[width,transform] duration-300 md:w-[84px] md:hover:w-[260px] md:translate-x-0 w-[260px] ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} group overflow-hidden whitespace-nowrap`}>
          <div>
            <div className="mb-8 flex items-center h-10 px-3">
              <Link href="/" className="hidden md:flex md:group-hover:hidden w-full justify-center cursor-pointer">
                <span className="material-symbols-outlined text-[#ba0036] text-[32px]">storefront</span>
              </Link>
              <div className="hidden md:group-hover:block transition-all pl-2">
                <Link href="/" className="text-2xl font-extrabold text-[#ba0036] tracking-tight cursor-pointer block">DhakaStay</Link>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Vendor Dashboard</p>
              </div>
              <div className="block md:hidden pl-2">
                <Link href="/" className="text-2xl font-extrabold text-[#ba0036] tracking-tight cursor-pointer block">DhakaStay</Link>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Vendor Dashboard</p>
              </div>
            </div>

            <nav className="space-y-1.5 px-3 relative">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all relative ${isActive ? "text-[#ba0036] bg-rose-50/50 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-[#ba0036] before:rounded-r" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                    <span className="material-symbols-outlined text-[22px] min-w-[22px] flex justify-center">{item.icon}</span>
                    <span className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{item.name}</span>
                    
                    {item.showCount && properties.length > 0 && (
                      <span className="ml-auto bg-rose-100 text-[#ba0036] text-[11px] font-bold px-2 py-0.5 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        {properties.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

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

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 text-gray-500 hover:text-[#ba0036] hover:bg-rose-50 rounded-lg">
                <span className="material-symbols-outlined text-[28px]">menu</span>
              </button>
              <div className="relative w-full max-w-[200px] sm:max-w-xs lg:max-w-md hidden sm:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                <input type="text" placeholder="Search analytics, properties or guests..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-[#ba0036]/30 focus:ring-2 focus:ring-[#ba0036]/10" />
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <button className="sm:hidden text-gray-500 hover:text-gray-800 p-2"><span className="material-symbols-outlined text-[24px]">search</span></button>
              <button className="text-gray-500 hover:text-[#ba0036] relative p-2">
                <span className="material-symbols-outlined text-[24px]">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba0036] rounded-full ring-2 ring-white"></span>
              </button>
              <button className="text-gray-500 hover:text-[#ba0036] p-2 hidden sm:block"><span className="material-symbols-outlined text-[24px]">mail</span></button>
              
              <div className="flex items-center gap-3 border-l pl-3 sm:pl-5 border-gray-200 ml-1">
                {vendorData.isLoading ? (
                  <div className="flex items-center gap-3 animate-pulse">
                    <div className="text-right hidden sm:block space-y-1">
                      <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      <div className="h-2 w-12 bg-gray-200 rounded ml-auto"></div>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-gray-900 truncate max-w-[140px]">{vendorData.name}</p>
                      <p className="text-[10px] font-medium text-gray-400 capitalize">{vendorData.roleTitle.toLowerCase()}</p>
                    </div>
                    <img src={vendorData.avatar} alt="Vendor Profile" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-gray-100 cursor-pointer" />
                  </>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f8f9fa]">
            {children}
          </main>
        </div>
      </div>
    </VendorContext.Provider>
  );
}

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <VendorDashboardContent>{children}</VendorDashboardContent>
    </SessionProvider>
  );
}