import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Clock, Zap, DollarSign, Calculator, Send, CheckCircle2, 
  AlertTriangle, ArrowRight, ShieldCheck, Sparkles, MessageSquare, 
  Building2, TrendingUp, RefreshCw, UserCheck, Calendar, Stethoscope, 
  ChevronRight, PhoneCall, Check, Award, ArrowUpRight
} from 'lucide-react';

type IndustryType = 'real_estate' | 'dental';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  badge?: string;
}

export default function App() {
  const [industry, setIndustry] = useState<IndustryType>('real_estate');
  const [brandName, setBrandName] = useState('Your Business');
  const [marketLocation, setMarketLocation] = useState('Prime Market');

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ind = params.get('industry') || params.get('niche') || params.get('type');
    const brand = params.get('brand') || params.get('agency') || params.get('clinic') || params.get('company');
    const loc = params.get('location') || params.get('city');

    if (ind === 'dental' || ind === 'clinic' || ind === 'dentist') {
      setIndustry('dental');
      setBrandName(brand || 'Harley Street Dental Clinic');
      setMarketLocation(loc || 'Central London');
    } else {
      setIndustry('real_estate');
      setBrandName(brand || 'Mayfair Luxury Estates');
      setMarketLocation(loc || 'Prime London');
    }
  }, []);

  // Industry Switcher Handler
  const handleIndustryChange = (newInd: IndustryType) => {
    setIndustry(newInd);
    if (newInd === 'dental') {
      setBrandName('Harley Street Dental Clinic');
      setMonthlyInquiries(80);
      setValPerClient(4500); // £4.5k/dental cosmetic implant case
      setLeakedPercent(30);
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: `Good evening! I'm the 24/7 Clinical Intake Concierge for Harley Street Dental Clinic. Are you inquiring about cosmetic implants, Invisalign, or an emergency private consultation?`,
          time: 'Just now',
          badge: 'Speed: 1.2s'
        }
      ]);
    } else {
      setBrandName('Mayfair Luxury Estates');
      setMonthlyInquiries(60);
      setValPerClient(38000); // £38k average commission
      setLeakedPercent(35);
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: `Welcome! I'm the Autonomous Concierge for Mayfair Luxury Estates. I see you're reviewing our off-market portfolio. Which property or budget bracket would you like walkthrough specs on?`,
          time: 'Just now',
          badge: 'Speed: 1.1s'
        }
      ]);
    }
  };

  // Chat & Simulator State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Welcome! I'm the Autonomous Concierge for Mayfair Luxury Estates. I see you're reviewing our off-market portfolio. Which property or budget bracket would you like walkthrough specs on?`,
      time: 'Just now',
      badge: 'Speed: 1.1s'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);
  const [botPhase, setBotPhase] = useState<'IDLE' | 'PARSING' | 'QUALIFYING' | 'BOOKED'>('IDLE');

  // ROI Calculator Sliders
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(60);
  const [valPerClient, setValPerClient] = useState<number>(38000); // Comm or Procedure value
  const [leakedPercent, setLeakedPercent] = useState<number>(35); // 35% after-hours loss

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setResponseTime((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    setResponseTime(0);
    setTimerActive(true);
    setBotPhase('PARSING');
    setIsTyping(true);

    setTimeout(() => {
      setBotPhase('QUALIFYING');
    }, 700);

    setTimeout(() => {
      setTimerActive(false);
      setIsTyping(false);
      setBotPhase('BOOKED');

      let reply = "";
      if (industry === 'dental') {
        if (text.toLowerCase().includes('emergency') || text.toLowerCase().includes('pain')) {
          reply = `I have flagged this as urgent triage. Dr. Mitchell has an emergency slot reserved for 10:15 AM tomorrow morning. I've sent you a direct SMS reservation link to lock the chair immediately.`;
        } else {
          reply = `Understood! Full-arch implants and porcelain veneers include our 3D digital smile scan. We have 2 private consultation slots open with the Clinical Director this Wednesday at 4:30 PM or Friday at 11:00 AM. Would you like me to provisionally hold one for you?`;
        }
      } else {
        if (text.toLowerCase().includes('cash') || text.toLowerCase().includes('approved') || text.toLowerCase().includes('penthouse')) {
          reply = `Confirmed. For buyers in this bracket, we provide private escorted walkthroughs with NDA access. I've tentatively provisioned Saturday at 11:30 AM with the Senior Partner. Confirmation sent to your contact.`;
        } else {
          reply = `Excellent. Both listings in that specification feature private lift access and secure parking. Are you purchasing as a primary residence or an investment asset, and are funds pre-cleared for 30-day closing?`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: `Verified in 1.4s (Human Avg: 8.5 hrs)`
        }
      ]);
    }, 1400);
  };

  // Math: Hard Dollar Calculations
  const leakedLeadsMonthly = Math.round((monthlyInquiries * leakedPercent) / 100);
  const singleClientLoss = valPerClient;
  const monthlyDirectLoss = leakedLeadsMonthly * singleClientLoss;
  const annualTotalLoss = monthlyDirectLoss * 12;

  // Realistic Recovered Revenue (at 20% conversion of leaked leads)
  const recoveredClientsMonthly = Math.max(1, Math.round(leakedLeadsMonthly * 0.20));
  const annualRecoveredRevenue = recoveredClientsMonthly * singleClientLoss * 12;
  const systemAnnualCost = 750 + (299 * 12); // $4,338
  const netROI = Math.round(((annualRecoveredRevenue - systemAnnualCost) / systemAnnualCost) * 100);

  const isDental = industry === 'dental';
  const currencySymbol = '$';

  return (
    <div className="min-h-screen bg-[#050608] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300 relative overflow-hidden">
      
      {/* Background Specular Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-transparent to-transparent blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 -right-60 w-[500px] h-[500px] bg-teal-500/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-indigo-500/5 blur-3xl rounded-full"></div>
      </div>

      {/* Top Navigation & Live Mode Switcher */}
      <nav className="border-b border-white/[0.07] bg-[#080B11]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black shadow-lg ${
              isDental 
                ? 'bg-gradient-to-tr from-teal-400 to-cyan-300 text-slate-950 shadow-teal-500/20' 
                : 'bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 shadow-amber-500/20'
            }`}>
              {isDental ? <Stethoscope size={18} /> : <Building2 size={18} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">{brandName}</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/[0.06] text-slate-300 border border-white/[0.08] rounded-md">
                  Vexo Autonomous Protocol
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {isDental ? 'Cosmetic Dental High-Ticket Intake' : 'Prime Real Estate Speed-to-Lead Engine'} • &lt;60s SLA
              </p>
            </div>
          </div>

          {/* Industry Toggle Tabs */}
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] p-1 rounded-xl">
            <button
              onClick={() => handleIndustryChange('real_estate')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isDental 
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 size={14} />
              <span>Real Estate Engine</span>
            </button>
            <button
              onClick={() => handleIndustryChange('dental')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDental 
                  ? 'bg-teal-400 text-slate-950 shadow-md font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope size={14} />
              <span>Dental Clinic Engine</span>
            </button>
          </div>

          {/* Live System Telemetry Status */}
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">Off-Hours Daemon Active</span>
            </div>
            <div className="font-mono text-slate-400">
              Avg Latency: <span className="text-emerald-400 font-bold">120ms</span>
            </div>
          </div>

        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10 space-y-10">

        {/* HERO HOOK & AUDIT HEADLINE */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            <AlertTriangle size={14} />
            {isDental 
              ? '67% of private dental implant & veneer inquiries submitted after 6 PM book with competing clinics'
              : '78% of luxury real estate buyers tour with the first broker who replies to their listing request'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop Bleeding High-Ticket Clients to Off-Hours Delay
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Test how your autonomous concierge instantly engages, qualifies financing, and locks calendar appointments in <span className="text-white font-semibold">under 60 seconds</span> — 24/7/365 without staff payroll.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION 1: INTERACTIVE SIMULATOR (Live Experience & Telemetry) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Live Smartphone Mockup / Chat Terminal (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[580px]">
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.1] ${
                      isDental ? 'bg-teal-500/20 text-teal-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      <Bot size={20} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#090C13] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      {isDental ? 'Dental Intake & Triage Bot' : 'Luxury Real Estate Concierge'}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Integrated with {brandName} CRM & Live Calendar
                    </p>
                  </div>
                </div>

                {/* Response Speed Meter */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Live Clock</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.08]">
                      {responseTime.toFixed(1)}s elapsed
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Stream Body */}
              <div className="py-5 space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {messages.map((m) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      m.sender === 'user' 
                        ? isDental 
                          ? 'bg-teal-400 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-teal-500/10'
                          : 'bg-amber-400 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-amber-500/10' 
                        : 'glass-card text-slate-100 rounded-tl-none'
                    }`}>
                      <p>{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-black/10 border-white/5">
                        <span className={`text-[10px] ${m.sender === 'user' ? 'text-slate-800' : 'text-slate-400'}`}>
                          {m.time}
                        </span>
                        {m.badge && (
                          <span className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                            <Zap size={10} /> {m.badge}
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
                    <div className="glass-card px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-slate-300 flex items-center gap-2">
                      <Sparkles size={14} className={isDental ? "text-teal-400 animate-spin" : "text-amber-400 animate-spin"} />
                      <span>Concierge analyzing intent, checking calendar & qualifying...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Quick Action Presets & Interactive Input */}
            <div className="pt-3 border-t border-white/[0.08] space-y-3">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Click a realistic scenario to trigger instant 60s qualification:</span>
                <span className="text-[10px] font-mono text-emerald-400">Zero human intervention</span>
              </div>

              {/* Scenarios depending on Niche */}
              <div className="flex flex-wrap gap-2">
                {isDental ? (
                  <>
                    <button
                      onClick={() => handleSend("Need full porcelain veneers consultation this Thursday. What are your fees?")}
                      className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] hover:border-teal-400/40 px-3 py-1.5 rounded-xl transition-all text-left"
                    >
                      ✨ "Porcelain veneers consultation Thursday"
                    </button>
                    <button
                      onClick={() => handleSend("Severe tooth pain under molar crown, need emergency dentist tomorrow morning please.")}
                      className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] hover:border-teal-400/40 px-3 py-1.5 rounded-xl transition-all text-left"
                    >
                      🚨 "Severe molar pain, emergency slot tomorrow"
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleSend("Interested in the £3.5M Mayfair penthouse. Have pre-approved financing, want viewing Saturday morning.")}
                      className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] hover:border-amber-400/40 px-3 py-1.5 rounded-xl transition-all text-left"
                    >
                      🏢 "Penthouse £3.5M, viewing Saturday"
                    </button>
                    <button
                      onClick={() => handleSend("We are cash buyers looking for off-market residential estate, budget £8M+. Send details.")}
                      className="text-xs bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] hover:border-amber-400/40 px-3 py-1.5 rounded-xl transition-all text-left"
                    >
                      💰 "Cash buyer £8M+ off-market inquiry"
                    </button>
                  </>
                )}
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    isDental 
                      ? "Type a patient inquiry (e.g. 'Can I book a consultation for Invisalign?')..."
                      : "Type a buyer inquiry (e.g. 'Can I view the penthouse on Friday?')..."
                  }
                  className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/[0.25] transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className={`font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 ${
                    isDental 
                      ? 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-lg shadow-teal-500/20' 
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  <Send size={15} />
                  <span className="text-xs">Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live CRM Telemetry & Proof of Qualification (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Zap size={16} className={isDental ? "text-teal-400" : "text-amber-400"} />
                  <span>Real-Time Intake Telemetry</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                  botPhase === 'BOOKED' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : botPhase === 'QUALIFYING' 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                    : 'bg-white/[0.05] text-slate-400 border-white/[0.08]'
                }`}>
                  STATUS: {botPhase}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
                  <span className="text-slate-400">Response Speed:</span>
                  <span className="font-mono text-emerald-400 font-bold">1.4 Seconds (MIT benchmark: &lt;60s)</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
                  <span className="text-slate-400">Intent & Case Value:</span>
                  <span className="font-semibold text-white">
                    {isDental ? 'Cosmetic Smile Makeover (~$4,500)' : 'Prime Luxury Residence (~$35,000 Comm)'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
                  <span className="text-slate-400">Qualification Check:</span>
                  <span className="font-medium text-amber-400 flex items-center gap-1">
                    <ShieldCheck size={14} /> Verified High Intent
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.05]">
                  <span className="text-slate-400">Calendar Sync Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Calendar size={13} /> {isDental ? 'Private Surgery Chair Provisioned' : 'Escorted Walkthrough Slot Reserved'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Staff Payroll Cost:</span>
                  <span className="text-white font-mono">$0 (100% Autonomous)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  While competing practices are asleep or taking 6 hours to reply via email, your autonomous bot engages in 60s, qualifies the case, and books the walkthrough.
                </p>
              </div>
            </div>

            {/* MIT / Harvard Research Callout */}
            <div className="glass-card rounded-2xl p-5 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  MIT Speed-to-Lead Study
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">21X MULTIPLIER</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reaching a high-value prospect within <strong className="text-white">5 minutes vs 30 minutes</strong> increases qualification odds by 2,100%. After 1 hour, lead responsiveness drops by 80%.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: HARD DOLLAR FINANCIAL LOSS & ROI ENGINE */}
        {/* ========================================================================= */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Subtle Corner Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-3xl pointer-events-none"></div>

          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider mb-2 text-red-400">
                <Calculator size={16} />
                Financial Leakage & Bleed Calculator for {brandName}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Exact Cost of Inbound Leads Going Cold
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
                Every inquiry that submits on your website, Google Business, or email after hours and waits until the next morning has a 70%+ chance of hiring your competitor.
              </p>
            </div>

            {/* Total Annual Bleed Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-right min-w-[240px]">
              <span className="text-xs text-red-300 block font-medium uppercase font-mono">Gross Annual Leakage</span>
              <span className="text-3xl font-black text-red-400 tracking-tight mt-1 block">
                ${(annualTotalLoss / 1000000).toFixed(2)}M / yr
              </span>
              <span className="text-[11px] text-red-300/70 block mt-0.5">
                ${monthlyDirectLoss.toLocaleString()} lost every 30 days
              </span>
            </div>
          </div>

          {/* Interactive Sliders (3 Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Slider 1: Monthly Inquiries */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Monthly Inbound Inquiries</span>
                <span className="text-white font-bold font-mono text-sm">{monthlyInquiries} leads</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="250" 
                step="5"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full accent-white bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                {isDental ? 'Patients contacting via web, WhatsApp, or ads.' : 'High-net-worth buyers requesting viewings.'}
              </p>
            </div>

            {/* Slider 2: Average Value per Client */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">
                  {isDental ? 'Average Cosmetic Case Value' : 'Average Commission Per Deal'}
                </span>
                <span className="text-amber-400 font-bold font-mono text-sm">${valPerClient.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={isDental ? 1000 : 10000} 
                max={isDental ? 25000 : 100000} 
                step={isDental ? 500 : 2500}
                value={valPerClient}
                onChange={(e) => setValPerClient(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                {isDental ? 'Full implants, Invisalign, smile makeovers.' : 'Gross fee on typical listing or sales closing.'}
              </p>
            </div>

            {/* Slider 3: Off-Hours Leak Rate */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Off-Hours & Weekend Loss Rate</span>
                <span className="text-red-400 font-bold font-mono text-sm">{leakedPercent}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={leakedPercent}
                onChange={(e) => setLeakedPercent(Number(e.target.value))}
                className="w-full accent-red-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Percent of inquiries arriving 6 PM - 8 AM that don't get answered in &lt;5 mins.
              </p>
            </div>

          </div>

          {/* Detailed Financial Calculation Breakdown (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            
            <div className="p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/20">
              <span className="text-[11px] text-red-300 font-mono uppercase block font-semibold">1. Single Client Lost</span>
              <span className="text-2xl font-bold text-white mt-1 block font-mono">
                ${valPerClient.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Direct revenue lost every time 1 inquiry goes unanswered.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/[0.06] border border-red-500/20">
              <span className="text-[11px] text-red-300 font-mono uppercase block font-semibold">2. Monthly Bleed</span>
              <span className="text-2xl font-bold text-red-400 mt-1 block font-mono">
                {leakedLeadsMonthly} clients <span className="text-sm text-slate-400 font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                ${monthlyDirectLoss.toLocaleString()} leaking to competitors every month.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20">
              <span className="text-[11px] text-emerald-400 font-mono uppercase block font-semibold">3. Net Revenue Recovered</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">
                +${annualRecoveredRevenue.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Conservatively rescuing just {recoveredClientsMonthly} clients/mo with &lt;60s AI response.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30">
              <span className="text-[11px] text-amber-400 font-mono uppercase block font-semibold">4. System Cost vs ROI</span>
              <span className="text-2xl font-black text-amber-300 mt-1 block font-mono">
                {Math.round(annualRecoveredRevenue / systemAnnualCost)}x ROI
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                $750 setup + $299/mo pays for itself on day 3.
              </span>
            </div>

          </div>

          {/* Bottom Conversion Guarantee Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.04] border border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">Turnkey Installation</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Deploy this autonomous engine on {brandName} within 48 hours
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                We configure the complete AI intake protocol, MLS/Dentrix CRM synchronization, and direct WhatsApp/SMS speed-to-lead routing.
              </p>
            </div>

            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Autonomous%20Speed-to-Lead%20Concierge"
              className={`px-6 py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-xl ${
                isDental
                  ? 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-teal-500/20'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20'
              }`}
            >
              <span>Provision My Agency Slot</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-slate-500 relative z-10">
        <p>Vexo TeamX Autonomous Intelligence • Speed-to-Lead Infrastructure • &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}
