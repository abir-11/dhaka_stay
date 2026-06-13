"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customMarkerIcon = L.icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

export interface Listing {
    id: number;
    vendorId?: number;
    title: string;
    slug?: string;
    description?: string;
    propertyType?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    pricePerNight?: number;
    maxGuests?: number;
    status?: string;
    img?: string; 
    rating?: string | number;
}

export default function MapComponent({ listings }: { listings: Listing[] }) {
    const defaultCenter: [number, number] = [23.8103, 90.4125]; 

    return (
        <MapContainer 
            center={defaultCenter} 
            zoom={12} 
            className="w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {listings?.map((item) => {
                const latitude = item.latitude;
                const longitude = item.longitude;

                if (!latitude || !longitude || isNaN(Number(latitude)) || isNaN(Number(longitude))) {
                    return null; 
                }

                return (
                    <Marker 
                        key={item.id} 
                        position={[Number(latitude), Number(longitude)]}
                        icon={customMarkerIcon}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.openPopup();
                            },
                            mouseout: (e) => {
                                e.target.closePopup();
                            }
                        }}
                    >
                        <Popup closeButton={false} autoPan={false}>
                            <div className="font-sans w-[180px] p-0.5 pointer-events-none">
                                <div className="relative h-24 w-full overflow-hidden rounded-lg mb-2 bg-gray-100">
                                    <img 
                                        src={item.img || "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=150"} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <h4 className="font-bold text-xs text-gray-950 line-clamp-1 mb-0.5">{item.title}</h4>
                                <p className="text-[#ba0036] font-extrabold text-xs">
                                    {item.pricePerNight ? `৳${item.pricePerNight}` : "N/A"} <span className="text-gray-400 font-normal text-[10px]">/ night</span>
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}