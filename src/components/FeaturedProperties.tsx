import { motion } from "framer-motion";
import { MapPin, MessageCircle, ArrowRight } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "The Grand Meridian Estate",
    location: "Beverly Hills, CA",
    price: "$4,250,000",
    beds: 5,
    baths: 6,
    sqft: 8200,
    status: "FOR SALE",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    desc: "A masterpiece of modern architecture featuring panoramic city views, infinity pool, and smart home integration.",
  },
  {
    id: 2,
    name: "Azure Oceanfront Villa",
    location: "Malibu, CA",
    price: "$7,800,000",
    beds: 6,
    baths: 7,
    sqft: 10500,
    status: "FOR SALE",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    desc: "Direct beach access with floor-to-ceiling glass walls, private cinema, and a 10-car subterranean garage.",
  },
  {
    id: 3,
    name: "Palm Royale Mansion",
    location: "Miami, FL",
    price: "$3,500,000/mo",
    beds: 4,
    baths: 5,
    sqft: 8800,
    status: "FOR RENT",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    desc: "Ultra-luxury waterfront rental with private dock, resort-style amenities, and lush tropical landscaping.",
  },
  {
    id: 4,
    name: "The Westbrook Residence",
    location: "Manhattan, NY",
    price: "$12,500,000",
    beds: 7,
    baths: 8,
    sqft: 12000,
    status: "FOR SALE",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    desc: "Iconic penthouse spanning three floors with private elevator, rooftop terrace, and unobstructed skyline views.",
  },
  {
    id: 5,
    name: "Sunset Ridge Estate",
    location: "Aspen, CO",
    price: "$5,950,000",
    beds: 4,
    baths: 4,
    sqft: 7600,
    status: "FOR SALE",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    desc: "Ski-in/ski-out mountain retreat featuring timber construction, heated driveways, and a professional spa.",
  },
  {
    id: 6,
    name: "The Harbor View",
    location: "Newport Beach, CA",
    price: "$6,200,000",
    beds: 5,
    baths: 6,
    sqft: 9100,
    status: "FOR SALE",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    desc: "Contemporary coastal living with a private yacht slip, wine cellar, and expansive outdoor entertaining spaces.",
  },
];

export default function FeaturedProperties() {
  return (
    <section id="properties" className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-4"
          >
            Featured Properties
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group h-[500px] perspective-1000 cursor-pointer shimmer-card"
            >
              <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180 shadow-xl rounded-2xl">
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-white">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {property.status}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <h3 className="text-2xl font-serif mb-1">
                      {property.name}
                    </h3>
                    <p className="text-gold text-xl font-medium mb-2">
                      {property.price}
                    </p>
                    <div className="flex items-center text-sm text-white/80">
                      <MapPin size={14} className="mr-1" />
                      {property.location}
                    </div>
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-charcoal text-white p-8 flex flex-col justify-between border border-gold/20">
                  <div>
                    <h3 className="text-2xl font-serif text-gold mb-4">
                      {property.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/10 py-4">
                      <div className="text-center">
                        <span className="block text-2xl font-light">
                          {property.beds}
                        </span>
                        <span className="text-xs text-white/50 uppercase tracking-widest">
                          Beds
                        </span>
                      </div>
                      <div className="text-center border-l border-white/10">
                        <span className="block text-2xl font-light">
                          {property.baths}
                        </span>
                        <span className="text-xs text-white/50 uppercase tracking-widest">
                          Baths
                        </span>
                      </div>
                      <div className="text-center col-span-2 border-t border-white/10 pt-4">
                        <span className="block text-2xl font-light">
                          {property.sqft.toLocaleString()}
                        </span>
                        <span className="text-xs text-white/50 uppercase tracking-widest">
                          Sq Ft
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-4">
                      {property.desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded flex items-center justify-center space-x-2 btn-shimmer">
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </button>
                    <a
                      href={`https://wa.me/1234567890?text=I'm interested in ${property.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-whatsapp text-white hover:bg-green-600 transition-colors rounded flex items-center justify-center space-x-2 btn-shimmer"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp Agent</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
