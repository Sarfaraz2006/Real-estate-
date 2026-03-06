import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute -top-12 right-0 bg-charcoal text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with James on WhatsApp
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-charcoal rotate-45"></div>
        </div>

        {/* Pulse Ring */}
        <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-30"></div>

        {/* Button */}
        <motion.a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 bg-whatsapp text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-white"
        >
          <MessageCircle size={32} />
        </motion.a>
      </div>
    </div>
  );
}
