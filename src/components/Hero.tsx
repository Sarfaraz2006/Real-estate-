import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        >
          <source
            src="https://www.pexels.com/video/luxurious-house-with-a-pool-2169880/download"
            type="video/mp4"
          />
        </video>
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-32 right-6 md:right-12 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-2xl z-20 flex items-center space-x-2"
      >
        <span className="text-yellow-500 text-lg">⭐</span>
        <span className="text-sm font-semibold text-charcoal tracking-wide">
          Top 1% Agent Nationwide
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Welcome to Luxury Living
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-4 drop-shadow-lg relative inline-block"
        >
          Find Your <br className="hidden md:block" /> Perfect Home
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            className="absolute -bottom-2 left-0 h-[2px] bg-gold"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl drop-shadow-md mt-4"
        >
          Premium Real Estate | USA's Most Trusted Agents
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#properties"
            className="px-8 py-4 border border-white text-white rounded-full font-medium hover:bg-white hover:text-charcoal transition-all duration-300 text-center btn-shimmer"
          >
            Explore Listings
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gold text-white rounded-full font-medium hover:bg-light-gold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-gold/20 btn-shimmer"
          >
            <MessageCircle size={20} />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white z-20"
      >
        <span className="text-xs uppercase tracking-widest mb-2 opacity-70">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
