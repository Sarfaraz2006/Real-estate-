import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Clock, Zap, DollarSign, Calculator, Send, CheckCircle2, 
  AlertTriangle, ArrowRight, ShieldCheck, Sparkles, MessageSquare, 
  Building2, TrendingUp, RefreshCw, UserCheck, Calendar, ArrowUpRight, 
  ChevronRight, PhoneCall, ExternalLink, HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  badge?: string;
}

export default function RealEstateBot() {
  const [agencyName, setAgencyName] = useState('Mayfair Luxury Estates');
  const [marketCity, setMarketCity] = useState('Central London');

  // Sliders for Financial Bleed Engine
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(50);
  const [avgCommission, setAvgCommission] = useState<number>(38000); // £38,000 average deal
  const [offHoursPercent, setOffHoursPercent] = useState<number>(35); // 35% evening/weekend

  // Simulator state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Welcome to Mayfair Luxury Estates. I am your 24/7 VIP Concierge. Which off-market residence or budget specification would you like me to pull private access specs for?",
      time: "Just now",
      badge: "⚡ 1.2s Response"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [clockElapsed, setClockElapsed] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'IDLE' | 'ANALYZING' | 'QUALIFIED' | 'CALENDAR_LOCKED'>('IDLE');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || params.get('agency') || params.get('company');
    const loc = params.get('location') || params.get('city');
    if (brand) setAgencyName(brand);
    if (loc) setMarketCity(loc);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Live Timer
  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setClockElapsed((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    setClockElapsed(0);
    setTimerActive(true);
    setLeadStatus('ANALYZING');
    setIsTyping(true);

    setTimeout(() => {
      setLeadStatus('QUALIFIED');
    }, 700);

    setTimeout(() => {
      setTimerActive(false);
      setIsTyping(false);
      setLeadStatus('CALENDAR_LOCKED');

      let reply = `Confirmed. Both luxury residences in that bracket include private elevator access and 24h security. Are you purchasing as an investment or primary estate, and are funds pre-cleared for a 30-day closing?`;
      if (query.toLowerCase().includes('cash') || query.toLowerCase().includes('penthouse') || query.toLowerCase().includes('saturday')) {
        reply = `Private walkthrough provisionally locked for Saturday at 11:30 AM with the Senior Managing Director. I have dispatched NDA credentials and gate access to your email.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: `Locked in 1.4s (MIT Rule: <60s)`
        }
      ]);
    }, 1400);
  };

  // Financial Bleed Calculations
  const leakedLeadsMonth = Math.round((monthlyInquiries * offHoursPercent) / 100);
  const monthlyCashBleed = leakedLeadsMonth * avgCommission;
  const annualCashBleed = monthlyCashBleed * 12;
  const rescuedLeadsPerYear = Math.max(1, Math.round(leakedLeadsMonth * 0.20 * 12)); // 20% close rate
  const annualRecoveredRevenue = rescuedLeadsPerYear * avgCommission;
  const annualSystemCost = 750 + (299 * 12); // $4,338
  const roiMultiple = Math.round(annualRecoveredRevenue / annualSystemCost);

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] font-sans antialiased relative selection:bg-[#5e6ad2]/30 selection:text-white pb-20">
      
      {/* Background Subtle Linear Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#5e6ad2]/10 via-transparent to-transparent blur-[140px]"></div>
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-emerald-500/5 blur-[160px]"></div>
      </div>

      {/* Top Precision Bar */}
      <header className="border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center text-white shadow-lg shadow-[#5e6ad2]/20">
              <Building2 size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight text-sm">{agencyName}</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.04] text-[#d0d6e0] border border-white/[0.08] rounded">
                  Autonomous Protocol
                </span>
              </div>
              <p className="text-[11px] text-[#8a8f98] font-mono">Real Estate Speed-to-Lead Engine • &lt;60s SLA</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/"
              className="text-xs text-[#8a8f98] hover:text-white px-3 py-1.5 rounded-md hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.08]"
            >
              ← Back to Main Website
            </a>
            <a 
              href="/dental"
              className="text-xs text-[#7170ff] hover:text-[#828fff] px-3 py-1.5 rounded-md bg-[#5e6ad2]/10 border border-[#5e6ad2]/30 transition-all font-medium"
            >
              Switch to Dental Demo →
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12 relative z-10">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono"
          >
            <AlertTriangle size={13} />
            78% of luxury buyers tour with the first brokerage that responds
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#f7f8f8] leading-[1.1]"
          >
            Never Lose a High-Net-Worth Listing Inquiry to Off-Hours Delay
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#8a8f98] max-w-2xl mx-auto leading-relaxed"
          >
            When a buyer browses a £4M penthouse at 9:30 PM, waiting until morning leaks the commission to a competitor. 
            Test how this autonomous concierge engages, qualifies financing, and locks calendar walkthroughs in <strong className="text-white">under 60 seconds</strong>.
          </motion.p>
        </div>

        {/* Dual Grid: Live Simulator + Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Simulator Terminal (7 cols) */}
          <div className="lg:col-span-7 bg-[#0f1011] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[560px]">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-[#191a1b] border border-white/[0.08] flex items-center justify-center text-[#7170ff]">
                      <Bot size={18} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0f1011] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Autonomous Brokerage Concierge</h3>
                    <p className="text-xs text-[#8a8f98] font-mono">Syncs with {agencyName} Calendar & MLS</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#8a8f98] uppercase font-mono block">Response Time</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-white/[0.03] px-2.5 py-1 rounded border border-white/[0.06]">
                    {clockElapsed.toFixed(1)}s elapsed
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="py-5 space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-xl p-3.5 text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#5e6ad2] text-white font-medium rounded-tr-none'
                        : 'bg-[#191a1b] border border-white/[0.08] text-[#f7f8f8] rounded-tl-none shadow-md'
                    }`}>
                      <p>{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-white/[0.06]">
                        <span className="text-[10px] text-[#8a8f98]">{m.time}</span>
                        {m.badge && (
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                            <Zap size={10} /> {m.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#191a1b] border border-white/[0.08] px-3.5 py-2 rounded-xl rounded-tl-none text-xs text-[#8a8f98] flex items-center gap-2">
                      <Sparkles size={13} className="text-[#7170ff] animate-spin" />
                      <span>Concierge verifying listing sheet & qualifying financing...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Triggers & Input */}
            <div className="pt-3 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-[11px] text-[#8a8f98]">
                <span>Click a realistic scenario to test instant &lt;60s qualification:</span>
                <span className="text-[10px] font-mono text-emerald-400">Zero human triage</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSend("Interested in the £3.5M Mayfair penthouse. Pre-approved cash buyer, want a private viewing this Saturday.")}
                  className="text-xs bg-[#191a1b] hover:bg-[#28282c] text-[#d0d6e0] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors text-left"
                >
                  🏢 "Penthouse £3.5M, viewing Saturday"
                </button>
                <button
                  onClick={() => handleSend("Inquiring about off-market luxury estates in London, budget £10M+. Send walkthrough catalog.")}
                  className="text-xs bg-[#191a1b] hover:bg-[#28282c] text-[#d0d6e0] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors text-left"
                >
                  💰 "Cash buyer £10M+ off-market inquiry"
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a buyer inquiry (e.g. 'Can I view the penthouse on Friday?')..."
                  className="flex-1 bg-black/40 border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#62666d] focus:outline-none focus:border-[#5e6ad2] transition-colors font-sans"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="bg-[#5e6ad2] hover:bg-[#7170ff] disabled:opacity-50 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-[#5e6ad2]/20"
                >
                  <Send size={14} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Telemetry Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-[#0f1011] border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <Zap size={15} className="text-[#7170ff]" />
                  <span>Broker CRM Live Telemetry</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  leadStatus === 'CALENDAR_LOCKED' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : leadStatus === 'QUALIFIED' 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                    : 'bg-white/[0.04] text-[#8a8f98] border-white/[0.06]'
                }`}>
                  STATUS: {leadStatus}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Response Latency:</span>
                  <span className="font-mono text-emerald-400 font-semibold">1.4 Seconds (MIT standard: &lt;60s)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Case Value / Commission:</span>
                  <span className="text-white font-medium">${avgCommission.toLocaleString()} Commission</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Financing Pre-Screen:</span>
                  <span className="text-[#7170ff] font-medium flex items-center gap-1">
                    <ShieldCheck size={14} /> High-Intent Pre-Cleared
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Calendar Appointment:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Calendar size={13} /> Saturday Walkthrough Reserved
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#8a8f98]">Broker Manual Work:</span>
                  <span className="text-white font-mono">$0 Payroll (Fully Autonomous)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#8a8f98] flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  While competing brokerages leave evening form fills unattended until 10 AM, your AI locks pre-approved buyers into confirmed tours within 90 seconds.
                </p>
              </div>
            </div>

            {/* MIT Citation */}
            <div className="bg-[#0f1011] border border-white/[0.08] rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#d0d6e0] uppercase tracking-wider font-semibold">
                  MIT / Harvard Speed-to-Lead Study
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">21X ADVANTAGE</span>
              </div>
              <p className="text-xs text-[#8a8f98] leading-relaxed">
                Contacting an inbound lead within <strong className="text-white">5 minutes vs 30 minutes</strong> increases qualification likelihood by 2,100%. After 1 hour, conversion likelihood plummets by 80%.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 2: HARD DOLLAR FINANCIAL LOSS ENGINE */}
        <div className="bg-[#0f1011] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.06] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 mb-1.5">
                <Calculator size={14} />
                Financial Leakage Calculator for {agencyName}
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                How Much Commission Are You Leaking Each Year?
              </h2>
              <p className="text-xs sm:text-sm text-[#8a8f98] mt-1">
                Every buyer inquiry that arrives after 6 PM or on weekends and sits unanswered has a 70%+ chance of touring with a competing brokerage.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-right min-w-[240px]">
              <span className="text-xs text-red-300 font-mono uppercase block">Annual Cash Bleed</span>
              <span className="text-3xl font-bold text-red-400 mt-1 block tracking-tight">
                ${(annualCashBleed / 1000).toLocaleString()}k <span className="text-xs text-red-300 font-normal">/ yr</span>
              </span>
              <span className="text-[11px] text-red-300/70 block mt-0.5">
                ${monthlyCashBleed.toLocaleString()} lost every 30 days
              </span>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#191a1b] border border-white/[0.06] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8a8f98]">Monthly Inbound Inquiries</span>
                <span className="text-white font-mono font-bold text-sm">{monthlyInquiries} leads</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="200" 
                step="5"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full accent-[#5e6ad2] bg-[#08090a] h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#62666d]">Total web, portal, and email leads received monthly.</p>
            </div>

            <div className="bg-[#191a1b] border border-white/[0.06] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8a8f98]">Average Commission / Closing</span>
                <span className="text-[#7170ff] font-mono font-bold text-sm">${avgCommission.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="100000" 
                step="2500"
                value={avgCommission}
                onChange={(e) => setAvgCommission(Number(e.target.value))}
                className="w-full accent-[#7170ff] bg-[#08090a] h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#62666d]">Gross brokerage commission on a typical closing.</p>
            </div>

            <div className="bg-[#191a1b] border border-white/[0.06] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8a8f98]">Off-Hours & Weekend Loss Rate</span>
                <span className="text-red-400 font-mono font-bold text-sm">{offHoursPercent}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={offHoursPercent}
                onChange={(e) => setOffHoursPercent(Number(e.target.value))}
                className="w-full accent-red-400 bg-[#08090a] h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#62666d]">Percent of leads arriving after 6 PM or weekends.</p>
            </div>

          </div>

          {/* 4 Cards Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
              <span className="text-[11px] text-red-300 font-mono uppercase block font-semibold">1. Single Client Lost</span>
              <span className="text-2xl font-bold text-white mt-1 block font-mono">
                ${avgCommission.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                Direct commission lost each time 1 buyer goes unanswered.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
              <span className="text-[11px] text-red-300 font-mono uppercase block font-semibold">2. Monthly Leakage</span>
              <span className="text-2xl font-bold text-red-400 mt-1 block font-mono">
                {leakedLeadsMonth} buyers <span className="text-xs text-[#8a8f98] font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                ${monthlyCashBleed.toLocaleString()} leaking to competitors every month.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20">
              <span className="text-[11px] text-emerald-400 font-mono uppercase block font-semibold">3. Recovered Revenue</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">
                +${annualRecoveredRevenue.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                Conservatively rescuing just {Math.round(rescuedLeadsPerYear / 12)} deals/mo with &lt;60s AI response.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#5e6ad2]/10 border border-[#5e6ad2]/30">
              <span className="text-[11px] text-[#7170ff] font-mono uppercase block font-semibold">4. System Cost vs ROI</span>
              <span className="text-2xl font-black text-white mt-1 block font-mono">
                {roiMultiple}x ROI
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                $750 setup + $299/mo pays for itself on deal #1.
              </span>
            </div>

          </div>

          {/* Turnkey Guarantee Banner */}
          <div className="p-6 rounded-2xl bg-[#191a1b] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-semibold text-white">
                Deploy this autonomous concierge for {agencyName} in 48 hours
              </h3>
              <p className="text-xs text-[#8a8f98] max-w-xl">
                We handle the complete integration with your MLS, CRM, WhatsApp, and email channels. Zero technical lift for your brokerage.
              </p>
            </div>

            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Speed-to-Lead%20Concierge%20for%20Real%20Estate"
              className="px-5 py-3 bg-[#5e6ad2] hover:bg-[#7170ff] text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-[#5e6ad2]/20"
            >
              <span>Provision Brokerage Slot</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-[#62666d] mt-16">
        <p>Vexo TeamX Autonomous Intelligence • Speed-to-Lead Protocol • &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}
