import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";

export default function LeadCapture() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6 leading-tight">
              Get Your Free Property Consultation
            </h2>
            <p className="text-lg text-text-secondary mb-10">
              Whether you're looking to buy your dream home or sell your current
              property, our team of luxury specialists is here to guide you
              every step of the way.
            </p>

            <ul className="space-y-6">
              {[
                "Free market analysis report",
                "Personalized property shortlist",
                "Expert negotiation strategy",
                "No obligation, no pressure",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 text-charcoal font-medium text-lg"
                >
                  <div className="bg-gold/10 p-2 rounded-full">
                    <CheckCircle2 size={24} className="text-gold" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 z-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-serif text-charcoal mb-4">
                  Request Received!
                </h3>
                <p className="text-lg text-gray-600">
                  We'll contact you within 2 hours! ✅
                </p>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Property Type
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none">
                    <option>Buying a Home</option>
                    <option>Selling a Home</option>
                    <option>Investment Property</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Budget Range
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none">
                    <option>Under $1M</option>
                    <option>$1M - $3M</option>
                    <option>$3M - $5M</option>
                    <option>$5M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                  placeholder="Tell us about your dream property..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-white py-4 rounded-xl font-medium text-lg hover:bg-light-gold transition-colors shadow-lg shadow-gold/20 btn-shimmer"
              >
                Get Free Consultation
              </button>

              <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1 mt-4">
                <Lock size={12} /> Your info is 100% private. No spam.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
