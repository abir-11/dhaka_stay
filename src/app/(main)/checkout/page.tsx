"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

interface PropertyData {
  id: number;
  title: string;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number;
  vendorId: number;
}

interface VendorPaymentConfig {
  id: number;
  vendorName: string;
  allowCard: boolean;
  allowMobileBanking: boolean;
  allowBankTransfer: boolean;
  bkashNumber?: string;
  nagadNumber?: string;
  bankDetails?: string;
}

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const propertyId = searchParams.get("propertyId") || "1";
  const initialCheckIn = searchParams.get("checkIn") || new Date().toISOString().split("T")[0];
  const initialCheckOut = searchParams.get("checkOut") || new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const initialGuests = parseInt(searchParams.get("guests") || "1");

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [nights, setNights] = useState(1);

  const [property, setProperty] = useState<PropertyData | null>(null);
  const [vendorConfig, setVendorConfig] = useState<VendorPaymentConfig | null>(null);
  
  const [isPropertyLoading, setIsPropertyLoading] = useState(true);
  const [isVendorLoading, setIsVendorLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("Bangladeshi");
  const [dob, setDob] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "bank">("card");
  const [selectedWallet, setSelectedWallet] = useState<"bkash" | "nagad">("bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsPropertyLoading(true);
        const response = await fetch(`http://localhost:8080/property/${propertyId}`);
        
        if (response.ok) {
          const textData = await response.text();
          if (!textData) {
            console.error("Backend returned empty response body for property.");
            setIsPropertyLoading(false);
            return;
          }
          const data: PropertyData = JSON.parse(textData);
          setProperty(data);
          
          if (data.vendorId) {
            fetchVendorConfig(data.vendorId);
          }
        } else {
          console.error("Failed to fetch property details. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setIsPropertyLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyData();
    }
  }, [propertyId]);

  const fetchVendorConfig = async (vId: number) => {
    try {
      setIsVendorLoading(true);
      const response = await fetch(`http://localhost:8080/properties/vendor/${vId}`);
      if (response.ok) {
        const textData = await response.text();
        if (!textData) {
          console.warn("Backend returned empty response body for vendor config.");
          return;
        }
        const data: VendorPaymentConfig = JSON.parse(textData);
        setVendorConfig(data);
        
        if (!data.allowCard) {
          if (data.allowMobileBanking) setPaymentMethod("mobile");
          else if (data.allowBankTransfer) setPaymentMethod("bank");
        }
      }
    } catch (error) {
      console.error("Error fetching vendor config:", error);
    } finally {
      setIsVendorLoading(false);
    }
  };

  useEffect(() => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    
    if (date2 > date1) {
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(0); 
    }
  }, [checkIn, checkOut]);

  const basePricePerNight = property?.pricePerNight || 0;
  const cleaningFee = property?.cleaningFee || 0;
  const serviceFee = property?.serviceFee || 0; 

  const totalNightlyPrice = basePricePerNight * nights;
  const totalPrice = totalNightlyPrice > 0 ? (totalNightlyPrice + cleaningFee + serviceFee) : 0;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (nights <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Dates",
        text: "Please select a valid Check-out date after Check-in.",
        confirmButtonColor: "#ba0036"
      });
      return;
    }
    
    setLoading(true);

    Swal.fire({
      title: "Processing Booking...",
      text: "Please wait while we secure your reservation.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const bookingPayload = {
      customerId: 1, 
      propertyId: parseInt(propertyId),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestCount: guests,
      basePrice: totalNightlyPrice,
      cleaningFee: cleaningFee,
      serviceFee: serviceFee, 
      totalPrice: totalPrice,
      specialRequests: specialRequests,
      guestDetails: { fullName, email, phone, nationality, dob },
      paymentDetails: {
        method: paymentMethod,
        wallet: paymentMethod === "mobile" ? selectedWallet : null,
        account: paymentMethod === "mobile" ? accountNumber : null
      }
    };

    try {
      const response = await fetch("http://localhost:8080/saveBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        const textData = await response.text(); 
        const data = textData ? JSON.parse(textData) : {};

        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          html: `Your reference code is: <b>${data.bookingReference || "N/A"}</b>`,
          confirmButtonColor: "#ba0036",
          confirmButtonText: "Great!"
        }).then(() => {
          router.push(`/booking-success?ref=${data.bookingReference || ""}`);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "Something went wrong with the booking server. Please try again.",
          confirmButtonColor: "#ba0036"
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to connect to the backend server.",
        confirmButtonColor: "#ba0036"
      });
    } finally {
      setLoading(false);
    }
  };

  if (isPropertyLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9]">
        <div className="w-12 h-12 border-4 border-[#ba0036] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-semibold text-gray-600">Loading dynamic property & pricing info...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto mt-20 px-6 py-10 bg-[#f9f9f9] min-h-screen text-gray-900 font-sans">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Your Trip Details</h2>
            <div className="border border-gray-300 rounded-xl overflow-hidden bg-gray-50 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
              <div className="p-4 cursor-pointer">
                <label className="block text-[10px] font-bold uppercase text-gray-500">Check-in</label>
                <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm font-semibold outline-none bg-transparent mt-1 text-gray-800 cursor-pointer" />
              </div>
              <div className="p-4 cursor-pointer">
                <label className="block text-[10px] font-bold uppercase text-gray-500">Check-out</label>
                <input required type="date" value={checkOut} min={checkIn} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm font-semibold outline-none bg-transparent mt-1 text-gray-800 cursor-pointer" />
              </div>
              <div className="p-4 cursor-pointer">
                <label className="block text-[10px] font-bold uppercase text-gray-500">Guests</label>
                <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full text-sm font-semibold outline-none bg-transparent mt-1 text-gray-800 cursor-pointer">
                  {[...Array(property?.maxGuests || 4)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" placeholder="John Doe" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" placeholder="john@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" placeholder="+880 1XXX-XXXXXX" type="tel" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Nationality</label>
                <select value={nationality} onChange={(e) => setNationality(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none bg-white">
                  <option value="Bangladeshi">Bangladeshi</option>
                  <option value="Foreigner">Foreigner</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
                <input required value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" type="date" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-2">Payment Method</h2>
            {vendorConfig && (
              <p className="text-xs text-gray-500 mb-6">
                Accepted payment gateways by host: <span className="font-semibold">{vendorConfig.vendorName}</span>
              </p>
            )}

            {isVendorLoading ? (
              <div className="text-sm text-gray-500 animate-pulse">Loading available payment options...</div>
            ) : (
              <>
                <div className="flex flex-wrap gap-4 mb-8">
                  {(!vendorConfig || vendorConfig.allowCard) && (
                    <button type="button" onClick={() => setPaymentMethod("card")} className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-2 rounded-xl transition-all text-sm font-semibold ${paymentMethod === "card" ? "border-[#ba0036] bg-[#fff0f3] text-[#ba0036]" : "border-gray-200 text-gray-500 hover:text-[#ba0036] hover:border-[#ba0036]"}`}>
                      Card
                    </button>
                  )}
                  {(!vendorConfig || vendorConfig.allowMobileBanking) && (
                    <button type="button" onClick={() => setPaymentMethod("mobile")} className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-2 rounded-xl transition-all text-sm font-semibold ${paymentMethod === "mobile" ? "border-[#ba0036] bg-[#fff0f3] text-[#ba0036]" : "border-gray-200 text-gray-500 hover:text-[#ba0036] hover:border-[#ba0036]"}`}>
                      Mobile Banking
                    </button>
                  )}
                  {(!vendorConfig || vendorConfig.allowBankTransfer) && (
                    <button type="button" onClick={() => setPaymentMethod("bank")} className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-2 rounded-xl transition-all text-sm font-semibold ${paymentMethod === "bank" ? "border-[#ba0036] bg-[#fff0f3] text-[#ba0036]" : "border-gray-200 text-gray-500 hover:text-[#ba0036] hover:border-[#ba0036]"}`}>
                      Bank Transfer
                    </button>
                  )}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-600">Card Number</label>
                      <input className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] outline-none" placeholder="XXXX XXXX XXXX XXXX" type="text" />
                    </div>
                  </div>
                )}

                {paymentMethod === "mobile" && (
                  <div className="space-y-5">
                    <div className="flex gap-4">
                      <div onClick={() => setSelectedWallet("bkash")} className={`flex-1 p-4 border rounded-xl flex items-center justify-center cursor-pointer ${selectedWallet === "bkash" ? "border-[#ba0036] bg-[#fff0f3]" : "border-gray-200"}`}>
                        <span className="text-sm font-semibold">bKash</span>
                      </div>
                      <div onClick={() => setSelectedWallet("nagad")} className={`flex-1 p-4 border rounded-xl flex items-center justify-center cursor-pointer ${selectedWallet === "nagad" ? "border-[#ba0036] bg-[#fff0f3]" : "border-gray-200"}`}>
                        <span className="text-sm font-semibold">Nagad</span>
                      </div>
                    </div>
                    
                    {vendorConfig && (
                      <div className="p-3 bg-gray-50 border border-dashed rounded-lg text-xs text-gray-600">
                        📢 Send money to Host Account: <span className="font-bold text-gray-800">{selectedWallet === "bkash" ? vendorConfig.bkashNumber || "N/A" : vendorConfig.nagadNumber || "N/A"}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-600">Your Account Number ({selectedWallet})</label>
                      <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] outline-none" placeholder="017XXXXXXXX" type="tel" />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <p className="text-sm text-gray-700 font-semibold">Host Bank Account Details:</p>
                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      {vendorConfig?.bankDetails || "Transfer details will be sent to your email after booking confirmation."}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Special Requests (Optional)</h2>
            <textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] outline-none resize-none" placeholder="Tell your host if you need anything specific..."></textarea>
          </section>
        </div>

        {/* Right Column: Dynamic Sticky Sidebar Summary */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-8 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-4">{property?.title || "Loading Property..."}</h3>
              
              <p className="text-xs text-gray-500 mb-2"><strong>Dates:</strong> {checkIn} to {checkOut}</p>
              <p className="text-xs text-gray-500 mb-6"><strong>Guests:</strong> {guests} {guests === 1 ? "guest" : "guests"}</p>
              
              <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                {nights > 0 ? (
                  <>
                    <div className="flex justify-between text-gray-700">
                      <span>৳{basePricePerNight.toLocaleString()} x {nights} nights</span>
                      <span>৳{totalNightlyPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Cleaning Fee</span>
                      <span>৳{cleaningFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>DhakaStay Service Fee</span>
                      <span>৳{serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4 text-[#ba0036]">
                      <span>Total Before Taxes</span>
                      <span>৳{totalPrice.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-sm font-semibold text-rose-600 py-2">
                    Invalid dates selected. Check-out must be after Check-in.
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading || nights === 0 || isPropertyLoading} className="w-full mt-6 bg-[#ba0036] text-white py-3.5 rounded-xl text-lg font-bold hover:bg-[#9a002d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md">
                {loading ? "Processing..." : `Confirm & Pay ৳ ${totalPrice.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>

      </form>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Checkout Details...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}