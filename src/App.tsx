/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
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
import AutomationBleedShowcase from "./components/AutomationBleedShowcase";
import Testimonials from "./components/Testimonials";
import LeadCapture from "./components/LeadCapture";
import Footer from "./components/Footer";
import LiveChat from "./components/LiveChat";
import WhatsAppButton from "./components/WhatsAppButton";
import RealEstateBot from "./components/RealEstateBot";
import DentalBot from "./components/DentalBot";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>("/");

  useEffect(() => {
    const syncRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (path === "/dental" || search.includes("dental") || search.includes("industry=dental")) {
        setCurrentRoute("/dental");
      } else if (path === "/speed-to-lead" || path === "/bot" || search.includes("speed-to-lead") || search.includes("industry=real_estate")) {
        setCurrentRoute("/speed-to-lead");
      } else {
        setCurrentRoute("/");
      }
    };

    syncRoute();
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  // Sub-route: Dedicated Real Estate Standalone Sandbox
  if (currentRoute === "/speed-to-lead") {
    return <RealEstateBot />;
  }

  // Sub-route: Dedicated Dental Clinical Standalone Sandbox
  if (currentRoute === "/dental") {
    return <DentalBot />;
  }

  // Default Route (/): The Grand Luxury Real Estate Landing Page with Integrated 60s Automation Bleed Showcase
  return (
    <div className="min-h-screen bg-primary font-sans text-text-primary overflow-x-hidden selection:bg-gold/30 selection:text-charcoal">
      <Navbar />
      <Hero />
      <Stats />
      
      {/* Flagship Integrated Feature: 60s Lead Qualifier & Financial Bleed Engine */}
      <AutomationBleedShowcase />

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
