import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickReply = () => {
    setStep(2);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {(!isOpen && showPopup) && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-16 h-16 bg-charcoal text-white rounded-full shadow-2xl border-2 border-gold/50"
          >
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-whatsapp rounded-full border-2 border-white"></div>
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-0 left-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-charcoal text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="James Mitchell" 
                    className="w-10 h-10 rounded-full object-cover border border-gold/50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-whatsapp rounded-full border-2 border-charcoal"></div>
                </div>
                <div>
                  <h4 className="font-serif font-bold leading-tight">James Mitchell</h4>
                  <p className="text-xs text-gray-300">Online Now</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-80 overflow-y-auto bg-offwhite flex flex-col space-y-4 custom-scrollbar">
              <div className="flex space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                  alt="James" 
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-charcoal max-w-[80%]">
                  Hi! 👋 Looking for your dream home? I'm here to help. What's your budget range?
                </div>
              </div>

              {step === 1 && (
                <div className="flex flex-col space-y-2 pl-10">
                  {['Under $500K', '$500K-$1M', '$1M-$5M', '$5M+'].map((range) => (
                    <button
                      key={range}
                      onClick={handleQuickReply}
                      className="text-left px-4 py-2 bg-gold/10 text-gold hover:bg-gold hover:text-white transition-colors rounded-xl text-sm font-medium border border-gold/20"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-2"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                    alt="James" 
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-charcoal max-w-[80%]">
                    Great! Let me show you our best options. Want to connect on WhatsApp for faster response?
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {step === 2 && (
              <div className="p-4 bg-white border-t border-gray-100">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-whatsapp text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center shadow-md btn-shimmer"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Continue on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
