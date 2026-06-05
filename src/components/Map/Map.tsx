"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Star } from "lucide-react";

// লিস্টিং ডেটার জন্য টাইপ বা ইন্টারফেস ডিফাইন করা হলো
export interface Listing {
    id: number;
    title: string;
    loc: string;
    price: string;
    rating: string;
    img: string;
    lat: number;
    lng: number;
}

interface MapProps {
    listings: Listing[];
}

export default function Map({ listings }: MapProps) {
    // ঢাকার সেন্ট্রাল পজিশন [Latitude, Longitude]
    const dhakaCenter: [number, number] = [23.7949, 90.4106];

    // কাস্টম প্রাইস পিল (Price Pill) আইকন তৈরির ফাংশন
    const createCustomIcon = (price: string): L.DivIcon => {
        return L.divIcon({
            className: "bg-transparent border-none",
            html: `<div style="
        background-color: #ba0036; 
        color: white; 
        padding: 6px 14px; 
        border-radius: 999px; 
        font-weight: 700; 
        font-size: 13px; 
        border: 1.5px solid rgba(255,255,255,0.6); 
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); 
        display: inline-block; 
        white-space: nowrap;
        transition: transform 0.2s;
      " 
      onmouseover="this.style.backgroundColor='#ff385c'; this.style.transform='scale(1.05)';"
      onmouseout="this.style.backgroundColor='#ba0036'; this.style.transform='scale(1)';"
      >
        ${price}
      </div>`,
            iconSize: [50, 30],
            iconAnchor: [25, 15],
            popupAnchor: [0, -15]
        });
    };

    return (
        <MapContainer
            {...{
                center: dhakaCenter,
                zoom: 12,
                scrollWheelZoom: true,
                className: "w-full h-full z-0"
            } as any}
        >
            <TileLayer
                {...{
                    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
                } as any}
            />

            {listings.map((item) => {
                const markerProps: any = {
                    position: [item.lat, item.lng],
                    icon: createCustomIcon(item.price)
                };

                return (
                    <Marker key={item.id} {...markerProps}>
                        <Popup>
                            <div className="font-sans w-[200px] -m-3 p-3 bg-white rounded-xl overflow-hidden">
                                <img src={item.img} alt={item.title} className="w-full h-28 object-cover rounded-lg mb-2" />
                                <div className="flex justify-between items-start gap-2">
                                    <h4 className="font-bold text-[13px] text-gray-900 leading-tight m-0">{item.title}</h4>
                                    <div className="flex items-center gap-0.5 mt-0.5">
                                        <Star size={10} className="fill-gray-900 text-gray-900" />
                                        <span className="text-[11px] font-bold text-gray-900">{item.rating}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-500 m-0 mt-1">{item.loc}</p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}