import Image from "next/image";
import Link from "next/link"; // Next.js Link ইমপোর্ট করা হয়েছে

const listings = [
  {
    id: 1, // ডায়নামিক লিংকের জন্য ID যুক্ত করা হয়েছে
    title: "Luxe Penthouse with View",
    loc: "Gulshan 2, Dhaka",
    price: "$145",
    rating: "4.95",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern Minimalist Studio",
    loc: "Banani, Dhaka",
    price: "$68",
    rating: "4.82",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cozy Garden Duplex",
    loc: "Baridhara DOHS",
    price: "$120",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Artist's Loft in Dhanmondi",
    loc: "Dhanmondi, Dhaka",
    price: "$55",
    rating: "4.75",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Business Suite Platinum",
    loc: "Uttara Sector 4",
    price: "$85",
    rating: "4.90",
    img: "https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Colonial Charm Villa",
    loc: "Eskaton, Dhaka",
    price: "$190",
    rating: "4.98",
    img: "https://images.unsplash.com/photo-1600585154340-be6199f7e009?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Skyline View Apartment",
    loc: "Bashundhara R/A",
    price: "$72",
    rating: "4.65",
    img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Quiet Retreat Near Lake",
    loc: "Gulshan 1, Dhaka",
    price: "$110",
    rating: "4.88",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  },
];

const mapPins = [
  { price: "$145", style: "top-1/4 left-1/3 animate-bounce" },
  { price: "$68", style: "top-1/2 left-1/2" },
  { price: "$120", style: "bottom-1/4 left-1/4" },
  { price: "$55", style: "top-1/3 right-1/4" },
  { price: "$85", style: "bottom-1/3 right-1/3" },
];

export default function FeaturedListings() {
  return (
    <section className="max-w-[1600px] mx-auto px-gutter py-xl flex flex-col lg:flex-row gap-lg">
      {/* Listings Grid */}
      <div className="w-full lg:w-3/5">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-primary font-bold tracking-widest text-xs uppercase mb-2">
              Featured Homes
            </p>
            <h2 className="text-headline-lg text-on-surface font-bold">Homes in Dhaka</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-outline rounded-full hover:bg-surface transition-colors">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {listings.map((item) => (
            <div key={item.id} className="group flex flex-col h-full">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 shadow-sm group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 text-white hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              
              {/* Content Area */}
              <div className="flex flex-col flex-grow justify-between">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-label-md text-on-surface font-bold">{item.title}</h3>
                    <p className="text-secondary text-sm">{item.loc}</p>
                    <p className="mt-1">
                      <span className="font-bold">{item.price}</span>{" "}
                      <span className="text-secondary">per night</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-xs"
                      style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}
                    >
                      star
                    </span>
                    <span className="text-label-sm">{item.rating}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  href={`/property/${item.id}`}
                  className="mt-3 block w-full text-center py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Map */}
      <div className="hidden lg:block w-2/5 h-[calc(100vh-100px)] sticky top-24 rounded-2xl overflow-hidden border border-outline-variant shadow-inner">
        <div className="relative w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-rpXi-nukvW4AsqwuSe9S3-kH9qqFtFZw1y71qJuZtLj3IofPYqsPlh5znh9sDj-cQlafhocVWlp9mpEMuQ1hx4YjM5ai4YqeDEsNNafLW9pLbE3kTp4PQ5sXcRpioC7gSaFgDD7C5XnOi3zj3VYIctIeDNt1gIDgWtyiiPuQasmJdmY6JHa6oejEBmNYAnkhkc1dsUR9U7BA_Ife8YG1oB2KeOVbyspndJNlHKCA9_Cj_ROeWrnvwAbPfb6m8ud9Ji4XTENoXNo"
            alt="Dhaka map"
            fill
            className="object-cover"
          />
          {mapPins.map((pin, i) => (
            <div
              key={i}
              className={`absolute bg-primary text-white font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white ${pin.style}`}
            >
              {pin.price}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}