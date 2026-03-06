import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <a
              href="#"
              className="text-3xl font-serif font-bold text-gold block"
            >
              JM Real Estate
            </a>
            <p className="text-white/70 text-sm leading-relaxed">
              Curating exceptional lifestyles through ultra-luxury real estate.
              Your trusted partner in finding the perfect home.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-colors border border-white/10"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-colors border border-white/10"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-colors border border-white/10"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-white transition-colors border border-white/10"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <a href="#home" className="hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="hover:text-gold transition-colors"
                >
                  Featured Properties
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-gold transition-colors">
                  Interactive Map
                </a>
              </li>
              <li>
                <a
                  href="#calculator"
                  className="hover:text-gold transition-colors"
                >
                  Mortgage Calculator
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors">
                  About James
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-gold transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Property Types */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 uppercase tracking-wider">
              Property Types
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Luxury Villas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Oceanfront Estates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Penthouses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Investment Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Commercial Spaces
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Off-Market Listings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-6 text-sm text-white/70">
              <li className="flex gap-4">
                <MapPin size={20} className="text-gold shrink-0" />
                <span>
                  90210 Rodeo Drive, Suite 100
                  <br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone size={20} className="text-gold shrink-0" />
                <span>+1 (310) 555-0198</span>
              </li>
              <li className="flex gap-4 items-center">
                <Mail size={20} className="text-gold shrink-0" />
                <span>james@jmrealestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} JM Luxury Real Estate. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-gold">Website by AI Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
