import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function SearchFilter() {
  const [activeTab, setActiveTab] = useState('Buy');
  const [priceRange, setPriceRange] = useState(5000000);
  const [bedrooms, setBedrooms] = useState('3');

  const tabs = ['Buy', 'Rent', 'Commercial', 'Invest'];
  const bedOptions = ['1', '2', '3', '4', '5+'];

  return (
    <section className="py-20 bg-offwhite relative -mt-32 z-30">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gold/10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">Find Your Dream Property</h2>
            <p className="text-text-secondary">Search our exclusive portfolio of luxury real estate</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-charcoal text-white shadow-md'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Location Search */}
            <div className="col-span-1 md:col-span-3 lg:col-span-1">
              <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">Location</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="City, Neighborhood, or ZIP"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="col-span-1">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-charcoal uppercase tracking-wider">Max Price</label>
                <span className="text-gold font-medium">${(priceRange / 1000000).toFixed(1)}M</span>
              </div>
              <div className="relative pt-4">
                <input
                  type="range"
                  min="100000"
                  max="20000000"
                  step="100000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$100k</span>
                  <span>$20M+</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">Bedrooms</label>
              <div className="flex gap-2 h-[56px]">
                {bedOptions.map((bed) => (
                  <button
                    key={bed}
                    onClick={() => setBedrooms(bed)}
                    className={`flex-1 rounded-xl font-medium transition-all duration-300 ${
                      bedrooms === bed
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-gray-50 text-text-secondary border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {bed}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
            <button className="flex items-center text-text-secondary hover:text-gold transition-colors text-sm font-medium">
              <SlidersHorizontal size={18} className="mr-2" />
              Advanced Filters
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-gold text-white rounded-xl font-medium hover:bg-light-gold transition-all duration-300 shadow-lg shadow-gold/20 text-lg btn-shimmer">
              Search Properties
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
