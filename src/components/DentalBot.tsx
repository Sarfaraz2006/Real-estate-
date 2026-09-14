import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Clock, Zap, DollarSign, Calculator, Send, CheckCircle2, 
  AlertTriangle, ArrowRight, ShieldCheck, Sparkles, MessageSquare, 
  TrendingUp, RefreshCw, UserCheck, Calendar, ArrowUpRight, ChevronRight, 
  PhoneCall, HeartPulse, Award
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'patient' | 'clinic';
  text: string;
  time: string;
  badge?: string;
}

export default function DentalBot() {
  const [clinicName, setClinicName] = useState('Harley Street Dental Practice');
  const [cityLocation, setCityLocation] = useState('Central London');

  // Sliders for Practice Financial Leakage
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(75);
  const [avgCaseValue, setAvgCaseValue] = useState<number>(4500); // £4,500 per cosmetic implant / veneer case
  const [offHoursLeakRate, setOffHoursLeakRate] = useState<number>(30); // 30% evening/weekend

  // Simulator State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'clinic',
      text: "Good evening! I am the 24/7 Clinical Intake Concierge for Harley Street Dental Practice. Are you inquiring about cosmetic implants, Invisalign, or do you need an emergency triage slot reserved?",
      time: "Just now",
      badge: "⚡ 1.1s Response"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [triageStatus, setTriageStatus] = useState<'STANDBY' | 'EVALUATING' | 'QUALIFIED' | 'CHAIR_CONFIRMED'>('STANDBY');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || params.get('clinic') || params.get('practice');
    const loc = params.get('location') || params.get('city');
    if (brand) setClinicName(brand);
    if (loc) setCityLocation(loc);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    let interval: any;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const patientMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'patient',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, patientMsg]);
    if (!textToSend) setInputValue('');

    setElapsedSeconds(0);
    setTimerRunning(true);
    setTriageStatus('EVALUATING');
    setIsTyping(true);

    setTimeout(() => {
      setTriageStatus('QUALIFIED');
    }, 700);

    setTimeout(() => {
      setTimerRunning(false);
      setIsTyping(false);
      setTriageStatus('CHAIR_CONFIRMED');

      let reply = `Understood. Our cosmetic smile consultation includes 3D digital oral imaging and sedation options. We have 2 private consultation slots available with the Senior Implantologist this Thursday at 4:30 PM or Friday at 11:00 AM. Would you like me to hold one?`;
      if (query.toLowerCase().includes('emergency') || query.toLowerCase().includes('pain') || query.toLowerCase().includes('broken')) {
        reply = `Triage priority: Urgent. Dr. Mitchell has reserved an emergency assessment slot for tomorrow morning at 10:15 AM. I have sent an SMS confirmation link to lock this chair slot immediately.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'clinic',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: `Booked in 1.4s (Industry Avg: 8 hrs)`
        }
      ]);
    }, 1400);
  };

  // Math: Financial Bleed Engine
  const leakedPatientsMonth = Math.round((monthlyInquiries * offHoursLeakRate) / 100);
  const monthlyBleedDollars = leakedPatientsMonth * avgCaseValue;
  const annualBleedDollars = monthlyBleedDollars * 12;
  const recoveredPatientsYear = Math.max(1, Math.round(leakedPatientsMonth * 0.25 * 12)); // 25% captured
  const annualRecoveredGross = recoveredPatientsYear * avgCaseValue;
  const systemAnnualCost = 750 + (299 * 12); // $4,338
  const practiceROI = Math.round(annualRecoveredGross / systemAnnualCost);

  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] font-sans antialiased relative selection:bg-teal-500/30 selection:text-white pb-20">
      
      {/* Background Teal / Emerald Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-teal-500/10 via-transparent to-transparent blur-[140px]"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px]"></div>
      </div>

      {/* Top Precision Bar */}
      <header className="border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-black font-bold shadow-lg shadow-teal-500/20">
              <Stethoscope size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight text-sm">{clinicName}</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded">
                  Clinical Triage Protocol
                </span>
              </div>
              <p className="text-[11px] text-[#8a8f98] font-mono">High-Ticket Dental Intake &bull; &lt;60s Patient SLA</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/"
              className="text-xs text-[#8a8f98] hover:text-white px-3 py-1.5 rounded-md hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.08]"
            >
              ← Real Estate Website
            </a>
            <a 
              href="/speed-to-lead"
              className="text-xs text-teal-400 hover:text-teal-300 px-3 py-1.5 rounded-md bg-teal-500/10 border border-teal-500/30 transition-all font-medium"
            >
              Switch to Real Estate Bot →
            </a>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12 relative z-10">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono"
          >
            <AlertTriangle size={13} />
            67% of cosmetic dental patients book with whoever replies first after 6 PM
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#f7f8f8] leading-[1.1]"
          >
            Stop Losing £4,500 Implant & Veneer Cases to Evening Delays
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#8a8f98] max-w-2xl mx-auto leading-relaxed"
          >
            When a patient in pain or seeking a smile makeover fills a web form at 8:00 PM, an automated 8-hour delay causes them to call the next clinic on Google. 
            Test how this autonomous concierge triages, qualifies, and locks chair appointments in <strong className="text-white">under 60 seconds</strong>.
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
                    <div className="w-9 h-9 rounded-xl bg-[#191a1b] border border-white/[0.08] flex items-center justify-center text-teal-400">
                      <Stethoscope size={18} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0f1011] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">24/7 Clinical Intake Concierge</h3>
                    <p className="text-xs text-[#8a8f98] font-mono">Syncs with {clinicName} Dentrix/SOE & Calendar</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#8a8f98] uppercase font-mono block">Intake SLA</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-white/[0.03] px-2.5 py-1 rounded border border-white/[0.06]">
                    {elapsedSeconds.toFixed(1)}s elapsed
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="py-5 space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-xl p-3.5 text-sm leading-relaxed ${
                      m.sender === 'patient'
                        ? 'bg-teal-500 text-black font-medium rounded-tr-none'
                        : 'bg-[#191a1b] border border-white/[0.08] text-[#f7f8f8] rounded-tl-none shadow-md'
                    }`}>
                      <p>{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-white/[0.06]">
                        <span className={`text-[10px] ${m.sender === 'patient' ? 'text-black/70' : 'text-[#8a8f98]'}`}>{m.time}</span>
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
                      <Sparkles size={13} className="text-teal-400 animate-spin" />
                      <span>Concierge checking surgery schedule & evaluating clinical triage...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Triggers & Input */}
            <div className="pt-3 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-[11px] text-[#8a8f98]">
                <span>Click a patient scenario to test instant &lt;60s booking:</span>
                <span className="text-[10px] font-mono text-emerald-400">Zero receptionist payroll</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSend("Inquiring about full-arch dental implants and veneers cost. Available Thursday afternoon for private consult.")}
                  className="text-xs bg-[#191a1b] hover:bg-[#28282c] text-[#d0d6e0] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors text-left"
                >
                  ✨ "Porcelain veneers consultation Thursday"
                </button>
                <button
                  onClick={() => handleSend("Severe tooth pain under molar crown since 7 PM. Need emergency dental appointment tomorrow morning.")}
                  className="text-xs bg-[#191a1b] hover:bg-[#28282c] text-[#d0d6e0] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors text-left"
                >
                  🚨 "Severe molar pain, emergency slot tomorrow"
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a patient inquiry (e.g. 'Can I book a consultation for Invisalign?')..."
                  className="flex-1 bg-black/40 border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#62666d] focus:outline-none focus:border-teal-400 transition-colors font-sans"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-black font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-teal-500/20"
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
                  <Zap size={15} className="text-teal-400" />
                  <span>Clinical Intake Live Telemetry</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  triageStatus === 'CHAIR_CONFIRMED' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : triageStatus === 'QUALIFIED' 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                    : 'bg-white/[0.04] text-[#8a8f98] border-white/[0.06]'
                }`}>
                  STATUS: {triageStatus}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Response Latency:</span>
                  <span className="font-mono text-emerald-400 font-semibold">1.4 Seconds (Dental SLA: &lt;60s)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Average Procedure Value:</span>
                  <span className="text-white font-medium">${avgCaseValue.toLocaleString()} / Treatment</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Case Qualification:</span>
                  <span className="text-teal-400 font-medium flex items-center gap-1">
                    <ShieldCheck size={14} /> Cosmetic High-Value Qualified
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#8a8f98]">Practice Chair Booking:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Calendar size={13} /> Private Surgery Slot Reserved
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#8a8f98]">Reception Overtime Cost:</span>
                  <span className="text-white font-mono">$0 (100% Autonomous Bot)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#8a8f98] flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  While competing practices let after-hours website leads sit in an inbox until morning, your bot triages emergencies and books cosmetic consultations in under 90 seconds.
                </p>
              </div>
            </div>

            {/* Benchmark Citation */}
            <div className="bg-[#0f1011] border border-white/[0.08] rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#d0d6e0] uppercase tracking-wider font-semibold">
                  Private Healthcare Speed Benchmark
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">21X RETENTION</span>
              </div>
              <p className="text-xs text-[#8a8f98] leading-relaxed">
                Contacting an inquiring dental patient within <strong className="text-white">5 minutes vs 30 minutes</strong> delivers a 2,100% higher booking confirmation. After 1 hour, patients typically book elsewhere.
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
                Financial Bleed Calculator for {clinicName}
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                How Much Practice Revenue Are You Leaking Each Year?
              </h2>
              <p className="text-xs sm:text-sm text-[#8a8f98] mt-1">
                Every prospective cosmetic patient who reaches out after 6 PM and receives no instant reply has a 67% probability of booking with another clinic.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-right min-w-[240px]">
              <span className="text-xs text-red-300 font-mono uppercase block">Annual Revenue Leakage</span>
              <span className="text-3xl font-bold text-red-400 mt-1 block tracking-tight">
                ${(annualBleedDollars / 1000).toLocaleString()}k <span className="text-xs text-red-300 font-normal">/ yr</span>
              </span>
              <span className="text-[11px] text-red-300/70 block mt-0.5">
                ${monthlyBleedDollars.toLocaleString()} lost every 30 days
              </span>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#191a1b] border border-white/[0.06] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8a8f98]">Monthly Inbound Inquiries</span>
                <span className="text-white font-mono font-bold text-sm">{monthlyInquiries} inquiries</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="250" 
                step="5"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full accent-teal-400 bg-[#08090a] h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#62666d]">Patients contacting via web forms, ads, or email.</p>
            </div>

            <div className="bg-[#191a1b] border border-white/[0.06] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8a8f98]">Average Cosmetic Treatment Value</span>
                <span className="text-teal-400 font-mono font-bold text-sm">${avgCaseValue.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="25000" 
                step="500"
                value={avgCaseValue}
                onChange={(e) => setAvgCaseValue(Number(e.target.value))}
                className="w-full accent-teal-400 bg-[#08090a] h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#62666d]">Implants, full smile makeovers, Invisalign.</p>
            </div>

            <div className="bg-[#191a1b] border border-white/[0.06] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8a8f98]">Off-Hours & Weekend Loss Rate</span>
                <span className="text-red-400 font-mono font-bold text-sm">{offHoursLeakRate}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={offHoursLeakRate}
                onChange={(e) => setOffHoursLeakRate(Number(e.target.value))}
                className="w-full accent-red-400 bg-[#08090a] h-1.5 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#62666d]">Inquiries arriving 6 PM – 8 AM that wait until next day.</p>
            </div>

          </div>

          {/* 4 Cards Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
              <span className="text-[11px] text-red-300 font-mono uppercase block font-semibold">1. Single Patient Lost</span>
              <span className="text-2xl font-bold text-white mt-1 block font-mono">
                ${avgCaseValue.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                Direct revenue lost every time 1 inquiry goes unanswered.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
              <span className="text-[11px] text-red-300 font-mono uppercase block font-semibold">2. Monthly Practice Bleed</span>
              <span className="text-2xl font-bold text-red-400 mt-1 block font-mono">
                {leakedPatientsMonth} patients <span className="text-xs text-[#8a8f98] font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                ${monthlyBleedDollars.toLocaleString()} leaking to competitors each month.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20">
              <span className="text-[11px] text-emerald-400 font-mono uppercase block font-semibold">3. Net Revenue Recovered</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">
                +${annualRecoveredGross.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                Rescuing just {Math.round(recoveredPatientsYear / 12)} patients/mo with &lt;60s AI response.
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30">
              <span className="text-[11px] text-teal-400 font-mono uppercase block font-semibold">4. System Cost vs ROI</span>
              <span className="text-2xl font-black text-white mt-1 block font-mono">
                {practiceROI}x ROI
              </span>
              <span className="text-[11px] text-[#8a8f98] mt-1 block">
                $750 setup + $299/mo pays for itself on patient #1.
              </span>
            </div>

          </div>

          {/* Turnkey Guarantee Banner */}
          <div className="p-6 rounded-2xl bg-[#191a1b] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-semibold text-white">
                Deploy this autonomous triage concierge for {clinicName} in 48 hours
              </h3>
              <p className="text-xs text-[#8a8f98] max-w-xl">
                We handle complete integration with Dentrix, SOE, Google Business, WhatsApp, and web forms. Zero staff training required.
              </p>
            </div>

            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Speed-to-Lead%20Concierge%20for%20Dental%20Clinic"
              className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-teal-500/20"
            >
              <span>Provision Practice Slot</span>
              <ArrowRight size={14} />
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-[#62666d] mt-16">
        <p>Vexo TeamX Autonomous Intelligence • Speed-to-Lead Clinical Protocol • &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}
