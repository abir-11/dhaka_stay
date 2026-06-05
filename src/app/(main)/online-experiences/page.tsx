import React from 'react';

export default function OnlineExperiencesPage() {
  return (
    <main className="w-full bg-white font-sans text-gray-900">
      
      {/* Hero Section */}
      <section className="relative h-[650px] min-h-[450px] flex items-center overflow-hidden">
        <img 
          alt="A wide panoramic cinematic shot of a sunset over the historic architecture of Dhaka, Bangladesh." 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXND43f6d8HE5hh9sJ2VL5kvtqXQJHedWD2vNoouIEBAFtWSgNkoEYKiu2Sp_9DAvlezM4p1wBC-IOxDxqX536MOgsOIasXH0gpDqojkfoRrLnm0TBmjSTY06a8EO_IaJgt5WIVH-0cEEmnc2a_QlcqyuP4IcfhRi1yu5eF-4kU-3M19yaEw-DkJGcgjRTgj5AuyMfSwlMTNrhjd_OqyxCQoSyGGMWeW6fUdpDRG80kZuyrbnYt5ToIoTzOh4s4QFP9T_aWguxanY"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="relative max-w-11/12 mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
              Explore Dhaka from home
            </h1>
            <p className="text-lg md:text-xl text-gray-100 opacity-90 mb-10 leading-relaxed">
              Join unique, interactive activities led by local experts without leaving your living room. From culinary secrets to hidden histories.
            </p>
            <button className="bg-[#e51d53] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#d4184c] transition-all shadow-lg active:scale-95">
              Browse Online Experiences
            </button>
          </div>
        </div>
      </section>

      {/* Categories / Filters */}
      <section className="py-10 max-w-11/12 mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 rounded-full text-sm font-semibold bg-white text-gray-900 transition-all hover:bg-gray-50">
            <span className="material-symbols-outlined text-[20px]">all_inclusive</span> All Categories
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all">
            <span className="material-symbols-outlined text-[20px]">videocam</span> Live Virtual Tours
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all">
            <span className="material-symbols-outlined text-[20px]">restaurant</span> Cooking Workshops
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full text-sm font-semibold text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all">
            <span className="material-symbols-outlined text-[20px]">auto_stories</span> Cultural Storytelling
          </button>
        </div>
      </section>

      {/* Bento Grid: Featured Experiences */}
      <section className="py-10 max-w-11/12 mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Large Featured Card */}
          <div className="md:col-span-8 group cursor-pointer">
            <div className="relative aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
              <img 
                alt="A professional close-up shot of traditional Bengali street food being prepared in a vibrant, sunlit kitchen." 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC785y0eiSV3GVq3JxXCvSHder_wNB7u1HGPS1Scd3TnDSo1l2pjinFnfM59i-vwobwn0XoxuA5bTT2dy4qWInQnc7aiTJdYfRpx_Qbb4azGzSnk1jh7mu1Bw-zYtwsc6rSt_P8oss4udDOdCwaeZpNz3CwXYoEkaK1xklBmbnmxG9dTOiu11Y2u-jCfFO7Q5g3ykLcie57jGi6jTMhKsh325AMr5boCZKH8iMjDMK1c93eg-7ynXtdrLvbIF518gH6fj8ST0lAuZc"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-5 left-5 bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md tracking-wide">
                FEATURED
              </div>
              <div className="absolute bottom-5 left-5">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                  Cooking Workshop
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Master the Art of Bengali Biryani</h3>
                <p className="text-base text-gray-500 mt-1">Host: Chef Anika • 90 mins • Live from Old Dhaka</p>
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">From $25 / person</p>
                <div className="flex items-center sm:justify-end gap-1 text-[#e51d53] mt-1">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-xs font-bold text-gray-900">4.95 (120 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="md:col-span-4 flex flex-col gap-8 md:gap-6">
            
            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-lg transition-all">
                <img 
                  alt="A high-angle shot of a person reading a vintage book in a cozy library." 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtOrvDDCHohMtBw7LAVF8ei5mV99wG_R_iveZRbEQ2kkK9BotqX2OfM0jN9N3JHk6qrpOJ4W1FOKfHircmQ85FwbtrVXwOnRjeuaYijdItET7d7QvjXhlPhGSDwdsXnuYwe-iyyD2Mfoep1RrOGccIcLlt1kkUVhL641GvUaBoFHO2ABpS2K-4EIEMiIWVQ7yW218JSt11d3ojQgt1VCA1Ig96IoYQZBRTEZY8SQeTmDhXD7VB59Tkf28LrMrwLq3eAlyxMtg5obc"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                    Storytelling
                  </span>
                </div>
              </div>
              <h4 className="text-base font-bold text-gray-900">Folklore and Myths of Bengal</h4>
              <p className="text-sm text-gray-500 mt-0.5">60 mins • $15</p>
            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-lg transition-all">
                <img 
                  alt="A wide-angle street photography shot of the bustling Lalbagh Fort in Dhaka at sunrise." 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKfzDqYPxA9MUg6Xu62LJocBlL1WMYKgCktscMP8zzNtB9nqRnjaSQPgJ7UpubSBmK6WOJosh0vHCSxNXV_QDNNY9k3SUXgRRAaUqhxQ7rvQ3Cw-MP73H09n2ECKNPQku7LWZrfYaXl7xUUKcnellKJm5ABWPVvElRZP-Bkxkzfp32ogjnHwd9WwZKjag0rVKCpmiMYI1ng2txwcNUF1icG7HFgxEgjfaw5zELcdVSZexe-qP5dMXYp6kAZissBy3W01c3EXlH9DU"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                    Virtual Tour
                  </span>
                </div>
              </div>
              <h4 className="text-base font-bold text-gray-900">Mughal Heritage: A Live Walk</h4>
              <p className="text-sm text-gray-500 mt-0.5">75 mins • $20</p>
            </div>

          </div>
        </div>
      </section>

      {/* Asymmetric Section: How it Works */}
      <section className="py-20 md:py-32 bg-gray-50 mt-12 overflow-hidden relative border-y border-gray-100">
        <div className="max-w-11/12 mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="relative">
            {/* Decorative Glow */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#e51d53]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                How Online Experiences work
              </h2>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#e51d53]">
                  <span className="material-symbols-outlined">laptop_mac</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Join via Zoom</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Connect with hosts and other guests through high-quality video sessions. Link provided upon booking.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#e51d53]">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive & Social</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    It's not just a video—ask questions, share your creations, and chat with fellow travelers.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#e51d53]">
                  <span className="material-symbols-outlined">confirmation_number</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Booking</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Choose a time that works for you. Most sessions last between 60 to 90 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 pt-12">
              <img 
                alt="A split screen showcasing a friendly host waving at a laptop camera and a small group of diverse participants." 
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLzUkxVOOK05YfxV-SbjBrVxV_e_r2OQyvYu76bcHiVOHxCSDWXxoaoIrqeg18JJnSHsvyxr0YDzNRi039dW6ISky6ngh819rW-zwT25TKv_LiHEsFfd5eL_qQv7oqI3g8AxbSEQHPXEL4TmcwdQdFut1ErLfYjdr5xC7FlZqztGVsVztWjIeI2rOkEKBr7-fxJXrYjsE6E8z07Xcpf9P7wL-2BIDQMyTk2g1PRpwlvkwLJIaJwYRqXA7D0QxIV-i6MJy1j4VYi9M"
              />
              <img 
                alt="A top-down shot of a clean desk with a modern laptop showing a cooking class interface." 
                className="rounded-2xl shadow-lg w-full object-cover aspect-square" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCel5S2yiqMhM6nv5ne-O_taI9xkn72P9k_2zCYy05uXtOYNj9kctbhIDQHKUDw4juOFNTSiocKQJ1jfw1QHYRXvK2-VLduUz7CbDZo8QDoWtFmrBnrqHeYrB4u30v60HPAp_EhsUP84NDx9boj3i2IkkNsPV-PzaBvLQ_6JtjZvF0vSsoWQc13Bm92o58d0awuM0q4WSqFMqsM8T7kD6JWX4S7ZKDS7jJVGf7XJKPsoe1Ri9OlV1gYvwFFy5ATXRW4V4F5KFSB9_s"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <img 
                alt="A portrait of a smiling local host wearing traditional yet modern attire." 
                className="rounded-2xl shadow-lg w-full object-cover aspect-square" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCVF67qy8lW6lnCtsSU73jctMXgPHAtLTYbUdtT0rgshxinXH8H9X5FtQdKk0yuCJxC8mVKTMTSNgw1e1rophFWwvAZR7TngeVi-SEBiQlO5iAns9iLcLLPDyq3TFMabh2vIrAqu1aOP8zEVVZWNXHc-AcgVTa9vUWWD3ssGRQURWSfhUHfXqq3538LAcSc9Z_XrWhi2zYkTKYmkR4wYG299sNIsSezQOrV4LJC05clJ4jOahgH1wtS50DF_xEhTskUnUwDjeuxa8"
              />
              <img 
                alt="A detail shot of a hand pouring tea from a traditional pot into a modern ceramic cup." 
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/5]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9FuPzksVfYYc5e3UkmKmsFlTrJjinJtOdIlw33y-W3IcsIqsacuWY7Q15nQtkacbqlYS8GPoc4kYWaNwcC7ZMBqRZ-J8bVA02gMPG0g_vJIhIvFSpbxyFhC8U7CQ-zGnKl0PWroFo511RqErXU40ZAVidtAfSYb1V9ZnSZ9DDHtMv35azht2of7ZgwWZD9WAP7Xm5oTw1mzInsk2-brFYx62uHJx7lgWOU1nCnElyMgYMdbp13Kdtr_FiT4IVmMOWHNdwbG6Tqg"
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* Secondary Listing Section */}
      <section className="py-20 max-w-11/12 mx-auto px-6 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Upcoming Sessions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Session 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
              <img 
                alt="A close up of artisanal dessert being crafted by hand." 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrXNYKTl7HqHfUZmYdeKAQLxN73PlF9t3H6jnhDuqI-rNAfUu54FRLd-y0x_-DsD5x7SAZJKFK65b6mRTawrAg8u-56n0hwi5gVyqmtHbD-sGI6cD8-szPg8NSKEc5kchxQzlyFlI-n0O0KOkdGnPeyx6eyBJQUXGEIHePLwXrTtynv5gWX2Cgefj5V98PqewG4NLiB1K90Es9-H7qRfUYMCbBakJmfwNcMvbvLGPCZv_-iaZ1_thA8GJ24awA_56-S7d2EYFEG_M"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </button>
            </div>
            <p className="text-base font-semibold text-gray-900 truncate">Sweet Traditions: Bengali Desserts</p>
            <p className="text-sm text-gray-500 mt-1">Starts in 3 hours • $12</p>
          </div>

          {/* Session 2 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
              <img 
                alt="A calm and minimalist yoga studio scene where a session is being broadcasted." 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASOFCjJxacK9hicyo2EWrsK1uJSil-eLqEl9UTrwBJ2MCdKF3XoA26UxSrF7xaq6tMerBLNscBT5unOG4K0l370lnjwJokW3L0qwoFZVXB3KekXSaaOZmVBLUJXjfr-pyIcbL7_5ylvuaLPDXQ6FMgu6IcB8s2oOj8Ok3WE6d89qkCYoD6Kaw52eTeHt_3KvgXtdK37stNaRV20llZj3rZeW4RrClhHYOsguNs0VQF4TqWP8cLDqPLnGJb3C8rjH0bEIAwa-Ph-ec"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </button>
            </div>
            <p className="text-base font-semibold text-gray-900 truncate">Sunset Yoga & Breathwork</p>
            <p className="text-sm text-gray-500 mt-1">Today • $10</p>
          </div>

          {/* Session 3 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
              <img 
                alt="A vibrant shot of a painter's palette filled with lush, oil paints." 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFi1VQQln1DQMJP92noX3lW1pgMdyb_s6_s7OlADhyyWDRu977HMbcLAuY8UKoyB0xdoMMXi4cK43z90TKY6F2rm7zX1W81xb621TbWHWWJZAwvd7-Ps-bYB6wF2uixwQtKupVwYoIemj9GSK7kg2dJwGPECwClqPm07l9NNRg6WdiK4uJy616ClNhE1L8RmZaT9GOTV7WN-cRVqHh4gxtMH8PjkAzMELPr5mspo0UkLwkaCREE7j9rz_42CVfpgI2NLS_ea0jvg8"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </button>
            </div>
            <p className="text-base font-semibold text-gray-900 truncate">Painting Rickshaw Art</p>
            <p className="text-sm text-gray-500 mt-1">Tomorrow • $18</p>
          </div>

          {/* Session 4 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
              <img 
                alt="A high-tech camera rig pointed at a historic monument in Dhaka." 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy7fNc-X_smIyxVb8Ybwn_5L0H8Miowt1G2a6QTgA44pUo9fAuC8VPxOi-F7WXprmKhp_PfnwNkldxTasK0QaL3DcGhXBgT0unnnaNVGV9Rfam6mgLCfSqmUy4X9bKlFk1ClktKgEAxMsQrW8mij4Yl_-Wor9GTn7RLqBFI4DtF0FKA0tpi0kXerAZtF3KF9Cs5cedYyeCsY8a-7pII1zcBCmElLtfI_NY7q_J9Srwe7RCBbcySVRS09JV5Tg3V42jlFTY5tQN_m8"
              />
              <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">favorite</span>
              </button>
            </div>
            <p className="text-base font-semibold text-gray-900 truncate">Dhaka Night Walk: Virtual Edition</p>
            <p className="text-sm text-gray-500 mt-1">Saturday • $15</p>
          </div>

        </div>
      </section>

    </main>
  );
}