import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Stethoscope, Calculator, Zap, Clock, ShieldCheck, 
  Send, Sparkles, AlertCircle, ArrowRight, Check, TrendingDown, 
  Calendar, Award, MessageCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

type Mode = "real_estate" | "dental";

export default function AutomationBleedShowcase() {
  const [mode, setMode] = useState<Mode>("real_estate");

  // Real Estate Configuration
  const [reInquiries, setReInquiries] = useState(45);
  const [reDealCommission, setReDealCommission] = useState(38000);
  const [reLeakRate, setReLeakRate] = useState(35);

  // Dental Configuration
  const [deInquiries, setDeInquiries] = useState(70);
  const [deCaseValue, setDeCaseValue] = useState(4500);
  const [deLeakRate, setDeLeakRate] = useState(30);

  // Interactive Live Chat Simulator State
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'bot'; text: string; time: string; badge?: string }>>([
    {
      id: '1',
      sender: 'bot',
      text: "Welcome to Mayfair Luxury Estates. I am your 24/7 VIP Concierge. I have exclusive off-market dossiers ready for Mayfair & Belgravia. Which budget specification or private walkthrough can I prepare for you?",
      time: 'Just now',
      badge: 'Speed: 1.1s Response'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [clock, setClock] = useState(0);
  const [clockActive, setClockActive] = useState(false);
  const [stepStatus, setStepStatus] = useState<'IDLE' | 'ANALYZING' | 'LOCKED'>('IDLE');

  // Handle Mode Change
  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === 'dental') {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: "Good evening. I am the 24/7 Clinical Intake Concierge for Harley Street Dental Clinic. Are you inquiring about full-arch dental implants, porcelain veneers, or an emergency triage appointment?",
          time: 'Just now',
          badge: 'Speed: 1.1s Response'
        }
      ]);
    } else {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: "Welcome to Mayfair Luxury Estates. I am your 24/7 VIP Concierge. I have exclusive off-market dossiers ready for Mayfair & Belgravia. Which budget specification or private walkthrough can I prepare for you?",
          time: 'Just now',
          badge: 'Speed: 1.1s Response'
        }
      ]);
    }
  };

  useEffect(() => {
    let t: any;
    if (clockActive) {
      t = setInterval(() => setClock((c) => +(c + 0.1).toFixed(1)), 100);
    }
    return () => clearInterval(t);
  }, [clockActive]);

  const handleSendMessage = (preset?: string) => {
    const text = preset || inputVal;
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    if (!preset) setInputVal('');

    setClock(0);
    setClockActive(true);
    setStepStatus('ANALYZING');
    setIsTyping(true);

    setTimeout(() => {
      setClockActive(false);
      setIsTyping(false);
      setStepStatus('LOCKED');

      let reply = "";
      if (mode === 'dental') {
        if (text.toLowerCase().includes('emergency') || text.toLowerCase().includes('pain')) {
          reply = `Triage Priority: Urgent. Dr. Mitchell has reserved an emergency surgery slot for tomorrow morning at 10:15 AM. A direct SMS link has been dispatched to hold your chair.`;
        } else {
          reply = `Understood. Our bespoke smile makeover includes 3D digital oral imaging. We have 2 private consultation slots open with the Clinical Director this Thursday at 4:30 PM or Friday at 11:00 AM. Would you like me to provisionally hold one?`;
        }
      } else {
        if (text.toLowerCase().includes('cash') || text.toLowerCase().includes('10m') || text.toLowerCase().includes('penthouse')) {
          reply = `Priority Off-Market Record: I have provisioned an executive escorted walkthrough for this Saturday at 11:30 AM with our Senior Partner. Gate access and NDA sheet dispatched.`;
        } else {
          reply = `Confirmed. Both residences in that specification feature private lift access and 24h security. Are you purchasing as a primary residence or investment, and are funds pre-cleared for 30-day closing?`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: 'Confirmed in 1.4s (MIT Rule: <60s)'
        }
      ]);
    }, 1300);
  };

  // Math Variables
  const isRe = mode === 'real_estate';
  const inquiries = isRe ? reInquiries : deInquiries;
  const singleValue = isRe ? reDealCommission : deCaseValue;
  const leakRate = isRe ? reLeakRate : deLeakRate;

  const monthlyLeaked = Math.round((inquiries * leakRate) / 100);
  const monthlyBleed = monthlyLeaked * singleValue;
  const annualBleed = monthlyBleed * 12;
  const rescuedAnnualClients = Math.max(1, Math.round(monthlyLeaked * 0.22 * 12));
  const recoveredAnnual = rescuedAnnualClients * singleValue;
  const systemAnnualFee = 750 + (299 * 12);
  const roiMultiplier = Math.round(recoveredAnnual / systemAnnualFee);

  // Chart Data for 6-Month Comparison (Bleed vs Rescued)
  const chartData = [
    { month: 'Month 1', lostWithoutBot: monthlyBleed, savedWithBot: Math.round(recoveredAnnual / 12) },
    { month: 'Month 2', lostWithoutBot: monthlyBleed * 2, savedWithBot: Math.round((recoveredAnnual / 12) * 2) },
    { month: 'Month 3', lostWithoutBot: monthlyBleed * 3, savedWithBot: Math.round((recoveredAnnual / 12) * 3) },
    { month: 'Month 4', lostWithoutBot: monthlyBleed * 4, savedWithBot: Math.round((recoveredAnnual / 12) * 4) },
    { month: 'Month 5', lostWithoutBot: monthlyBleed * 5, savedWithBot: Math.round((recoveredAnnual / 12) * 5) },
    { month: 'Month 6', lostWithoutBot: monthlyBleed * 6, savedWithBot: Math.round((recoveredAnnual / 12) * 6) }
  ];

  return (
    <section id="automation" className="py-24 bg-[#0a0c10] text-[#f8f6f1] relative overflow-hidden border-t-2 border-[#b8960c]/30">
      
      {/* Editorial Luxury Ambient Lights */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#b8960c]/15 to-transparent blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Section Heading & Mode Switcher */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b8960c]/10 border border-[#b8960c]/30 text-[#d4af37] text-xs font-serif uppercase tracking-widest">
            <Sparkles size={14} />
            Proprietary Vexo Autonomous Protocol &bull; 60-Second SLA
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-[1.1]">
            Experience Your 60-Second Lead Qualifier & Financial Bleed Engine
          </h2>

          <p className="text-base sm:text-lg text-[#a09a8f] font-light max-w-2xl mx-auto leading-relaxed">
            Test the live concierge below to see how off-hours inquiries get pre-qualified into confirmed walkthroughs within 90 seconds. Adjust the sliders to audit your practice's exact annual cash bleed.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#14171f] border border-[#b8960c]/30 shadow-xl">
            <button
              onClick={() => switchMode("real_estate")}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all ${
                isRe 
                  ? "bg-gradient-to-r from-[#b8960c] to-[#d4af37] text-black font-bold shadow-md shadow-[#b8960c]/20" 
                  : "text-[#a09a8f] hover:text-white"
              }`}
            >
              <Building2 size={16} />
              <span>Real Estate Concierge</span>
            </button>
            <button
              onClick={() => switchMode("dental")}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all ${
                !isRe 
                  ? "bg-gradient-to-r from-teal-400 to-cyan-300 text-black font-bold shadow-md shadow-teal-500/20" 
                  : "text-[#a09a8f] hover:text-white"
              }`}
            >
              <Stethoscope size={16} />
              <span>Dental Clinical Intake</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: LIVE CONCIERGE SIMULATOR & REAL-TIME AUDIT TELEMETRY */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Interactive Chat Box (7 Cols) */}
          <div className="lg:col-span-7 bg-[#12151d] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[580px] relative">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-black font-bold shadow-lg ${
                    isRe ? "bg-gradient-to-tr from-[#b8960c] to-[#d4af37]" : "bg-gradient-to-tr from-teal-400 to-cyan-300"
                  }`}>
                    {isRe ? <Building2 size={20} /> : <Stethoscope size={20} />}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                      {isRe ? "Autonomous Real Estate Concierge" : "Clinical Triage Concierge"}
                    </h3>
                    <p className="text-xs text-[#a09a8f] font-mono">
                      {isRe ? "Direct MLS & Calendar Integration" : "Dentrix / SOE Clinical Management Sync"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#a09a8f] uppercase font-mono block tracking-widest">Live SLA Clock</span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                    {clock.toFixed(1)}s elapsed
                  </span>
                </div>
              </div>

              {/* Chat Message Thread */}
              <div className="py-6 space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {messages.map((m) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                      m.sender === 'user'
                        ? isRe 
                          ? 'bg-[#b8960c] text-black font-medium rounded-tr-none' 
                          : 'bg-teal-400 text-black font-medium rounded-tr-none'
                        : 'bg-[#181d28] border border-white/[0.08] text-[#f8f6f1] rounded-tl-none'
                    }`}>
                      <p>{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-black/10 border-white/5">
                        <span className={`text-[10px] ${m.sender === 'user' ? 'text-black/70' : 'text-[#8a857b]'}`}>
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
                  <div className="flex justify-start">
                    <div className="bg-[#181d28] border border-white/[0.08] px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-[#d4af37] flex items-center gap-2">
                      <Sparkles size={14} className="animate-spin" />
                      <span>{isRe ? "Verifying off-market listing & qualifying financing..." : "Evaluating patient urgency & checking surgery chair..."}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Test Prompt Chips & Input */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#a09a8f]">
                <span>Click a realistic scenario to trigger instant 60s reply:</span>
                <span className="text-[10px] font-mono text-emerald-400">&bull; Zero Human Intervention</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {isRe ? (
                  <>
                    <button
                      onClick={() => handleSendMessage("Interested in the £4.2M penthouse on Mount Street. Have pre-approved funds, want a private walkthrough this Saturday.")}
                      className="text-xs bg-[#181d28] hover:bg-[#202735] text-[#d4af37] border border-[#b8960c]/30 px-3.5 py-2 rounded-xl transition-all text-left"
                    >
                      🏢 &ldquo;Penthouse £4.2M, viewing Saturday&rdquo;
                    </button>
                    <button
                      onClick={() => handleSendMessage("We are family office cash buyers looking for prime off-market estate (£10M+). Send private acquisition dossier.")}
                      className="text-xs bg-[#181d28] hover:bg-[#202735] text-[#d4af37] border border-[#b8960c]/30 px-3.5 py-2 rounded-xl transition-all text-left"
                    >
                      💰 &ldquo;Cash buyer £10M+ off-market dossier&rdquo;
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleSendMessage("Inquiring about full porcelain veneers and smile makeover cost. Available Thursday afternoon for private consult.")}
                      className="text-xs bg-[#181d28] hover:bg-[#202735] text-teal-300 border border-teal-500/30 px-3.5 py-2 rounded-xl transition-all text-left"
                    >
                      ✨ &ldquo;Porcelain veneers consultation Thursday&rdquo;
                    </button>
                    <button
                      onClick={() => handleSendMessage("Severe tooth pain under molar crown since 7 PM. Need emergency private dental appointment tomorrow morning.")}
                      className="text-xs bg-[#181d28] hover:bg-[#202735] text-teal-300 border border-teal-500/30 px-3.5 py-2 rounded-xl transition-all text-left"
                    >
                      🚨 &ldquo;Severe molar pain, emergency slot tomorrow&rdquo;
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isRe ? "Type a buyer inquiry (e.g. 'Can I view the penthouse on Friday?')..." : "Type a patient inquiry (e.g. 'Can I book a consult for implants?')..."}
                  className="flex-1 bg-black/40 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-[#6b665c] focus:outline-none focus:border-[#b8960c] transition-colors font-sans"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping}
                  className={`font-serif uppercase tracking-wider text-xs px-5 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 ${
                    isRe 
                      ? "bg-gradient-to-r from-[#b8960c] to-[#d4af37] text-black shadow-[#b8960c]/20" 
                      : "bg-gradient-to-r from-teal-400 to-cyan-300 text-black shadow-teal-500/20"
                  }`}
                >
                  <Send size={15} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live CRM Telemetry & MIT Benchmark (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#12151d] border border-white/[0.08] rounded-3xl p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                  <Zap size={17} className={isRe ? "text-[#d4af37]" : "text-teal-400"} />
                  <span>Real-Time Intake Telemetry</span>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  stepStatus === 'LOCKED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : stepStatus === 'ANALYZING'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-white/[0.04] text-[#8a857b] border-white/[0.08]'
                }`}>
                  {stepStatus}
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Response Latency:</span>
                  <span className="font-mono text-emerald-400 font-bold">1.3 Seconds (MIT Rule: &lt;60s)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">{isRe ? "Estimated Commission Value:" : "Average Treatment Value:"}</span>
                  <span className="font-serif font-bold text-white text-sm">${singleValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Qualification Check:</span>
                  <span className={`font-medium flex items-center gap-1 ${isRe ? "text-[#d4af37]" : "text-teal-300"}`}>
                    <ShieldCheck size={14} /> Verified High Intent
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#a09a8f]">Calendar Provision:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Calendar size={14} /> {isRe ? "Saturday Walkthrough Reserved" : "Private Surgery Chair Provisioned"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#a09a8f]">Staff Payroll Cost:</span>
                  <span className="text-white font-mono">$0 (100% Autonomous Bot)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#181d28] border border-white/[0.08] text-xs text-[#b0a99c] flex items-start gap-3">
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {isRe 
                    ? "While competing brokerages leave evening form fills unattended until 10 AM, your AI locks pre-approved buyers into confirmed tours within 90 seconds."
                    : "While competing practices let inquiries sit unmonitored overnight, your bot triages emergencies and locks in implant consultations in under 90 seconds."}
                </p>
              </div>
            </div>

            {/* MIT Citation Card */}
            <div className="bg-[#12151d] border border-white/[0.08] rounded-3xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#d4af37] tracking-wide uppercase">
                  MIT / Harvard Speed-to-Lead Study
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">21X MULTIPLIER</span>
              </div>
              <p className="text-xs text-[#a09a8f] leading-relaxed">
                Contacting a prospect within <strong className="text-white">5 minutes vs 30 minutes</strong> delivers a 2,100% higher qualification rate. After 1 hour, over 75% of high-intent clients contact a competitor.
              </p>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: HARD-DOLLAR FINANCIAL BLEED ENGINE & RECHARTS GRAPH */}
        {/* ========================================================================= */}
        <div className="bg-[#12151d] border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
          
          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff8080]">
                <Calculator size={15} />
                Financial Bleed Audit &bull; {isRe ? "Luxury Real Estate" : "Private Dental Practice"}
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
                How Much Revenue Are You Leaking Every Year?
              </h3>
              <p className="text-sm text-[#a09a8f]">
                Every inquiry submitted after 6 PM or on weekends that sits waiting until morning has a 70%+ chance of hiring your competitor.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#3d1818]/60 border border-[#8a3333]/40 text-right min-w-[260px]">
              <span className="text-xs text-[#ff8080] font-mono uppercase block tracking-wider">Gross Annual Bleed</span>
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#ff8080] mt-1 block tracking-tight">
                ${(annualBleed / 1000).toLocaleString()}k <span className="text-xs font-sans text-[#ff8080]/80 font-normal">/ yr</span>
              </span>
              <span className="text-xs text-[#ff8080]/70 block mt-1">
                ${monthlyBleed.toLocaleString()} lost every 30 days
              </span>
            </div>
          </div>

          {/* Interactive Sliders (3 Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#181d28] border border-white/[0.08] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a09a8f] font-medium">Monthly Inbound Leads</span>
                <span className="text-white font-serif font-bold text-base">{inquiries} leads</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="250" 
                step="5"
                value={inquiries}
                onChange={(e) => isRe ? setReInquiries(Number(e.target.value)) : setDeInquiries(Number(e.target.value))}
                className={`w-full h-2 rounded-lg cursor-pointer ${isRe ? "accent-[#d4af37]" : "accent-teal-400"} bg-black/40`}
              />
              <p className="text-[11px] text-[#6b665c]">Total web, portal, and referral inquiries received monthly.</p>
            </div>

            <div className="bg-[#181d28] border border-white/[0.08] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a09a8f] font-medium">{isRe ? "Average Commission / Deal" : "Average Treatment Value"}</span>
                <span className={`font-serif font-bold text-base ${isRe ? "text-[#d4af37]" : "text-teal-300"}`}>${singleValue.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={isRe ? 10000 : 1000} 
                max={isRe ? 100000 : 25000} 
                step={isRe ? 2500 : 500}
                value={singleValue}
                onChange={(e) => isRe ? setReDealCommission(Number(e.target.value)) : setDeCaseValue(Number(e.target.value))}
                className={`w-full h-2 rounded-lg cursor-pointer ${isRe ? "accent-[#d4af37]" : "accent-teal-400"} bg-black/40`}
              />
              <p className="text-[11px] text-[#6b665c]">{isRe ? "Gross commission on residential closing." : "Full-arch implants, Invisalign, smile makeovers."}</p>
            </div>

            <div className="bg-[#181d28] border border-white/[0.08] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a09a8f] font-medium">Off-Hours Leak Rate</span>
                <span className="text-[#ff8080] font-mono font-bold text-base">{leakRate}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={leakRate}
                onChange={(e) => isRe ? setReLeakRate(Number(e.target.value)) : setDeLeakRate(Number(e.target.value))}
                className="w-full accent-[#ff8080] bg-black/40 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#6b665c]">Percent of inquiries arriving 6 PM – 8 AM that wait until morning.</p>
            </div>

          </div>

          {/* 4 Cards Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-[#3d1818]/40 border border-[#8a3333]/30 space-y-1">
              <span className="text-xs text-[#ff8080] font-mono uppercase block font-semibold">1. Single Client Lost</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                ${singleValue.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                Direct revenue lost each time 1 lead goes unanswered.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#3d1818]/40 border border-[#8a3333]/30 space-y-1">
              <span className="text-xs text-[#ff8080] font-mono uppercase block font-semibold">2. Monthly Bleed</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#ff8080] block">
                {monthlyLeaked} clients <span className="text-sm font-sans text-[#a09a8f] font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                ${monthlyBleed.toLocaleString()} leaking to competitors every month.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-mono uppercase block font-semibold">3. Net Revenue Recovered</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 block">
                +${recoveredAnnual.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                Rescuing just {Math.round(rescuedAnnualClients / 12)} clients/mo with &lt;60s AI response.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#b8960c]/10 border border-[#b8960c]/30 space-y-1">
              <span className="text-xs text-[#d4af37] font-mono uppercase block font-semibold">4. System ROI Multiple</span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
                {roiMultiplier}x ROI
              </span>
              <span className="text-[11px] text-[#b0a99c] block mt-1">
                $750 setup + $299/mo pays for itself on day 3.
              </span>
            </div>

          </div>

          {/* Recharts Graphical 6-Month Bleed vs Recovery */}
          <div className="bg-[#181d28] border border-white/[0.08] p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Cumulative 6-Month Cash Bleed vs Recovered Pipeline</h4>
                <p className="text-xs text-[#a09a8f]">Comparing unassisted off-hours loss (Red) against autonomous recovery (Green)</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-red-400"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Cumulative Bleed</span>
                <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Recovered Cash</span>
              </div>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252a36" vertical={false} />
                  <XAxis dataKey="month" stroke="#6b665c" fontSize={11} tickLine={false} />
                  <YAxis stroke="#6b665c" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#12151d", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Amount"]}
                  />
                  <Bar dataKey="lostWithoutBot" fill="#ef4444" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="savedWithBot" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Turnkey Onboarding Guarantee Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#181d28] via-[#202735] to-[#181d28] border border-[#b8960c]/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-serif font-bold text-white">
                Deploy this autonomous engine on your practice within 48 hours
              </h3>
              <p className="text-xs text-[#a09a8f] max-w-xl font-light">
                We handle the complete integration with your CRM, Calendar, WhatsApp, and lead channels. Zero technical lift for your team.
              </p>
            </div>

            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Autonomous%20Speed-to-Lead%20Concierge"
              className={`px-6 py-3.5 font-serif font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-xl ${
                isRe 
                  ? "bg-gradient-to-r from-[#b8960c] to-[#d4af37] text-black shadow-[#b8960c]/20" 
                  : "bg-gradient-to-r from-teal-400 to-cyan-300 text-black shadow-teal-500/20"
              }`}
            >
              <span>Lock Installation Slot</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
