import { motion } from 'framer-motion';
import { BedDouble, Bath, Square, ArrowRight, MessageCircle } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'The Grand Meridian Estate',
    price: '$4,250,000',
    location: 'Beverly Hills, CA',
    beds: 5,
    baths: 6.5,
    sqft: '7,200',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'FOR SALE',
  },
  {
    id: 2,
    title: 'Azure Oceanfront Villa',
    price: '$7,800,000',
    location: 'Malibu, CA',
    beds: 4,
    baths: 5,
    sqft: '5,800',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'JUST LISTED',
  },
  {
    id: 3,
    title: 'Palm Royale Mansion',
    price: '$3,500,000/mo',
    location: 'Miami, FL',
    beds: 6,
    baths: 8,
    sqft: '10,500',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'FOR RENT',
  },
  {
    id: 4,
    title: 'The Westbrook Residence',
    price: '$12,500,000',
    location: 'Manhattan, NY',
    beds: 3,
    baths: 3.5,
    sqft: '4,100',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'FOR SALE',
  },
  {
    id: 5,
    title: 'Sunset Ridge Estate',
    price: '$5,950,000',
    location: 'Aspen, CO',
    beds: 5,
    baths: 5.5,
    sqft: '6,400',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'PENDING',
  },
  {
    id: 6,
    title: 'The Harbor View',
    price: '$6,200,000',
    location: 'Newport Beach, CA',
    beds: 4,
    baths: 4.5,
    sqft: '5,100',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'FOR SALE',
  },
];

export default function FeaturedListings() {
  return (
    <section id="properties" className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
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
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gold"
            ></motion.div>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center text-charcoal hover:text-gold transition-colors font-medium mt-6 md:mt-0"
          >
            View All Properties <ArrowRight className="ml-2" size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group perspective-1000 h-[500px] shimmer-card"
            >
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 rounded-2xl shadow-xl">
                
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-white">
                  <div className="relative h-2/3">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-charcoal text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                      {listing.status}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <p className="text-2xl font-serif font-bold">{listing.price}</p>
                    </div>
                  </div>
                  <div className="p-6 h-1/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-1 truncate">{listing.title}</h3>
                      <p className="text-text-secondary text-sm">{listing.location}</p>
                    </div>
                    <div className="flex justify-between items-center text-charcoal text-sm font-medium pt-4 border-t border-gray-100">
                      <div className="flex items-center"><BedDouble size={16} className="mr-2 text-gold" /> {listing.beds} Beds</div>
                      <div className="flex items-center"><Bath size={16} className="mr-2 text-gold" /> {listing.baths} Baths</div>
                      <div className="flex items-center"><Square size={16} className="mr-2 text-gold" /> {listing.sqft} sqft</div>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-charcoal text-white p-8 flex flex-col justify-center items-center text-center border border-gold/20 shadow-2xl">
                  <h3 className="text-2xl font-serif font-bold text-gold mb-4">{listing.title}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Experience unparalleled luxury in this exquisite property located in the heart of {listing.location}. Featuring bespoke finishes and breathtaking views.
                  </p>
                  
                  <div className="space-y-4 w-full">
                    <button className="w-full py-3 bg-gold text-white rounded-xl font-medium hover:bg-light-gold transition-colors flex items-center justify-center shadow-lg btn-shimmer">
                      View Full Details <ArrowRight size={18} className="ml-2" />
                    </button>
                    
                    <a
                      href={`https://wa.me/1234567890?text=I'm interested in ${listing.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-whatsapp text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center shadow-lg btn-shimmer"
                    >
                      <MessageCircle size={18} className="mr-2" />
                      WhatsApp Agent
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="inline-flex items-center px-8 py-3 border-2 border-charcoal text-charcoal rounded-xl font-medium hover:bg-charcoal hover:text-white transition-colors btn-shimmer">
            View All Properties <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
