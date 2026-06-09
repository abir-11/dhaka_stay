"use client";

import React, { useState } from "react";

export default function SupportPage() {
  // FAQ Accordion Open/Close State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I cancel my reservation?",
      answer: "You can cancel your booking directly from your Bookings dashboard. Cancellations made up to 48 hours before check-in are eligible for a full refund based on our premium hosting policy."
    },
    {
      question: "When will I receive my refund?",
      answer: "Refunds are processed automatically upon cancellation. Depending on your bank, the amount will reflect in your account within 5 to 7 business days."
    },
    {
      question: "What is the DhakaStay Safety Guarantee?",
      answer: "Our Safety Guarantee ensures that every host is verified, properties meet strict cleanliness standards, and we provide 24/7 customer assistance during your entire stay."
    },
    {
      question: "How do I contact my host?",
      answer: "Once your booking is confirmed, you can use the built-in 'Contact Host' chat button on your dashboard to directly communicate with your host."
    }
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-300 pb-12 relative">
      
      {/* --- TOP HERO SEARCH BANNER --- */}
      <div 
        className="relative rounded-3xl overflow-hidden bg-gray-900 p-8 md:p-12 text-white bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(15, 20, 28, 0.85), rgba(15, 20, 28, 0.4)), url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop')` 
        }}
      >
        <div className="max-w-xl space-y-4 relative z-10">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">How can we help?</h1>
          <div className="flex bg-white rounded-xl p-1.5 shadow-md border border-white/10 items-center">
            <span className="material-symbols-outlined text-gray-400 pl-3 pr-2 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Describe your issue or search help articles..." 
              className="w-full bg-transparent border-none text-gray-800 placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none"
            />
            <button className="bg-[#ba0036] hover:bg-[#9a002d] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- THREE CORE CATEGORY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm space-y-3 hover:border-gray-200 transition-all cursor-pointer group">
          <div className="w-10 h-10 bg-rose-50 text-[#ba0036] rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Contact Support</h3>
            <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
              Chat with our 24/7 hospitality specialists for immediate help.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm space-y-3 hover:border-gray-200 transition-all cursor-pointer group">
          <div className="w-10 h-10 bg-rose-50 text-[#ba0036] rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">gpp_good</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Safety Center</h3>
            <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
              Resources and emergency contacts to keep your stay worry-free.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm space-y-3 hover:border-gray-200 transition-all cursor-pointer group">
          <div className="w-10 h-10 bg-rose-50 text-[#ba0036] rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">event_busy</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Cancellation Options</h3>
            <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
              Manage booking changes, refunds, and policy information.
            </p>
          </div>
        </div>
      </div>

      {/* --- LOWER CONTENT SPLIT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Active Support Tickets Tracker */}
        <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Active Support Tickets</h3>
            <span className="bg-rose-50 text-[#ba0036] text-[10px] font-extrabold px-2 py-0.5 rounded-md">2 Tickets</span>
          </div>

          {/* Ticket 1 (Resolved) */}
          <div className="border border-gray-100 p-4 rounded-xl space-y-2 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-gray-400">TKT-8842</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">Resolved</span>
            </div>
            <h4 className="text-xs font-bold text-gray-800 leading-snug">Late check-in inquiry for Dhaka Penthouse</h4>
            <p className="text-[11px] text-gray-400 font-medium line-clamp-1">The host has confirmed that you can access...</p>
            <p className="text-[10px] font-bold text-gray-400 pt-1">Last updated 2h ago</p>
          </div>

          {/* Ticket 2 (Open) */}
          <div className="border border-gray-100 p-4 rounded-xl space-y-2 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-gray-400">TKT-9105</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase">Open</span>
            </div>
            <h4 className="text-xs font-bold text-gray-800 leading-snug">Refund request: Gulshan Apartment</h4>
            <p className="text-[11px] text-gray-400 font-medium line-clamp-1">Processing of your cancellation refund for t...</p>
            <p className="text-[10px] font-bold text-amber-600 pt-1">Pending agent response</p>
          </div>

          <button className="w-full py-2.5 border border-[#ba0036]/20 hover:border-[#ba0036] text-[#ba0036] bg-white text-xs font-bold rounded-xl transition-all text-center">
            View Ticket History
          </button>
        </div>

        {/* Right Side: FAQ Accordions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-gray-500 text-[20px]">quiz</span>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">Top Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-gray-800 hover:bg-gray-50/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span 
                    className={`material-symbols-outlined text-gray-400 transition-transform text-[18px] ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                
                {/* Accordion Content Body */}
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-gray-500 font-medium leading-relaxed border-t border-gray-50 pt-3 bg-gray-50/20 animate-in slide-in-from-top-1 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Browse Help Desk Area */}
          <div className="bg-gray-100/50 border border-gray-200/40 p-4 rounded-xl flex items-center justify-between flex-wrap gap-3">
            <div>
              <h4 className="text-xs font-bold text-gray-800">Didn&apos;t find what you&apos;re looking for?</h4>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">Our help library has over 500 articles available.</p>
            </div>
            <a href="#" className="text-xs font-bold text-[#ba0036] hover:underline shrink-0">
              Browse all articles
            </a>
          </div>
        </div>

      </div>

      {/* --- FIXED FLOATING CHAT WIDGET ICON --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 bg-[#ba0036] hover:bg-[#9a002d] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group">
          <span className="material-symbols-outlined text-[22px] fill-current">chat</span>
        </button>
      </div>

    </div>
  );
}