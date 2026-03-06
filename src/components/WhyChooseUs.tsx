import { motion } from "framer-motion";
import { Trophy, Key, BarChart3, MessageCircle } from "lucide-react";

const features = [
  {
    icon: <Trophy size={40} className="text-gold" />,
    title: "Expert Negotiation",
    desc: "We consistently close deals 10-15% above asking price through strategic market positioning and aggressive negotiation tactics.",
  },
  {
    icon: <Key size={40} className="text-gold" />,
    title: "Full-Service Experience",
    desc: "From your first search to keys in hand, we handle everything. Concierge-level service tailored to your unique lifestyle.",
  },
  {
    icon: <BarChart3 size={40} className="text-gold" />,
    title: "Market Intelligence",
    desc: "Real-time data and proprietary insights to help you buy or sell smarter in an ever-changing luxury real estate landscape.",
  },
  {
    icon: <MessageCircle size={40} className="text-gold" />,
    title: "Always Available",
    desc: "24/7 support via phone, email, or WhatsApp. Your dedicated agent is always just a message away, no matter the time zone.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-4"
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif text-charcoal mb-4">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
