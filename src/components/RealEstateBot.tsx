import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Sparkles, Clock, ShieldCheck, Calendar, Send, 
  AlertCircle, ArrowRight, Check, DollarSign, Calculator, 
  TrendingDown, TrendingUp, PhoneCall, Key, MapPin, ChevronRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'buyer' | 'concierge';
  text: string;
  time: string;
  badge?: string;
  isStreaming?: boolean;
}

export default function RealEstateBot() {
  const [agencyName, setAgencyName] = useState('Mayfair Luxury Estates');
  const [locationName, setLocationName] = useState('London');

  // Sliders for Financial Bleed
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(45);
  const [dealCommission, setDealCommission] = useState<number>(38000); // £38k comm
  const [offHoursLeakRate, setOffHoursLeakRate] = useState<number>(35); // 35% leak

  // Live Typewriter / Animated Stream Simulator
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'concierge',
      text: "Welcome to Mayfair Luxury Estates. I am your 24/7 Senior Concierge. I have private off-market dossiers ready for Mayfair, Belgravia, and Knightsbridge. Which acquisition profile or budget can I prepare for you?",
      time: 'Just now',
      badge: 'Speed: 1.1s Response'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [elapsedClock, setElapsedClock] = useState<number>(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [auditStatus, setAuditStatus] = useState<'IDLE' | 'ANALYZING' | 'PRE_QUALIFIED' | 'VIP_SCHEDULED'>('IDLE');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || params.get('agency');
    const loc = params.get('location') || params.get('city');
    if (brand) setAgencyName(brand);
    if (loc) setLocationName(loc);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: any;
    if (clockRunning) {
      interval = setInterval(() => {
        setElapsedClock((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [clockRunning]);

  const handleSend = (presetText?: string) => {
    const query = presetText || inputValue;
    if (!query.trim()) return;

    const buyerMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'buyer',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, buyerMsg]);
    if (!presetText) setInputValue('');

    setElapsedClock(0);
    setClockRunning(true);
    setAuditStatus('ANALYZING');
    setIsTyping(true);

    setTimeout(() => {
      setAuditStatus('PRE_QUALIFIED');
    }, 600);

    setTimeout(() => {
      setClockRunning(false);
      setIsTyping(false);
      setAuditStatus('VIP_SCHEDULED');

      let reply = `Confirmed. Both penthouses in that specification feature private lift access and 24h concierge. I have provisionally reserved a VIP escorted tour for Saturday at 11:30 AM with our Senior Partner. Access sheet dispatched to your details.`;
      if (query.toLowerCase().includes('cash') || query.toLowerCase().includes('10m')) {
        reply = `Priority Off-Market Record: For cash acquisitions at £10M+, we release NDA floorplans privately. I have provisioned an executive walkthrough for Friday at 3:00 PM. Gate credentials sent.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'concierge',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: 'Locked in 1.3s (MIT Rule: <60s)'
        }
      ]);
    }, 1300);
  };

  // Calculations
  const leakedLeadsMonthly = Math.round((monthlyInquiries * offHoursLeakRate) / 100);
  const monthlyCashBleed = leakedLeadsMonthly * dealCommission;
  const annualCashBleed = monthlyCashBleed * 12;
  const rescuedAnnualDeals = Math.max(1, Math.round(leakedLeadsMonthly * 0.20 * 12));
  const recoveredAnnualRevenue = rescuedAnnualDeals * dealCommission;
  const annualSystemFee = 750 + (299 * 12); // $4,338
  const roiMultiplier = Math.round(recoveredAnnualRevenue / annualSystemFee);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#f4efe6] font-sans antialiased selection:bg-[#c5a880]/30 selection:text-[#f4efe6] relative overflow-x-hidden">
      
      {/* Editorial Luxury Ambient Warm Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-[#c5a880]/15 via-[#8f7453]/5 to-transparent blur-[160px]"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#2a241b]/40 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-[#1a1713]/40 blur-[180px] rounded-full"></div>
      </div>

      {/* Top Luxury Navbar */}
      <nav className="border-b border-[#c5a880]/20 bg-[#0d0f12]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#947854] via-[#c5a880] to-[#e4d3ba] flex items-center justify-center text-[#0d0f12] shadow-lg shadow-[#c5a880]/20">
              <Building2 size={19} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-wide text-[#f4efe6]">{agencyName}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-[#c5a880]/10 text-[#d4af37] border border-[#c5a880]/30 rounded-full">
                  Autonomous Concierge
                </span>
              </div>
              <p className="text-xs text-[#a09a8f] font-sans">
                Ultra-Luxury Real Estate Speed-to-Lead &bull; &lt;60s Prime SLA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/"
              className="text-xs text-[#a09a8f] hover:text-[#f4efe6] px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors border border-transparent hover:border-[#c5a880]/20 font-serif italic"
            >
              ← Return to JM Luxury Portfolio
            </a>
            <a 
              href="/dental"
              className="text-xs text-[#0d0f12] bg-gradient-to-r from-[#c5a880] to-[#e4d3ba] hover:brightness-110 font-semibold px-4 py-2 rounded-full transition-all shadow-md shadow-[#c5a880]/20"
            >
              Switch to Dental Clinic Demo &rarr;
            </a>
          </div>

        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16 relative z-10 pb-20">

        {/* Hero Editorial Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3d1818]/60 border border-[#8a3333]/40 text-[#ff8080] text-xs font-mono tracking-wide"
          >
            <AlertCircle size={14} />
            78% of luxury buyers tour with the first brokerage that responds
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif text-[#f4efe6] tracking-tight leading-[1.08]"
          >
            Stop Bleeding High-Net-Worth Inquiries to Evening & Weekend Delays
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#b0a99c] max-w-2xl mx-auto leading-relaxed font-light"
          >
            When a verified buyer inquires on a £4,000,000 penthouse at 9:30 PM, waiting until 10 AM costs you the deal. 
            Experience how our autonomous concierge pre-qualifies financing, signs NDAs, and reserves calendar walkthroughs in <strong className="text-[#e4d3ba] font-medium font-serif">under 60 seconds</strong>.
          </motion.p>
        </div>

        {/* DUAL SIMULATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Editorial Chat Simulator (7 Cols) */}
          <div className="lg:col-span-7 bg-[#14171d]/90 backdrop-blur-2xl border border-[#c5a880]/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[580px] relative overflow-hidden">
            
            {/* Top Card Bar */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#c5a880]/15">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-[#1e222b] border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
                      <Sparkles size={20} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#14171d] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#f4efe6] tracking-wide">Autonomous VIP Concierge</h3>
                    <p className="text-xs text-[#a09a8f] font-mono">Live API link with {agencyName} Calendar & Listings</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#a09a8f] uppercase font-mono block tracking-widest">SLA Speed</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                    {elapsedClock.toFixed(1)}s elapsed
                  </span>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="py-6 space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {messages.map((m) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`flex ${m.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                      m.sender === 'buyer'
                        ? 'bg-[#c5a880] text-[#0d0f12] font-medium rounded-tr-none'
                        : 'bg-[#1b1f27] border border-[#c5a880]/20 text-[#f4efe6] rounded-tl-none'
                    }`}>
                      <p className="font-sans">{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-black/10 border-white/5">
                        <span className={`text-[10px] ${m.sender === 'buyer' ? 'text-[#382d1e]' : 'text-[#8a857b]'}`}>
                          {m.time}
                        </span>
                        {m.badge && (
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                            &bull; {m.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-[#1b1f27] border border-[#c5a880]/30 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-[#c5a880] flex items-center gap-2">
                      <Sparkles size={14} className="animate-spin text-[#c5a880]" />
                      <span>Concierge cross-referencing floorplans & verifying proof-of-funds...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Quick Realistic Luxury Scenarios */}
            <div className="pt-4 border-t border-[#c5a880]/15 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#a09a8f]">
                <span>Click a luxury buyer inquiry to test instantaneous 60s reply:</span>
                <span className="text-[10px] font-mono text-emerald-400">&bull; Zero Human Intervention</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSend("Inquiring about the £4.2M penthouse on Mount Street. Have pre-approved funds, want a private walkthrough this Saturday morning.")}
                  className="text-xs bg-[#1b1f27] hover:bg-[#252a35] text-[#e4d3ba] border border-[#c5a880]/25 hover:border-[#c5a880]/50 px-3.5 py-2 rounded-xl transition-all text-left"
                >
                  🏢 &ldquo;Penthouse £4.2M, viewing Saturday&rdquo;
                </button>
                <button
                  onClick={() => handleSend("We are private family office cash buyers looking for prime off-market residential estate (£10M+). Send private acquisition dossier.")}
                  className="text-xs bg-[#1b1f27] hover:bg-[#252a35] text-[#e4d3ba] border border-[#c5a880]/25 hover:border-[#c5a880]/50 px-3.5 py-2 rounded-xl transition-all text-left"
                >
                  💰 &ldquo;Cash buyer £10M+ off-market dossier&rdquo;
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type an off-hours inquiry (e.g. 'Can I see the Belgravia townhouse tomorrow?')..."
                  className="flex-1 bg-black/40 border border-[#c5a880]/25 rounded-xl px-4 py-3 text-sm text-[#f4efe6] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880] transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="bg-gradient-to-r from-[#947854] to-[#c5a880] hover:brightness-110 disabled:opacity-50 text-[#0d0f12] font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#c5a880]/20"
                >
                  <Send size={15} />
                  <span className="text-xs font-serif uppercase tracking-wider">Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Audit Telemetry & Evidence (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#14171d]/90 backdrop-blur-2xl border border-[#c5a880]/30 rounded-3xl p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#c5a880]/15">
                <div className="flex items-center gap-2 text-[#f4efe6] font-serif font-bold text-base">
                  <Key size={17} className="text-[#c5a880]" />
                  <span>Real-Time Broker CRM Telemetry</span>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  auditStatus === 'VIP_SCHEDULED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : auditStatus === 'PRE_QUALIFIED'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-white/[0.04] text-[#8a857b] border-white/[0.08]'
                }`}>
                  {auditStatus}
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Response Latency:</span>
                  <span className="font-mono text-emerald-400 font-bold">1.3 Seconds (MIT benchmark: &lt;60s)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Estimated Commission Value:</span>
                  <span className="font-medium text-[#f4efe6] font-serif text-sm">${dealCommission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Proof of Funds Check:</span>
                  <span className="text-[#c5a880] font-medium flex items-center gap-1">
                    <ShieldCheck size={14} /> Verified High Intent
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Calendar Provision:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Calendar size={14} /> Saturday Escorted Walkthrough
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#a09a8f]">Staff Overhead:</span>
                  <span className="text-[#f4efe6] font-mono">$0 Payroll (100% Autonomous)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1b1f27] border border-[#c5a880]/20 text-xs text-[#b0a99c] flex items-start gap-3">
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  While competing brokerages are asleep or waiting for Monday morning staff, your concierge instantly qualifies the buyer and signs them up for an exclusive viewing.
                </p>
              </div>
            </div>

            {/* MIT / Harvard Research Citation */}
            <div className="bg-[#14171d]/90 backdrop-blur-2xl border border-[#c5a880]/30 rounded-3xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#c5a880] tracking-wide uppercase">
                  MIT Speed-to-Lead Benchmark
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">21X QUALIFICATION</span>
              </div>
              <p className="text-xs text-[#a09a8f] leading-relaxed">
                Responding to an ultra-high-net-worth inquiry in <strong className="text-[#f4efe6]">under 5 minutes vs 30 minutes</strong> increases qualification by 2,100%. After 1 hour, over 80% of buyers have already scheduled with a competing agency.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 2: HARD-DOLLAR FINANCIAL LEAKAGE ENGINE */}
        <div className="bg-[#14171d]/90 backdrop-blur-2xl border border-[#c5a880]/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#c5a880]/15 pb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff8080]">
                <Calculator size={15} />
                Financial Bleed Audit for {agencyName}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#f4efe6] tracking-tight">
                How Much Commission Are You Leaking Each Year?
              </h2>
              <p className="text-sm text-[#a09a8f]">
                Every luxury inquiry submitted after 6 PM or on weekends that sits waiting until morning has a 70%+ chance of touring with a competitor.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#3d1818]/60 border border-[#8a3333]/40 text-right min-w-[260px]">
              <span className="text-xs text-[#ff8080] font-mono uppercase block tracking-wider">Gross Annual Bleed</span>
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#ff8080] mt-1 block tracking-tight">
                ${(annualCashBleed / 1000).toLocaleString()}k <span className="text-xs font-sans text-[#ff8080]/80 font-normal">/ yr</span>
              </span>
              <span className="text-xs text-[#ff8080]/70 block mt-1">
                ${monthlyCashBleed.toLocaleString()} lost every 30 days
              </span>
            </div>
          </div>

          {/* Interactive Sliders (3 Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Slider 1: Inquiries */}
            <div className="bg-[#1b1f27] border border-[#c5a880]/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a09a8f] font-medium">Monthly Inbound Inquiries</span>
                <span className="text-[#f4efe6] font-serif font-bold text-base">{monthlyInquiries} leads</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="200" 
                step="5"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full accent-[#c5a880] bg-[#0d0f12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#6b665c]">Total portal, website, and off-market inquiries received monthly.</p>
            </div>

            {/* Slider 2: Average Commission */}
            <div className="bg-[#1b1f27] border border-[#c5a880]/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a09a8f] font-medium">Average Commission / Closing</span>
                <span className="text-[#c5a880] font-serif font-bold text-base">${dealCommission.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="120000" 
                step="2500"
                value={dealCommission}
                onChange={(e) => setDealCommission(Number(e.target.value))}
                className="w-full accent-[#c5a880] bg-[#0d0f12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#6b665c]">Gross commission on typical luxury residential acquisition.</p>
            </div>

            {/* Slider 3: Off-Hours Leak Rate */}
            <div className="bg-[#1b1f27] border border-[#c5a880]/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a09a8f] font-medium">Off-Hours Leak Rate</span>
                <span className="text-[#ff8080] font-mono font-bold text-base">{offHoursLeakRate}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={offHoursLeakRate}
                onChange={(e) => setOffHoursLeakRate(Number(e.target.value))}
                className="w-full accent-[#ff8080] bg-[#0d0f12] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#6b665c]">Percent of inquiries arriving 6 PM – 8 AM or weekends.</p>
            </div>

          </div>

          {/* 4 Cards Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-[#3d1818]/40 border border-[#8a3333]/30 space-y-1">
              <span className="text-xs text-[#ff8080] font-mono uppercase block font-semibold">1. Single Client Lost</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#f4efe6] block">
                ${dealCommission.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                Direct commission lost each time 1 buyer walks to a competitor.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#3d1818]/40 border border-[#8a3333]/30 space-y-1">
              <span className="text-xs text-[#ff8080] font-mono uppercase block font-semibold">2. Monthly Leakage</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#ff8080] block">
                {leakedLeadsMonthly} buyers <span className="text-sm font-sans text-[#a09a8f] font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                ${monthlyCashBleed.toLocaleString()} leaking out of your pipeline every 30 days.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-mono uppercase block font-semibold">3. Net Revenue Recovered</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 block">
                +${recoveredAnnualRevenue.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                Conservatively rescuing just {Math.round(rescuedAnnualDeals / 12)} deals/mo with &lt;60s concierge.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#c5a880]/10 border border-[#c5a880]/30 space-y-1">
              <span className="text-xs text-[#c5a880] font-mono uppercase block font-semibold">4. Agency ROI Multiple</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#f4efe6] block">
                {roiMultiplier}x ROI
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                $750 setup + $299/mo pays for itself on day 2.
              </span>
            </div>

          </div>

          {/* Turnkey Onboarding Guarantee Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1b1f27] via-[#222833] to-[#1b1f27] border border-[#c5a880]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-serif font-bold text-[#f4efe6]">
                Deploy this autonomous concierge for {agencyName} in 48 hours
              </h3>
              <p className="text-xs text-[#a09a8f] max-w-xl font-light">
                We configure complete CRM sync, WhatsApp routing, and off-market PDF access. Zero tech lift for your brokerage.
              </p>
            </div>

            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Autonomous%20Real%20Estate%20Concierge"
              className="px-6 py-3.5 bg-gradient-to-r from-[#947854] to-[#c5a880] hover:brightness-110 text-[#0d0f12] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-xl shadow-[#c5a880]/20 font-serif"
            >
              <span>Provision Agency Slot</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#c5a880]/15 py-8 text-center text-xs text-[#6b665c] mt-20">
        <p className="font-serif">Vexo TeamX Autonomous Intelligence &bull; Luxury Real Estate Protocol &bull; &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}
