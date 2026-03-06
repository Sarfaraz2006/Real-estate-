import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! 👋 Looking for your dream home? I'm here to help. What's your budget range?",
      isAgent: true,
    },
  ]);
  const [showOptions, setShowOptions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 15000); // Auto-open after 15 seconds
    return () => clearTimeout(timer);
  }, [hasOpened]);

  const handleOptionClick = (option: string) => {
    setMessages([...messages, { text: option, isAgent: false }]);
    setShowOptions(false);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Great! Let me show you our best options. Want to connect on WhatsApp for faster response?",
          isAgent: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setIsOpen(true);
              setHasOpened(true);
            }}
            className="w-16 h-16 bg-charcoal rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group border-2 border-gold"
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80"
              alt="Agent"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-black/20" />
            <MessageCircle
              size={24}
              className="text-white absolute drop-shadow-md"
            />
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ maxHeight: "500px" }}
          >
            {/* Header */}
            <div className="bg-charcoal text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80"
                    alt="James"
                    className="w-10 h-10 rounded-full object-cover border border-gold/50"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-charcoal rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-serif font-bold leading-tight">
                    James Mitchell
                  </h4>
                  <p className="text-xs text-white/70">Online Now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div
              className="p-4 flex-1 overflow-y-auto bg-gray-50 space-y-4 custom-scrollbar"
              style={{ minHeight: "250px" }}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isAgent ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.isAgent
                        ? "bg-white text-charcoal border border-gray-100 rounded-tl-none"
                        : "bg-charcoal text-white rounded-tr-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {showOptions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {["Under $500K", "$500K-$1M", "$1M-$5M", "$5M+"].map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="bg-white border border-gold/30 text-charcoal text-xs px-3 py-2 rounded-full hover:bg-gold hover:text-white transition-colors shadow-sm"
                      >
                        {opt}
                      </button>
                    ),
                  )}
                </motion.div>
              )}

              {!showOptions && messages.length > 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-whatsapp text-white py-3 rounded-xl font-medium text-sm hover:bg-green-600 transition-colors shadow-md flex items-center justify-center gap-2 btn-shimmer"
                  >
                    <MessageCircle size={18} />
                    Continue on WhatsApp
                  </a>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
                disabled={showOptions}
              />
              <button
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  showOptions
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gold text-white hover:bg-light-gold"
                }`}
                disabled={showOptions}
              >
                <Send size={16} className="ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
