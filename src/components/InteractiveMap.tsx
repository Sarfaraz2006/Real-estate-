import { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, ArrowRight } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "The Grand Meridian Estate",
    location: "Beverly Hills, CA",
    price: "$4,250,000",
    coords: [34.0736, -118.4004],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  },
  {
    id: 2,
    name: "Azure Oceanfront Villa",
    location: "Malibu, CA",
    price: "$7,800,000",
    coords: [34.0259, -118.7798],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
  {
    id: 3,
    name: "Palm Royale Mansion",
    location: "Miami, FL",
    price: "$3,500,000/mo",
    coords: [25.7617, -80.1918],
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
  },
  {
    id: 4,
    name: "The Westbrook Residence",
    location: "Manhattan, NY",
    price: "$12,500,000",
    coords: [40.7831, -73.9712],
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
  },
  {
    id: 5,
    name: "Sunset Ridge Estate",
    location: "Aspen, CO",
    price: "$5,950,000",
    coords: [39.1911, -106.8175],
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80",
  },
  {
    id: 6,
    name: "The Harbor View",
    location: "Newport Beach, CA",
    price: "$6,200,000",
    coords: [33.6189, -117.9298],
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

// Custom Gold Pin Icon
const goldIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0I4OTYwQyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMSAxMGMwIDcgLTkgMTMgLTkgMTNzLTkgLTYgLTkgLTEzYTkgOSAwIDAgMSAxOCAwem0tOSAzYTMgMyAwIDEgMCAwIC02IDMgMyAwIDAgMCAwIDZ6Ii8+PC9zdmc+",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  map.flyTo(center, 12, { duration: 1.5 });
  return null;
}

export default function InteractiveMap() {
  const [activeProperty, setActiveProperty] = useState(properties[0]);

  return (
    <section id="map" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Explore Properties on Map
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 bg-white/5 rounded-2xl p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {properties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => setActiveProperty(prop)}
                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeProperty.id === prop.id
                    ? "bg-gold/20 border border-gold/50"
                    : "hover:bg-white/10 border border-transparent"
                }`}
              >
                <img
                  src={prop.image}
                  alt={prop.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-serif text-lg leading-tight mb-1">
                    {prop.name}
                  </h4>
                  <p className="text-gold font-medium text-sm mb-1">
                    {prop.price}
                  </p>
                  <p className="text-white/60 text-xs flex items-center">
                    <MapPin size={12} className="mr-1" /> {prop.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Container */}
          <div className="w-full lg:w-2/3 h-full rounded-2xl overflow-hidden border border-white/10 relative z-0">
            <MapContainer
              center={activeProperty.coords as [number, number]}
              zoom={4}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <MapController
                center={activeProperty.coords as [number, number]}
              />

              {properties.map((prop) => (
                <Marker
                  key={prop.id}
                  position={prop.coords as [number, number]}
                  icon={goldIcon}
                  eventHandlers={{
                    click: () => setActiveProperty(prop),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="w-48">
                      <img
                        src={prop.image}
                        alt={prop.name}
                        className="w-full h-24 object-cover rounded-t-lg mb-2"
                      />
                      <div className="p-2">
                        <h4 className="font-serif text-sm font-bold text-charcoal leading-tight mb-1">
                          {prop.name}
                        </h4>
                        <p className="text-gold font-medium text-xs mb-2">
                          {prop.price}
                        </p>
                        <button className="w-full bg-charcoal text-white text-xs py-1.5 rounded flex items-center justify-center gap-1 hover:bg-gold transition-colors btn-shimmer">
                          View Details <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
