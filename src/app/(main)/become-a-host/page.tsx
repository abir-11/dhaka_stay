"use client";

import React, { useState } from 'react';

// Sub-component for functional FAQ toggles
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-6">
      <button 
        className="flex justify-between items-center w-full text-left group" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-bold text-gray-900 group-hover:text-[#e51d53] transition-colors">
          {question}
        </span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden text-gray-600 text-base leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function HostPage() {
  return (
    <main className="w-full bg-white font-sans text-gray-900">
      
      {/* Hero / Estimator Section */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden">
        <div className="max-w-11/12 mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="z-10 mt-10">
            <h1 className="text-5xl md:text-[56px] font-bold leading-tight text-gray-900 mb-6 tracking-tight">
              Host your home on DhakaStay
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-md mb-12">
              Join our community of hosts in Dhaka and start earning while sharing the legendary Bangladeshi hospitality with travelers from around the world.
            </p>
            <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-gray-200">
              <img 
                alt="A luxurious modern apartment interior in Gulshan, Dhaka, featuring high ceilings, floor-to-ceiling windows with a city view, and elegant minimalist furniture." 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzejOJEXtD1byCipSCLNHCrObYDPCpDrFg-sJryaNc-h1h2ykpK6J25Z_TYupgIKxen1olsQdVXdvADxYLXQqOFwTe8byRurj23iugaoXuZkeNEilb3t4psax7B3GA_XmY4QQRqmtDWbTJRf0BERNipJGPaxHSl5aVh5yLZWlSrwoJOV4d7iwoFO4ItVMcnkczdFVAh0SEbD24IU01uVUG2h9BbpPh0hsXwwtLEoN_tWvTU8fsavCV7bf1AohHz2sVZPYj_eEqtRE"
              />
            </div>
          </div>
          
          <div className="lg:pl-12">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#e51d53] mb-2 tracking-tight">DhakaStay it.</h2>
                <p className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter" id="earnings-display">
                  ৳24,500
                </p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-2">
                  estimated monthly earnings
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Property Type</label>
                  <div className="relative">
                    <select className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-xl text-lg font-medium text-gray-900 appearance-none outline-none focus:border-[#e51d53]">
                      <option>Entire home</option>
                      <option>Private room</option>
                      <option>Shared space</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                  <div className="relative">
                    <select className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 rounded-xl text-lg font-medium text-gray-900 appearance-none outline-none focus:border-[#e51d53]">
                      <option>Gulshan, Dhaka</option>
                      <option>Banani, Dhaka</option>
                      <option>Dhanmondi, Dhaka</option>
                      <option>Uttara, Dhaka</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">location_on</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="w-full bg-[#e51d53] py-4 rounded-xl text-white font-bold text-lg hover:bg-[#d4184c] transition-all active:scale-95 shadow-lg shadow-[#e51d53]/30">
                    DhakaStay Setup
                  </button>
                </div>
              </div>
              
              <p className="mt-8 text-center text-gray-500 text-sm">
                <a href="#" className="underline hover:text-gray-900 transition-colors">Learn how we estimate your earnings.</a> Estimates are based on average monthly income of comparable listings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AirCover Section (High-end Feature Highlight) */}
      <section className="bg-gray-50 py-20 md:py-[100px] border-y border-gray-100">
        <div className="max-w-11/12 mx-auto px-6 md:px-8 lg:px-12 text-center">
          <div className="inline-block mb-8">
            <span className="text-[#e51d53] font-black text-4xl md:text-5xl tracking-tight">DhakaStay</span>
            <span className="text-gray-900 font-black text-4xl md:text-5xl tracking-tight">AirCover</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-12 max-w-2xl mx-auto text-gray-800 leading-snug">
            The most comprehensive protection in hosting. Free with every listing.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-left mt-12">
            <div className="p-6 md:border-r border-gray-200">
              <span className="material-symbols-outlined text-[#e51d53] text-[48px] mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Guest identity verification</h4>
              <p className="text-base text-gray-600 leading-relaxed">Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests.</p>
            </div>
            <div className="p-6 md:border-r border-gray-200">
              <span className="material-symbols-outlined text-[#e51d53] text-[48px] mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>cleaning_services</span>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Professional Cleaning</h4>
              <p className="text-base text-gray-600 leading-relaxed">Access to our network of certified DhakaStay cleaning partners to ensure your space is always guest-ready and sanitized.</p>
            </div>
            <div className="p-6">
              <span className="material-symbols-outlined text-[#e51d53] text-[48px] mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              <h4 className="text-xl font-bold mb-3 text-gray-900">24/7 Safety Line</h4>
              <p className="text-base text-gray-600 leading-relaxed">If you ever feel unsafe, our app provides one-tap access to specially-trained safety agents, day or night.</p>
            </div>
          </div>
          
          <button className="mt-12 px-8 py-4 border-2 border-gray-900 rounded-xl font-bold text-gray-900 hover:bg-gray-100 transition-colors">
            Learn more about AirCover
          </button>
        </div>
      </section>

      {/* Bento Grid Benefits */}
      <section className="py-20 md:py-[100px] bg-white">
        <div className="max-w-11/12 mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 tracking-tight">Everything you need to succeed</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[280px]">
            
            {/* Photography Service */}
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden group min-h-[280px]">
              <img 
                alt="A professional photographer using a high-end camera on a tripod to shoot a brightly lit living room in Banani." 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqD1pL0P3c2dxP8Brv2Zk26HeHal2JD29kPIBV0-9epeNMdS-BgNm20WciTWWVvhAwd1Z4rrAUpMObvcuP94GvAa2k3ObyZlfLlqzSIM21tCU-BSYHu00GjnMkjRByuyDvoptnZxhvX342AO9G0DQtTBQ1D8WdKMmzvkcAq-gm9voSFE-6mCXE0s9-CyfOXDVfJC-5eQxtIHorIZTfgysI97TshIcyGICh0D0I61uznr_qZUVPT-bWbjPls_HYuBpDEB1Tcz4Uhcg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">Professional Photography</h3>
                <p className="text-base text-gray-200 max-w-md">We provide free high-end photography for qualified listings to make your home stand out in the Gulshan and Banani markets.</p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="md:col-span-4 bg-[#e51d53] rounded-2xl p-8 flex flex-col justify-between text-white shadow-lg min-h-[280px]">
              <span className="material-symbols-outlined text-[48px] opacity-90">contact_support</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Always here for you</h3>
                <p className="text-white/90 text-base leading-relaxed">From setting up your listing to your 100th guest, our dedicated Dhaka support team is available 24/7.</p>
              </div>
            </div>

            {/* Local Experts */}
            <div className="md:col-span-4 bg-gray-50 rounded-2xl p-8 flex flex-col border border-gray-200 min-h-[280px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Local Expert Guidance</h3>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">Connect with Superhosts in your neighborhood for tips on everything from interior design to local regulations.</p>
              <div className="mt-auto flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                  <img alt="Portrait of a smiling professional woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDedok5IeBII6lErlLv8FEDDsY-bJRnFpGQn1-aD_FVvDecNKlito0ojGI6ZodakpUzbh56gD5IIEXVh71wmQTwgrc-RTt-LUCCxdFm4hRBfRTDfb5EroDWtUAUNYnA02pcCQZTG5spoMHEXO5HFAvcT4FeCGlOt7i4iypSMSGX2VQk8EBw0EQ9f0dgwT_pap7zaWFebFXoelkUMhtMHP1o3sXMMPZeWfjvkxWetUdtLU5MBfomFQ8xvvi2lXJy7iOwY2sF8ahQE-c" className="w-full h-full object-cover"/>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                  <img alt="Portrait of a friendly man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAonAq-EQnwLCWpQyDRbasK_o02ezPaDAsgzbbp_NnOBZlqmApxYzp2aK2JcPkW4uA6TkDd-wiKpLBWLI44kKHzKMS80QCBXEgFnoa7Qm_0n6HSXhaJRRhvEV2Zoqg-ZBEOnLZuw479V5AReJ7bdcnH3ZjLikTZJjKaWQdRhy4awFsGsRI4rEIkl5JP_dAmxIN5T7vXC0vslOvcDq7N-FBZEXOfefGAOai4Ypi1LIm9M6WYDTf9EE6mvkxYyVvaztt3zpVJsvhGFQ" className="w-full h-full object-cover"/>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-gray-900 text-white font-bold text-xs shadow-sm z-10">
                  +12
                </div>
              </div>
            </div>

            {/* Marketing Power */}
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden group min-h-[280px]">
              <img 
                alt="A clean, minimalist office space with high-end tech, showing a team monitoring a global travel platform dashboard." 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe1mwrBgkFqrcqqyYPWaooTlfHRDADkz6iIZDOjgauadMnrComA3G4sCPSiRlzS3m_lbQldKi6sFi3w6pAfC7g0dTynVd2p2nxKFQdbvHon1qvAXjUTdBu2Ql8eTJbskhS2N85cmIZ3GaFks7DQv0Q3QuWJKg5fKj8-VPwBZtDHYRYhHz95FXjCbgzVOzhBlyEtGzqI3UkiyJXe-Ui5qI2v6qVNJC6ktyIqskvSf0dHRv6CtILB5XmL7_8wfSv30MC-dkppWn1X-g"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">Global Visibility</h3>
                <p className="text-base text-gray-200 max-w-md">Your home is showcased to millions of international travelers looking for a premium stay in Dhaka.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-[100px] bg-gray-50 border-y border-gray-100">
        <div className="max-w-11/12 mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center tracking-tight">Loved by hosts in Dhaka</h2>
          
          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-8 hide-scrollbar snap-x snap-mandatory">
            
            {/* Testimonial 1 */}
            <div className="min-w-[85vw] sm:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 snap-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img 
                    alt="Portrait of a sophisticated female property owner in Gulshan." 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJFs_L0t2jgXpRJkbo_Ef5Waz_UkkegojMqaaGcM6_LKWfiwm9YrhD45DziS7YF3WAtsZEgRWExnsrocW4cHqk8kbWOlDq0Oh7UdTK7uCbTrFGaLqv8PpGa0XLP4x5qbVp-tn-U9XxcoEcWCFuucNPi_bBUeKeRUmQeNO7Ok-nPGwLmNvkN4SZZ6mKzUQ8mKgxN9CzMO7-WOYTX0nBxYaXjuZAm1W2XpX4yOSn94SK920IoTv9Ubsp9qSywwzGqvcLe-RuSX5w0YA"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Farhana S.</h4>
                  <p className="text-sm font-semibold text-gray-500">Gulshan-2 Host</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">"Hosting on DhakaStay transformed my extra apartment into a thriving business. The AirCover protection gives me complete peace of mind, and the quality of guests has been exceptional."</p>
            </div>

            {/* Testimonial 2 */}
            <div className="min-w-[85vw] sm:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 snap-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img 
                    alt="Portrait of a confident male host in Banani." 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6kOXkc5YgIqWWN6a7bbd8JiUr08epeHOeyc67HhH_tC2Bt2qP_Qwc9MEx7afmx7gTeo4q_dBsLtfPM28zxDz3oH7wDNTGPxj_y5IWKyIdHA9hJqo4xU_hytz3hQTZxr5xuRZgtJk0Te3usGq3H0wtsk1R3MbBJyrZ35TMI1Pxq1FHdwWNGckkTt47_9C_98han7DVEpAvEN2vPzB0a7mhFQ-VkhKaIk-MXEdE97zrHRpT9tnLBq0TGsnzFQm52OeGLCBRDcVWrsU"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Rahat A.</h4>
                  <p className="text-sm font-semibold text-gray-500">Banani Host</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">"The professional photography service made a huge difference. My booking rate increased by 40% in the first month. The local support team is always just a call away."</p>
            </div>

            {/* Testimonial 3 */}
            <div className="min-w-[85vw] sm:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 snap-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <img 
                    alt="Portrait of a young creative host in Dhanmondi." 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkqt7gHy_JoVsgrklsoVZ81Y_K1e1upLmVHndgP55fw0gEnZfs4LnniRH159gVa2IW_Lv_s0pEs5OG5f3mRaVlMjtFgl-edfMLGZ7085C_CKHnylH4OH5Ggftx29QuyPNhWM3mvFJAo49hO4tJVRFa7JOsA7oVLeyFPD-f9c64lO40UzDMsz7VMzgJvBqk2fE4DhFx_mIWypakXySiUaasEpT4ukd0tc4uKBHyKq-08E6JJBKXPmO25fmfboPCT8xiDNpeNmks1Lc"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Zarin T.</h4>
                  <p className="text-sm font-semibold text-gray-500">Dhanmondi Host</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">"DhakaStay makes everything so simple. The automated payment system and guest verification take all the stress out of managing my property while I work full-time."</p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-[100px] bg-white">
        <div className="max-w-[800px] mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center tracking-tight">Your questions, answered</h2>
          
          <div className="space-y-6">
            <FaqItem 
              question="Is my place right for DhakaStay?" 
              answer="DhakaStay guests are looking for all kinds of places—from tiny homes and apartments to penthouses and boutique hotels. Whether you have an extra room or an entire estate, you can host on DhakaStay."
            />
            <FaqItem 
              question="Do I have to host all the time?" 
              answer="Not at all. You control your calendar. You can host once a year, a few nights a month, or every day. It's completely up to you."
            />
            <FaqItem 
              question="How much should I charge?" 
              answer="You choose your price. To help you decide, you can search for comparable listings in your city or neighborhood to get an idea of market prices. We also offer smart pricing tools that adjust based on demand."
            />
            <FaqItem 
              question="How do I get paid?" 
              answer="We typically release your payout about 24 hours after your guest's scheduled check-in time. You can choose to receive your money via direct bank transfer, bKash, or international wire."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-[120px] bg-[#f8f9fa] text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-[56px] font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            Ready to DhakaStay it?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of hosts in Dhaka and start your hosting journey today. We'll guide you through every step.
          </p>
          <button className="bg-[#e51d53] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-[#e51d53]/20">
            Get Started
          </button>
        </div>
      </section>

    </main>
  );
}