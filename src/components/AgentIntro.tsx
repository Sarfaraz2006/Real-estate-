import { motion } from "framer-motion";
import { Play, Linkedin, Instagram, Facebook } from "lucide-react";

export default function AgentIntro() {
  return (
    <section id="about" className="py-0 bg-charcoal text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-semibold text-gold uppercase tracking-widest mb-4">
              Meet Your Agent
            </h2>
            <h3 className="text-5xl lg:text-7xl font-serif mb-2">
              James Mitchell
            </h3>
            <p className="text-xl text-white/80 font-light mb-8 italic">
              Luxury Real Estate Specialist
            </p>

            <p className="text-white/70 leading-relaxed mb-10 max-w-lg text-lg">
              With over a decade of experience in the ultra-luxury market, James
              has built a reputation for discretion, unparalleled market
              knowledge, and record-breaking sales. He doesn't just sell homes;
              he curates lifestyles.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 mb-12">
              <span className="px-4 py-2 border border-white/20 rounded-full text-xs font-medium uppercase tracking-wider bg-white/5">
                Certified Luxury Specialist
              </span>
              <span className="px-4 py-2 border border-white/20 rounded-full text-xs font-medium uppercase tracking-wider bg-white/5">
                Top 1% Nationwide
              </span>
              <span className="px-4 py-2 border border-white/20 rounded-full text-xs font-medium uppercase tracking-wider bg-white/5">
                Forbes Featured Agent
              </span>
            </div>

            <button className="bg-gold text-white px-8 py-4 rounded-full font-medium hover:bg-light-gold transition-colors shadow-lg shadow-gold/20 mb-12 w-fit btn-shimmer">
              Book Free Consultation
            </button>

            {/* Socials */}
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/50 hover:text-gold transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-gold transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-gold transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Video */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute inset-0 p-6 lg:p-12 flex items-center justify-center"
          >
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="James Mitchell"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

              {/* Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gold/90 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-75" />
                  <Play
                    size={32}
                    className="text-white ml-2"
                    fill="currentColor"
                  />
                </div>
                <p className="text-white font-serif text-xl mt-6 tracking-wide drop-shadow-md">
                  Watch: How We Find Your Dream Home
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
