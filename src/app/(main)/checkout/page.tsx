"use client";

import React, { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "bank">("card");
  const [selectedWallet, setSelectedWallet] = useState<"bkash" | "nagad">("bkash");

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking Confirmed Successfully!");
  };

  return (
    <main className="max-w-11/12 mx-auto mt-20 px-6 py-10 bg-[#f9f9f9] min-h-screen text-gray-900 font-sans">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Guest Info Form */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <input required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" placeholder="John Doe" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                <input required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" placeholder="john@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                <input required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" placeholder="+880 1XXX-XXXXXX" type="tel" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Nationality</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none bg-white">
                  <option>Bangladeshi</option>
                  <option>Foreigner</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] transition-all outline-none" type="date" />
              </div>
            </div>
          </section>

          {/* Payment Method Selection */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Payment Method</h2>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                type="button" 
                onClick={() => setPaymentMethod("card")}
                className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-2 rounded-xl transition-all text-sm font-semibold ${
                  paymentMethod === "card" 
                    ? "border-[#ba0036] bg-[#fff0f3] text-[#ba0036]" 
                    : "border-gray-200 text-gray-500 hover:text-[#ba0036] hover:border-[#ba0036]"
                }`}
              >
                <span className="material-symbols-outlined">credit_card</span> Card
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod("mobile")}
                className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-2 rounded-xl transition-all text-sm font-semibold ${
                  paymentMethod === "mobile" 
                    ? "border-[#ba0036] bg-[#fff0f3] text-[#ba0036]" 
                    : "border-gray-200 text-gray-500 hover:text-[#ba0036] hover:border-[#ba0036]"
                }`}
              >
                <span className="material-symbols-outlined">account_balance_wallet</span> Mobile Banking
              </button>
              <button 
                type="button" 
                onClick={() => setPaymentMethod("bank")}
                className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 border-2 rounded-xl transition-all text-sm font-semibold ${
                  paymentMethod === "bank" 
                    ? "border-[#ba0036] bg-[#fff0f3] text-[#ba0036]" 
                    : "border-gray-200 text-gray-500 hover:text-[#ba0036] hover:border-[#ba0036]"
                }`}
              >
                <span className="material-symbols-outlined">account_balance</span> Bank Transfer
              </button>
            </div>

            {/* Conditional Payment Sub-forms */}
            {paymentMethod === "card" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Card Number</label>
                  <div className="relative">
                    <input className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] pl-10 outline-none" placeholder="XXXX XXXX XXXX XXXX" type="text" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Expiry Date</label>
                    <input className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] outline-none" placeholder="MM/YY" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">CVV</label>
                    <input className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] outline-none" placeholder="***" type="password" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "mobile" && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-gray-500 mb-2">Select your mobile wallet provider:</p>
                <div className="flex gap-4 mb-4">
                  <div 
                    onClick={() => setSelectedWallet("bkash")} 
                    className={`flex-1 p-4 border rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                      selectedWallet === "bkash" ? "border-[#ba0036] bg-[#fff0f3]" : "border-gray-200 hover:border-[#ba0036]"
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-pink-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="font-bold text-pink-600 text-xs">bKash</span>
                      </div>
                      <span className="text-sm font-semibold">bKash</span>
                    </div>
                  </div>
                  <div 
                    onClick={() => setSelectedWallet("nagad")} 
                    className={`flex-1 p-4 border rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                      selectedWallet === "nagad" ? "border-[#ba0036] bg-[#fff0f3]" : "border-gray-200 hover:border-[#ba0036]"
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="font-bold text-orange-600 text-xs">Nagad</span>
                      </div>
                      <span className="text-sm font-semibold">Nagad</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600">Account Number</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#ba0036] focus:ring-1 focus:ring-[#ba0036] outline-none" placeholder="017XXXXXXXX" type="tel" />
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Transfer details will be sent to your email after you confirm the booking. Available banks: <strong>Dutch Bangla, City Bank, Brac Bank.</strong>
                </p>
              </div>
            )}
          </section>

          {/* Special Requests */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none outline-none">
                <h2 className="text-xl font-bold">Special Requests (Optional)</h2>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-6">
                <textarea className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] outline-none resize-none" placeholder="Tell your host if you need anything specific (e.g. early check-in, dietary restrictions)..."></textarea>
              </div>
            </details>
          </section>

          {/* Cancellation & Terms */}
          <section className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-5 rounded-xl flex items-start gap-4">
              <span className="material-symbols-outlined text-green-600 mt-0.5">event_available</span>
              <div>
                <p className="text-sm font-bold text-green-800">Free cancellation before July 10, 2026</p>
                <p className="text-sm text-green-700 mt-1">Cancel by 12:00 PM for a full refund of the base price.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input required className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ba0036] focus:ring-[#ba0036]" type="checkbox" />
                <span className="text-sm text-gray-700">I agree to the <a className="text-[#ba0036] hover:underline font-semibold" href="#">DhakaStay Guest Refund Policy</a> and the <a className="text-[#ba0036] hover:underline font-semibold" href="#">Terms of Service</a>.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input required className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ba0036] focus:ring-[#ba0036]" type="checkbox" />
                <span className="text-sm text-gray-700">I understand the house rules and the host's cancellation policy.</span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-8 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md backdrop-blur-md">
              
              {/* Property Preview */}
              <div className="flex gap-4 pb-6 border-b border-gray-100 mb-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img className="w-full h-full object-cover" alt="Luxury Apartment in Gulshan" src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-gray-900">Luxury Apartment in Gulshan</h3>
                  <p className="text-xs font-medium text-gray-500 mt-1">Entire Condo • Dhaka, BD</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[#ba0036] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold">4.92</span>
                    <span className="text-sm text-gray-500">(128 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-gray-600">Dates</div>
                  <div className="text-sm font-medium text-gray-900">July 15 – 20, 2026</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold text-gray-600">Guests</div>
                  <div className="text-sm font-medium text-gray-900">4 adults</div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Price Details</h4>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>৳12,500 x 5 nights</span>
                  <span>৳62,500</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span className="underline cursor-help">Cleaning fee</span>
                  <span>৳2,500</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span className="underline cursor-help">DhakaStay service fee</span>
                  <span>৳8,900</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Occupancy taxes</span>
                  <span>৳1,200</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-[#ba0036] focus:border-[#ba0036] outline-none" placeholder="Enter Promo Code" type="text" />
                <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">Apply</button>
              </div>

              {/* Total */}
              <div className="pt-6 border-t border-gray-200 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total (BDT)</span>
                <span className="text-2xl font-bold text-[#ba0036]">৳75,100</span>
              </div>

              {/* CTA */}
              <button type="submit" className="w-full bg-[#ba0036] text-white py-3.5 rounded-xl text-lg font-bold hover:bg-[#9a002d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-4 shadow-md shadow-rose-600/20">
                Confirm & Pay
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              
              <p className="text-center text-xs font-medium text-gray-500">
                You won't be charged yet until you confirm this step.
              </p>
            </div>

            {/* Trust Badges Sidebar */}
           
           
          </div>
        </div>
      </form>
    </main>
  );
}