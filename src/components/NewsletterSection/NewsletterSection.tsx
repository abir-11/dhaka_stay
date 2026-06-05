import React from 'react';

export default function NewsletterSection() {
  return (
    <section className="bg-[#b90e3c] py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[16px] font-bold text-white mb-4">
          Get the Dhaka Secret Guide
        </h2>
        <p className="text-[13px] text-pink-50 leading-relaxed mb-8 max-w-[480px] mx-auto">
          Join 20,000+ travelers and receive weekly curated hidden gems, new openings, and exclusive discounts in Dhaka.
        </p>
        
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[460px] mx-auto mb-4">
          <input 
            type="email" 
            placeholder="Your email address" 
            required
            className="w-full sm:flex-1 h-[48px] px-6 rounded-full text-[13px] text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50"
          />
          <button 
            type="submit"
            className="w-full sm:w-auto h-[48px] px-8 bg-[#1a1a1a] text-white rounded-full text-[14px] font-bold hover:bg-black transition-colors"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-[9px] text-white/70 font-medium">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}