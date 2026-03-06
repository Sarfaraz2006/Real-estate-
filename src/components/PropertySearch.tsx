import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Home, Maximize } from "lucide-react";

export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [priceRange, setPriceRange] = useState(5000000);
  const [beds, setBeds] = useState("3");

  return (
    <section className="py-24 bg-white relative z-20 -mt-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-2">
              Find Your Dream Property
            </h2>
            <p className="text-text-secondary">
              Search the most exclusive luxury real estate listings.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              {["Buy", "Rent", "Commercial", "Invest"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white text-charcoal shadow-md"
                      : "text-gray-500 hover:text-charcoal"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={14} /> Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="City, Neighborhood, or Zip"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> Max Price
                </span>
                <span className="text-gold font-medium">
                  ${(priceRange / 1000000).toFixed(1)}M
                </span>
              </label>
              <input
                type="range"
                min="100000"
                max="20000000"
                step="100000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Home size={14} /> Bedrooms
              </label>
              <div className="flex justify-between gap-2">
                {["1", "2", "3", "4", "5+"].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBeds(num)}
                    className={`flex-1 py-2 rounded-lg text-sm transition-all border ${
                      beds === num
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gold"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Size */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Maximize size={14} /> Property Size
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none">
                <option>Any Size</option>
                <option>1,000 - 2,500 sq ft</option>
                <option>2,500 - 5,000 sq ft</option>
                <option>5,000 - 10,000 sq ft</option>
                <option>10,000+ sq ft</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full bg-gold text-white py-4 rounded-xl font-medium text-lg hover:bg-light-gold transition-colors shadow-lg shadow-gold/20 flex items-center justify-center gap-2 btn-shimmer">
            <Search size={20} />
            Search Properties
          </button>
        </motion.div>
      </div>
    </section>
  );
}
