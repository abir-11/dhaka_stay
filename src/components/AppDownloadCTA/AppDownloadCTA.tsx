import React from 'react';

export default function AppDownloadCTA() {
    return (
        <section className="bg-white py-12 pb-24">
            <div className="max-w-11/12 mx-auto px-6">
                <div className="bg-[#1a1a1a] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-12 md:pt-0 relative min-h-[450px]">

                    {/* Left Text & Buttons */}
                    <div className="flex-1 text-left z-10 py-10 md:py-20 md:pr-10 w-full">
                        <h2 className="text-white text-[32px] md:text-[46px] font-extrabold leading-[1.1] mb-5 tracking-tight max-w-[400px]">
                            Your Stay, Just a Tap Away.
                        </h2>
                        <p className="text-gray-400 text-[14px] md:text-[15px] leading-relaxed mb-10 max-w-[380px]">
                            Download the DhakaStay app to manage your bookings, message hosts, and unlock app-exclusive secret deals.
                        </p>

                        {/* Store Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Apple App Store Mock Button */}
                            <button className="bg-white text-black px-4 py-2.5 rounded-[12px] flex items-center gap-3 hover:bg-gray-100 transition-colors w-fit">
                                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    grid_view
                                </span>
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-800 leading-none mb-0.5">Download on the</span>
                                    <span className="text-[16px] font-bold leading-none">App Store</span>
                                </div>
                            </button>

                            {/* Google Play Mock Button */}
                            <button className="bg-white text-black px-4 py-2.5 rounded-[12px] flex items-center gap-3 hover:bg-gray-100 transition-colors w-fit">
                                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    play_arrow
                                </span>
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-800 leading-none mb-0.5">GET IT ON</span>
                                    <span className="text-[16px] font-bold leading-none">Google Play</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Phone Image Wrapper */}
                    <div className="flex-1 w-full h-[300px] md:h-[500px] relative mt-8 md:mt-0 flex justify-center md:justify-end items-end">
                        <div className="relative w-[280px] md:w-[350px] h-full overflow-hidden right-0 bottom-0 md:-mb-10 lg:mr-10">
                            {/* Using a placeholder phone mockup to represent the image in your screenshot */}
                            <img
                                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop"
                                alt="DhakaStay App interface"
                                className="w-full h-full object-cover object-top rounded-[40px] shadow-2xl rotate-[-15deg] translate-y-12 translate-x-8 md:translate-x-12 scale-[1.1]"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}