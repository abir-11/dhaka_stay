import React from 'react';

export default function ExperiencesPage() {
  return (
    <main className="w-full bg-white font-sans">
      
      {/* Hero Section with Search */}
      <section className="relative w-full h-[650px] flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden">
        <img 
          alt="Dhaka Old Cityscape" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4i-DoVdTYZe-tbSYJwFNuH-yhuhc7wJ6w1xDk2aR-6a0nxzZaraIkBTwY_ZdYWyAE7PhFvNOd0QcPloilIcqfXAJ5x3R3cTEDgYx1cx8aSTq8Po99VmN12oKnQjI8qyl7GhkfNOSToDEbtQ8oBGdqOyX0rhUjhrAa2wt5bqnRCYN88YULa1Bn_OtW6JEMiP2vAdiq3k-MbSNKmrG5A_UiPdKUy9zthzLa_OlaoOMLlixvw58U2F4dOlyfCnV2l2Ts8VYPA8qL5C4"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 text-center max-w-4xl w-full mt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 drop-shadow-lg leading-tight">
            Unforgettable things to do in Dhaka
          </h1>
          
          {/* Search Bar */}
          <div className="bg-white rounded-[32px] md:rounded-full shadow-xl flex flex-col md:flex-row items-center p-2 border border-gray-200 w-full mx-auto">
            
            <div className="flex-1 px-6 py-3 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-100 transition-colors rounded-t-[24px] md:rounded-l-full md:rounded-tr-none cursor-pointer text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">Location</label>
              <input 
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 outline-none" 
                placeholder="Where are you going?" 
                type="text"
              />
            </div>
            
            <div className="flex-1 px-6 py-3 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">Date</label>
              <input 
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 outline-none" 
                placeholder="Add dates" 
                type="text"
              />
            </div>
            
            <div className="flex-1 px-6 py-3 w-full md:w-auto hover:bg-gray-100 transition-colors md:rounded-none rounded-b-[24px] cursor-pointer text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">Guests</label>
              <input 
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 outline-none" 
                placeholder="Add guests" 
                type="text"
              />
            </div>
            
            <button className="bg-[#e51d53] text-white p-4 rounded-full m-2 flex items-center justify-center hover:bg-[#d4184c] transition-all active:scale-95 shadow-md md:w-auto w-[calc(100%-16px)]">
              <span className="material-symbols-outlined font-bold text-[20px]">search</span>
              <span className="md:hidden ml-2 font-bold">Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories / Filters */}
      <section className="max-w-11/12 mx-auto px-6 md:px-8 py-8">
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { icon: 'history_edu', label: 'Heritage Walks', active: true },
            { icon: 'restaurant', label: 'Food & Drink', active: false },
            { icon: 'palette', label: 'Art & Culture', active: false },
            { icon: 'kayaking', label: 'Adventure', active: false },
            { icon: 'temple_hindu', label: 'History', active: false },
            { icon: 'local_mall', label: 'Local Markets', active: false },
          ].map((cat, idx) => (
            <button 
              key={idx}
              className={`flex flex-col items-center gap-2 px-2 py-2 min-w-fit transition-all border-b-2 ${
                cat.active 
                  ? 'border-gray-900 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              <span className="text-xs font-semibold whitespace-nowrap">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Curated Selection Section (Bento Grid) */}
      <section className="max-w-11/12 mx-auto px-6 md:px-8 py-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Editor's Picks</h2>
            <p className="text-gray-500 text-base">Hand-picked activities for a true Dhaka experience.</p>
          </div>
          <button className="hidden md:flex items-center gap-1 text-gray-900 font-semibold text-sm underline underline-offset-4 hover:text-gray-600 transition-colors">
            Show all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">
          
          {/* Large Feature Card */}
          <div className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-[400px] md:h-full">
            <img 
              alt="Old Dhaka Rickshaw Tour" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvi-w4t06L9bjG97mrHfkhumbg3gxmBpZylq5mhLT_FqGm6k7lPsm-2XBjqMk4hOropyJM3dWekj909vplWCxMXIw_o16qmfcWtPYfHhcncDyhgBWzvJaihKdu_LAb5tE8G6m2blWJtZk65j_MysJve2ReqHTZjxs23yKd9KHDv6hWWYLeW-jo4aTi0056g_nfUWbj11wbEGmEahwdQGhFhYWpKQGqIcymdFzIWycZE5i1Bkf5ZkbLXE1fE8pNOaYo2IZh7xuDLpY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            
            <div className="absolute top-5 right-5">
              <button className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-white transition-colors">
                <span className="material-symbols-outlined text-[#e51d53] text-[20px] flex items-center">favorite</span>
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <div className="flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-semibold text-sm">4.95 (128)</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Old Dhaka Rickshaw Chronicles</h3>
              <p className="text-sm text-gray-200 mb-6">3 hours · Local Guide · Heritage</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-lg font-bold">From $45 / person</span>
                <button className="bg-white text-black px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Medium Feature Card */}
          <div className="md:col-span-2 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-auto">
            <img 
              alt="Cooking Class" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDttiZaWlf5kstn5eAqipQMKo0o3xtP_ITzfi_d3u00IOZqtt1kSupevhYxoVjFo0BiPqFbHX-0VlfVo5tzo6YHcX3ZepG5jqY7H8umy_9kIZZUnSQioV2YxF1m6jgrJrxFKN5VfpGmFmnclbdjXsZBhhML8dQStrhQGC1fDDMKf9U75qQLaJxJuT3InLUlOFO215gPoyutGYc1cf6J7tZ8sDzz470woSn9OBnJqdLj6lkpDbPOyWtz1Ffp7dp0nGAFiWf_n-2KDMs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-1">Bengali Home-Style Cooking</h3>
              <p className="text-sm font-medium text-gray-200">$55 · Food & Drink</p>
            </div>
          </div>

          {/* Small Feature Card 1 */}
          <div className="md:col-span-1 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-auto">
            <img 
              alt="Sonargaon Heritage" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4OJEKzTsKijF4njy_j60x_nRCwR4wYNm62GF5FNJmXBjEji5owYoRvUS9KzKmLh0BDnMle4raIRsETFDQOrnCMd1_Hf3xiY_YMhP9t_1qfbb0Ni3VJ11C5PX41m4CXBBiRTHcoBRjFjaTkacEuF9m-vfgi66A7I4ir1koZzkZbc-WpJmBLxmhq5LttfwWWf_ZXsFvP8Ocqa4PHlPe1z6ylPxUAlv1zMxIKSEVACAtLIELBDTHtSES6YSbKYbG_xhZ3Rj-74CO9j8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-lg font-bold mb-1">Sonargaon Day Trip</h3>
              <p className="text-sm font-medium text-gray-200">$75 · History</p>
            </div>
          </div>

          {/* Small Feature Card 2 */}
          <div className="md:col-span-1 group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-auto">
            <img 
              alt="Traditional Crafting" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIM5_cN0_LCD9pT_oLSdmwVwGk9kkUOA0SJn-OpHWAeJBF_zFTGHge5lHhfcTu6Ogt1Pwd9iRnUZ4D3mvkl2ji6bjyp3oPe2G6RhxqNalp0fCL_aDHqaslusg8u_Ij6NdRmKz2Fwsq1C5Ptc7_HxSK1The81Qdr9ps3zzxXFpYhWbGx9rnDzmJNn24GnXqdjHiuc8wMmqQfO-bxCBdltodiK-Gy4dxpBBA1wrtW8S-YAHq1tVeg4GuK0eFy9r5naTQRlhvPzzHAhw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-lg font-bold mb-1">Jamdani Weaving</h3>
              <p className="text-sm font-medium text-gray-200">$40 · Art & Culture</p>
            </div>
          </div>

        </div>
      </section>

      {/* Listing Section: Local Tours */}
      <section className="max-w-11/12 mx-auto px-6 md:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Discover Dhaka</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Listing Card 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
              <img 
                alt="River Cruise" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEeUFZNx522i__viEbuNBWBnJZ9BLwIo_qBQnbgrB_vvGayAvh38pUjWVCaO-LhvRKDmUYrVluEQTgzTsmawq9GAFa1AyE_W4iSTbheIdArwSOK1o8ELJ04jb7NhIAtz5v0HtLae-vGUijloEkTfst8Fn6tqTker0M3LFgkZJ9N_QhmFM3lupakF0D6cwbiS-vPS2o96uMGTesTxCkucoIe7nWKV12CE0WX7gAR83e2Zvl-GzsVodebgrJl_h74Kl0Au3uh_QDn5w"
              />
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-white drop-shadow-md font-light text-[28px] hover:scale-110 transition-transform">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-900 truncate pr-2">Buriganga Sunset Cruise</h3>
              <div className="flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-sm text-gray-900">4.8</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">Boat Experience · 2 Hours</p>
            <p className="text-gray-500 text-sm">Dec 12 - 15</p>
            <p className="font-semibold text-gray-900 mt-2">$32 <span className="font-normal text-gray-500">per person</span></p>
          </div>

          {/* Listing Card 2 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
              <img 
                alt="Street Food Tour" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI2oz8M27kAXsW6bS-MtCkCRmAt0xxBevkBu1n4fzpRuZ7vh7KmJRaU-eEmopaRI-ywOn-jeaU0eQpwk8yFu1qFWJx62cekEAQ1n0YqKLeOBl_ryTTmyxG0uY3vMDfdWZGxHQNazNmCnHGf3P5kK7Zx4JPIZOItpqFIBHFj9rG-NflCJTQRlOAQHeNALI-ylyl5sglx9pSrQT8JUs4ZtLIu38ztbe-DeTDJ3WFZQhrsP88btPBYZTgBIyfj8OuqxI12kCyWYHz6Ns"
              />
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-white drop-shadow-md font-light text-[28px] hover:scale-110 transition-transform">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-900 truncate pr-2">Street Food Night Market Tour</h3>
              <div className="flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-sm text-gray-900">4.9</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">Food Tasting · 3 Hours</p>
            <p className="text-gray-500 text-sm">Flexible dates</p>
            <p className="font-semibold text-gray-900 mt-2">$25 <span className="font-normal text-gray-500">per person</span></p>
          </div>

          {/* Listing Card 3 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
              <img 
                alt="Lalbagh Fort" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGULqLy8CJZN0e657nqBPyn1Nt18L7FeNr_poj97poEr9iN8sjS-uexfpmF1-w3ThJBNaSPYiLC-gb7ul58rsAuhyOQfAV6RyGJVHy4m08i1nF-yJvyyVg3YsgXzPFiooTZRKlRRV-wl809mokbm8H5yRNuzvUcOrIWCX44EMf1_R9QwNJcLGpSuRH1UgY1U1xPgPPMZzLvQswwENKd2ZzE3pez2vdF1N8c7ErLfHcIu4-Fm2xHFumGLCsXXf36TkYEOTz01C9RDw"
              />
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-white drop-shadow-md font-light text-[28px] hover:scale-110 transition-transform">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-900 truncate pr-2">Mughal Architecture Walk</h3>
              <div className="flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-sm text-gray-900">5.0</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">History · 4 Hours</p>
            <p className="text-gray-500 text-sm">Dec 15 - 20</p>
            <p className="font-semibold text-gray-900 mt-2">$38 <span className="font-normal text-gray-500">per person</span></p>
          </div>

          {/* Listing Card 4 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
              <img 
                alt="Rickshaw Art Workshop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXpItKyVr9h_iUu9J1eHt8YLPZ4cAdxvlZq1kXEB22CLTKmQS5VPcIeQgj4WQP-jmOKl7YDIEcNVkp_3d96O3b53cBMUlyOo2JIytMCy3jT6Wn65Lt40YPRYKftI9hShS0Sk8pCmjxmnT9uJ1w-HQOcKM_DmTe0px1K1-uktuuWCamnHstdf1FOfhqVQyffVwcVkjLfrHHRDT48COsn97UgFG3oOGupfu8a6Yvd0gHJhkeK2as_CYaTlv1oUL2Ht6wJLSWsdBFMZY"
              />
              <div className="absolute top-3 right-3">
                <span className="material-symbols-outlined text-white drop-shadow-md font-light text-[28px] hover:scale-110 transition-transform">favorite</span>
              </div>
            </div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-900 truncate pr-2">Rickshaw Art Workshop</h3>
              <div className="flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-sm text-gray-900">4.85</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">Art & Design · 3 Hours</p>
            <p className="text-gray-500 text-sm">Weekends</p>
            <p className="font-semibold text-gray-900 mt-2">$42 <span className="font-normal text-gray-500">per person</span></p>
          </div>

        </div>
      </section>

      {/* Host Section */}
      <section className="max-w-11/12 mx-auto px-6 md:px-8 py-16">
        <div className="bg-gray-50 rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center border border-gray-100 shadow-sm">
          <div className="md:w-1/2 p-8 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Host an experience</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Share your passion for Dhaka with travelers and earn money while doing what you love. From culinary walks to hidden architecture, your expertise is valuable.
            </p>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-md active:scale-95">
              Learn more
            </button>
          </div>
          <div className="md:w-1/2 h-80 md:h-[450px] w-full">
            <img 
              alt="Host laughing" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOR-KpKeJjOjG4u0L--sibUm51txJYHyZW2Zve44hCrk39abBdTPoAQyD28bJ8LkmL25ef0mTeRdDqZ_qvhu2vnVc0FNBy0w29NdW_3x1CPnWHaODpzAtKCC9wTjFZEqvzHItkwKTAJSG6s7pZ3V_IBOcDTcLbqUaO-oGvzxF-eCeWhhIsIyVbS8iT4CC5bfZvaEZcBgvIRH7_L7DLv3uHJ9IsZpPgXZxt_-iwuIzsNbUQ1e3gPThlajhugyWmWi04SVDGLRKkGU"
            />
          </div>
        </div>
      </section>

      {/* Utility to hide scrollbar (Add to globals.css if preferred) */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

    </main>
  );
}