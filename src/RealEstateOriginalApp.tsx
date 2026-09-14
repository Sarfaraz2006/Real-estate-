/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import FeaturedListings from "./components/FeaturedListings";
import PropertyMap from "./components/PropertyMap";
import SearchFilter from "./components/SearchFilter";
import WhyChooseUs from "./components/WhyChooseUs";
import AgentIntro from "./components/AgentIntro";
import BeforeAfter from "./components/BeforeAfter";
import MortgageCalculator from "./components/MortgageCalculator";
import ROICalculator from "./components/ROICalculator";
import Testimonials from "./components/Testimonials";
import LeadCapture from "./components/LeadCapture";
import Footer from "./components/Footer";
import LiveChat from "./components/LiveChat";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen bg-primary font-sans text-text-primary overflow-x-hidden selection:bg-gold/30 selection:text-charcoal">
      <Navbar />
      <Hero />
      <Stats />
      <SearchFilter />
      <FeaturedListings />
      <PropertyMap />
      <WhyChooseUs />
      <AgentIntro />
      <BeforeAfter />
      <MortgageCalculator />
      <ROICalculator />
      <Testimonials />
      <LeadCapture />
      <Footer />
      <LiveChat />
      <WhatsAppButton />
    </div>
  );
}
