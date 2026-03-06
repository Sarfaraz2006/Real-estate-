import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "James helped us close on our dream home in Beverly Hills in just 3 weeks. The entire process was seamless.",
    name: "Sarah & Tom W.",
    location: "Beverly Hills",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    id: 2,
    quote:
      "Our property sold for 18% above asking price. James negotiated brilliantly on our behalf. Truly exceptional.",
    name: "Michael R.",
    location: "Manhattan NY",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 3,
    quote:
      "As an international buyer, I was nervous. James made the whole process easy and transparent. Highly recommend!",
    name: "Ahmed K.",
    location: "Dubai (buying in Miami)",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: 4,
    quote:
      "The ROI calculator on the website sold me before I even called. Bought 2 investment properties through James!",
    name: "Jennifer L.",
    location: "Austin TX",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    // For desktop, show 3 items. For mobile, show 1.
    // We'll handle responsiveness with CSS grid, but for the array slice:
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return items;
  };

  return (
    <section className="py-24 bg-charcoal text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((t, idx) => (
                <motion.div
                  key={`${t.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-white text-charcoal p-8 rounded-3xl border border-gold/20 shadow-xl relative ${
                    idx > 0 ? "hidden md:block" : "block"
                  }`}
                >
                  <Quote
                    size={48}
                    className="text-gold/20 absolute top-6 right-6"
                  />
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <p className="text-lg font-serif italic mb-8 leading-relaxed min-h-[100px]">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                    />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider">
                        {t.name}
                      </h4>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-gold w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
