import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, MessageCircle } from 'lucide-react';

// Fix Leaflet icon issue
try {
  if (L && L.Icon && L.Icon.Default && L.Icon.Default.prototype) {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }
} catch (e) {
  console.warn("Could not fix Leaflet icon", e);
}

// Custom Gold Icon
const goldIcon = new L.DivIcon({
  className: 'custom-gold-pin',
  html: `<div style="background-color: #D4AF37; width: 36px; height: 36px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.4);"></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const properties = [
  {
    id: 1,
    name: 'The Grand Meridian Estate',
    location: 'Beverly Hills, CA',
    price: '$4,250,000',
    coords: [34.0736, -118.4004] as [number, number],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Azure Oceanfront Villa',
    location: 'Malibu, CA',
    price: '$7,800,000',
    coords: [34.0259, -118.7798] as [number, number],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Palm Royale Mansion',
    location: 'Miami, FL',
    price: '$3,500,000/mo',
    coords: [25.7617, -80.1918] as [number, number],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'The Westbrook Residence',
    location: 'Manhattan, NY',
    price: '$12,500,000',
    coords: [40.7831, -73.9712] as [number, number],
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Sunset Ridge Estate',
    location: 'Aspen, CO',
    price: '$5,950,000',
    coords: [39.1911, -106.8175] as [number, number],
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'The Harbor View',
    location: 'Newport Beach, CA',
    price: '$6,200,000',
    coords: [33.6189, -117.9289] as [number, number],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 12, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function PropertyMap() {
  const [activeProperty, setActiveProperty] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]); // Center of USA
  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  const handlePropertyClick = (property: typeof properties[0]) => {
    setActiveProperty(property.id);
    setMapCenter(property.coords);
    const marker = markerRefs.current[property.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <section id="map" className="py-24 bg-gray-50 text-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4 text-charcoal"
          >
            Explore Properties on Map
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gold mx-auto"
          ></motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 bg-white rounded-2xl p-4 overflow-y-auto custom-scrollbar border border-gray-200 shadow-md">
            <h3 className="text-xl font-serif text-gold mb-6 px-2">Featured Locations</h3>
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handlePropertyClick(property)}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeProperty === property.id
                      ? 'bg-gold/10 border border-gold/50 shadow-sm'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-lg leading-tight mb-1 text-charcoal">{property.name}</h4>
                    <p className="text-gold font-medium text-sm mb-1">{property.price}</p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <MapPin size={12} className="mr-1" />
                      {property.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Container */}
          <div className="w-full lg:w-2/3 h-full rounded-2xl overflow-hidden border-2 border-gold shadow-lg relative z-0 bg-white">
            <MapContainer
              center={mapCenter}
              zoom={5}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={activeProperty ? mapCenter : null} />
              
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={property.coords}
                  icon={goldIcon}
                  ref={(ref) => {
                    markerRefs.current[property.id] = ref;
                  }}
                  eventHandlers={{
                    click: () => handlePropertyClick(property),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="w-48">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-32 object-cover rounded-t-lg mb-2"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-2">
                        <h4 className="font-serif text-charcoal font-bold leading-tight mb-1">{property.name}</h4>
                        <p className="text-gold font-medium text-sm mb-2">{property.price}</p>
                        <button className="w-full py-2 mt-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-colors flex items-center justify-center btn-shimmer">
                          <MessageCircle size={14} className="mr-2" /> WhatsApp Agent
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
