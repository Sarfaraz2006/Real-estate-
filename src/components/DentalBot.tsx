import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Clock, Zap, Calculator, Send, CheckCircle2, 
  AlertTriangle, ArrowRight, ShieldCheck, Sparkles, MessageSquare, 
  TrendingUp, Calendar, ArrowUpRight, ChevronRight, PhoneCall, 
  HeartPulse, Award, Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'patient' | 'clinic';
  text: string;
  time: string;
  badge?: string;
}

export default function DentalBot() {
  const [clinicName, setClinicName] = useState('Harley Street Dental Clinic');
  const [locationName, setLocationName] = useState('Central London');

  // Sliders for Practice Bleed
  const [monthlyPatients, setMonthlyPatients] = useState<number>(75);
  const [caseValue, setCaseValue] = useState<number>(4500); // £4,500 cosmetic case
  const [offHoursRate, setOffHoursRate] = useState<number>(30); // 30% leak

  // Simulator state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'clinic',
      text: "Good evening. I am the 24/7 Clinical Intake Concierge for Harley Street Dental Clinic. Are you inquiring about full-arch dental implants, porcelain veneers, or do you require an emergency triage slot reserved?",
      time: 'Just now',
      badge: 'Speed: 1.1s Response'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [elapsedClock, setElapsedClock] = useState<number>(0);
  const [clockRunning, setClockRunning] = useState(false);
  const [triageStatus, setTriageStatus] = useState<'IDLE' | 'TRIAGING' | 'QUALIFIED' | 'CHAIR_LOCKED'>('IDLE');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || params.get('clinic') || params.get('practice');
    const loc = params.get('location') || params.get('city');
    if (brand) setClinicName(brand);
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

    const patientMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'patient',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, patientMsg]);
    if (!presetText) setInputValue('');

    setElapsedClock(0);
    setClockRunning(true);
    setTriageStatus('TRIAGING');
    setIsTyping(true);

    setTimeout(() => {
      setTriageStatus('QUALIFIED');
    }, 600);

    setTimeout(() => {
      setClockRunning(false);
      setIsTyping(false);
      setTriageStatus('CHAIR_LOCKED');

      let reply = `Understood. Our cosmetic makeover protocol includes complete 3D digital oral imaging and bespoke veneer design. We have 2 private consultation slots reserved with the Clinical Director this Thursday at 4:30 PM or Friday at 11:00 AM. Would you like me to hold one?`;
      if (query.toLowerCase().includes('emergency') || query.toLowerCase().includes('pain') || query.toLowerCase().includes('broken')) {
        reply = `Triage Status: Urgent Assessment. Dr. Mitchell has reserved an emergency surgery slot for tomorrow morning at 10:15 AM. A direct confirmation link has been sent to secure your chair reservation immediately.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'clinic',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: 'Confirmed in 1.4s (Industry Avg: 8 hrs)'
        }
      ]);
    }, 1300);
  };

  // Math
  const leakedPatientsMonth = Math.round((monthlyPatients * offHoursRate) / 100);
  const monthlyCashBleed = leakedPatientsMonth * caseValue;
  const annualCashBleed = monthlyCashBleed * 12;
  const rescuedPatientsAnnual = Math.max(1, Math.round(leakedPatientsMonth * 0.25 * 12));
  const recoveredAnnualGross = rescuedPatientsAnnual * caseValue;
  const annualSystemFee = 750 + (299 * 12);
  const clinicROI = Math.round(recoveredAnnualGross / annualSystemFee);

  return (
    <div className="min-h-screen bg-[#071114] text-[#ecfafb] font-sans antialiased selection:bg-teal-500/30 selection:text-[#ecfafb] relative overflow-x-hidden">
      
      {/* Clinical Luxury Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-teal-500/15 via-cyan-500/5 to-transparent blur-[160px]"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-teal-900/20 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-cyan-950/30 blur-[180px] rounded-full"></div>
      </div>

      {/* Top Clinical Header */}
      <nav className="border-b border-teal-500/20 bg-[#071114]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-teal-200 flex items-center justify-center text-[#071114] font-black shadow-lg shadow-teal-500/20">
              <Stethoscope size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-lg text-[#ecfafb] tracking-tight">{clinicName}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-teal-500/10 text-teal-300 border border-teal-500/30 rounded-full">
                  Clinical Intake SLA
                </span>
              </div>
              <p className="text-xs text-[#83a2a9] font-mono">
                Private Cosmetic Dentistry &bull; &lt;60s Patient Engagement Protocol
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/"
              className="text-xs text-[#83a2a9] hover:text-[#ecfafb] px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors border border-transparent hover:border-teal-500/20 font-sans"
            >
              ← Real Estate Website
            </a>
            <a 
              href="/speed-to-lead"
              className="text-xs text-[#071114] bg-gradient-to-r from-teal-400 to-cyan-300 hover:brightness-110 font-semibold px-4 py-2 rounded-full transition-all shadow-md shadow-teal-500/20"
            >
              Switch to Real Estate Demo &rarr;
            </a>
          </div>

        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16 relative z-10 pb-20">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono tracking-wide"
          >
            <AlertTriangle size={14} />
            67% of private implant patients book with whichever clinic replies first after 6 PM
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-sans font-extrabold text-[#ecfafb] tracking-tight leading-[1.08]"
          >
            Stop Losing £4,500 Cosmetic Cases to Next-Day Response Delays
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#9cb9bf] max-w-2xl mx-auto leading-relaxed font-light"
          >
            When a patient with urgent pain or desire for a porcelain smile makeover reaches out at 8 PM, waiting until morning staff arrive costs you the treatment. 
            Test how this autonomous clinical concierge qualifies, triages, and books chair appointments in <strong className="text-teal-300 font-semibold">under 60 seconds</strong>.
          </motion.p>
        </div>

        {/* DUAL SIMULATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Clinical Chat Simulator (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0c1a1e]/90 backdrop-blur-2xl border border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[580px] relative overflow-hidden">
            
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-teal-500/15">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-[#112429] border border-teal-500/40 flex items-center justify-center text-teal-400">
                      <Stethoscope size={20} />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0c1a1e] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#ecfafb] tracking-wide">24/7 Clinical Triage Concierge</h3>
                    <p className="text-xs text-[#83a2a9] font-mono">Direct sync with {clinicName} Dentrix/SOE</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#83a2a9] uppercase font-mono block tracking-widest">Intake SLA</span>
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
                    className={`flex ${m.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                      m.sender === 'patient'
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-300 text-[#071114] font-medium rounded-tr-none'
                        : 'bg-[#112429] border border-teal-500/20 text-[#ecfafb] rounded-tl-none'
                    }`}>
                      <p>{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-black/10 border-white/5">
                        <span className={`text-[10px] ${m.sender === 'patient' ? 'text-[#0c2b33]' : 'text-[#6d8a91]'}`}>
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
                    <div className="bg-[#112429] border border-teal-500/30 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-teal-300 flex items-center gap-2">
                      <Sparkles size={14} className="animate-spin text-teal-400" />
                      <span>Concierge checking surgery availability & evaluating clinical urgency...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Quick Realistic Clinical Scenarios */}
            <div className="pt-4 border-t border-teal-500/15 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#83a2a9]">
                <span>Click a realistic inquiry to test immediate 60s patient triage:</span>
                <span className="text-[10px] font-mono text-emerald-400">&bull; Zero Receptionist Overtime</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSend("Inquiring about full porcelain veneers and smile makeover cost. Available Thursday afternoon for private consultation.")}
                  className="text-xs bg-[#112429] hover:bg-[#19333a] text-teal-200 border border-teal-500/25 hover:border-teal-400 px-3.5 py-2 rounded-xl transition-all text-left"
                >
                  ✨ &ldquo;Porcelain veneers consultation Thursday&rdquo;
                </button>
                <button
                  onClick={() => handleSend("Severe tooth pain under molar crown since this evening. Need emergency private dental appointment tomorrow morning.")}
                  className="text-xs bg-[#112429] hover:bg-[#19333a] text-teal-200 border border-teal-500/25 hover:border-teal-400 px-3.5 py-2 rounded-xl transition-all text-left"
                >
                  🚨 &ldquo;Severe molar pain, emergency slot tomorrow&rdquo;
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a patient inquiry (e.g. 'Can I book a consultation for dental implants?')..."
                  className="flex-1 bg-black/40 border border-teal-500/25 rounded-xl px-4 py-3 text-sm text-[#ecfafb] placeholder-[#537077] focus:outline-none focus:border-teal-400 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping}
                  className="bg-gradient-to-r from-teal-400 to-cyan-300 hover:brightness-110 disabled:opacity-50 text-[#071114] font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20"
                >
                  <Send size={15} />
                  <span className="text-xs uppercase tracking-wider">Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Audit Telemetry & Evidence (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0c1a1e]/90 backdrop-blur-2xl border border-teal-500/30 rounded-3xl p-7 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3.5 border-b border-teal-500/15">
                <div className="flex items-center gap-2 text-[#ecfafb] font-bold text-base">
                  <Zap size={17} className="text-teal-400" />
                  <span>Real-Time Practice Intake Telemetry</span>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  triageStatus === 'CHAIR_LOCKED'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : triageStatus === 'QUALIFIED'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-white/[0.04] text-[#6d8a91] border-white/[0.08]'
                }`}>
                  {triageStatus}
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#83a2a9]">Response Latency:</span>
                  <span className="font-mono text-emerald-400 font-bold">1.4 Seconds (Healthcare SLA: &lt;60s)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#83a2a9]">Treatment Case Value:</span>
                  <span className="font-medium text-[#ecfafb] text-sm">${caseValue.toLocaleString()} / Patient</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#83a2a9]">Clinical Triage Check:</span>
                  <span className="text-teal-300 font-medium flex items-center gap-1">
                    <ShieldCheck size={14} /> High-Ticket Qualified
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#83a2a9]">Surgery Chair Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Calendar size={14} /> Consultation Chair Provisioned
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[#83a2a9]">Receptionist Overtime:</span>
                  <span className="text-[#ecfafb] font-mono">$0 (100% Autonomous)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#112429] border border-teal-500/20 text-xs text-[#9cb9bf] flex items-start gap-3">
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  While competing clinics leave evening inquiries in an unmonitored inbox until morning, your bot triages emergencies and locks in implant consultations in under 90 seconds.
                </p>
              </div>
            </div>

            {/* Benchmark Citation */}
            <div className="bg-[#0c1a1e]/90 backdrop-blur-2xl border border-teal-500/30 rounded-3xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-400 tracking-wide uppercase">
                  Private Healthcare Speed Benchmark
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">21X RETENTION</span>
              </div>
              <p className="text-xs text-[#83a2a9] leading-relaxed">
                Contacting a cosmetic patient within <strong className="text-[#ecfafb]">5 minutes vs 30 minutes</strong> increases appointment confirmation odds by 2,100%. After 1 hour, over 70% have scheduled elsewhere.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 2: HARD-DOLLAR FINANCIAL LEAKAGE ENGINE */}
        <div className="bg-[#0c1a1e]/90 backdrop-blur-2xl border border-teal-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-teal-500/15 pb-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff8080]">
                <Calculator size={15} />
                Financial Bleed Audit for {clinicName}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecfafb] tracking-tight">
                How Much Practice Revenue Are You Leaking Each Year?
              </h2>
              <p className="text-sm text-[#83a2a9]">
                Every inquiry submitted after 6 PM or on weekends that sits waiting until morning has a 67%+ probability of calling another clinic.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#3d1818]/60 border border-[#8a3333]/40 text-right min-w-[260px]">
              <span className="text-xs text-[#ff8080] font-mono uppercase block tracking-wider">Gross Annual Bleed</span>
              <span className="text-3xl sm:text-4xl font-bold text-[#ff8080] mt-1 block tracking-tight">
                ${(annualCashBleed / 1000).toLocaleString()}k <span className="text-xs font-sans text-[#ff8080]/80 font-normal">/ yr</span>
              </span>
              <span className="text-xs text-[#ff8080]/70 block mt-1">
                ${monthlyCashBleed.toLocaleString()} lost every 30 days
              </span>
            </div>
          </div>

          {/* Sliders (3 Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#112429] border border-teal-500/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#83a2a9] font-medium">Monthly Inbound Inquiries</span>
                <span className="text-[#ecfafb] font-bold text-base">{monthlyPatients} inquiries</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="250" 
                step="5"
                value={monthlyPatients}
                onChange={(e) => setMonthlyPatients(Number(e.target.value))}
                className="w-full accent-teal-400 bg-[#071114] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#537077]">Patients reaching out via web forms, Google Business, or ads.</p>
            </div>

            <div className="bg-[#112429] border border-teal-500/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#83a2a9] font-medium">Average Cosmetic Case Value</span>
                <span className="text-teal-300 font-bold text-base">${caseValue.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="25000" 
                step="500"
                value={caseValue}
                onChange={(e) => setCaseValue(Number(e.target.value))}
                className="w-full accent-teal-400 bg-[#071114] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#537077]">Full-arch implants, porcelain veneers, Invisalign.</p>
            </div>

            <div className="bg-[#112429] border border-teal-500/20 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#83a2a9] font-medium">Off-Hours Leak Rate</span>
                <span className="text-[#ff8080] font-mono font-bold text-base">{offHoursRate}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={offHoursRate}
                onChange={(e) => setOffHoursRate(Number(e.target.value))}
                className="w-full accent-[#ff8080] bg-[#071114] h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-[#537077]">Percent of inquiries arriving 6 PM – 8 AM that wait until morning.</p>
            </div>

          </div>

          {/* 4 Cards Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-5 rounded-2xl bg-[#3d1818]/40 border border-[#8a3333]/30 space-y-1">
              <span className="text-xs text-[#ff8080] font-mono uppercase block font-semibold">1. Single Patient Lost</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#ecfafb] block">
                ${caseValue.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#9cb9bf] block mt-1">
                Direct revenue lost every time 1 inquiry goes unanswered.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#3d1818]/40 border border-[#8a3333]/30 space-y-1">
              <span className="text-xs text-[#ff8080] font-mono uppercase block font-semibold">2. Monthly Bleed</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#ff8080] block">
                {leakedPatientsMonth} patients <span className="text-sm font-sans text-[#83a2a9] font-normal">/ mo</span>
              </span>
              <span className="text-[11px] text-[#9cb9bf] block mt-1">
                ${monthlyCashBleed.toLocaleString()} leaking to competing clinics every 30 days.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-mono uppercase block font-semibold">3. Net Recovered Revenue</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block">
                +${recoveredAnnualGross.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#9cb9bf] block mt-1">
                Rescuing just {Math.round(rescuedPatientsAnnual / 12)} patients/mo with &lt;60s AI concierge.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-1">
              <span className="text-xs text-teal-300 font-mono uppercase block font-semibold">4. Practice ROI Multiple</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#ecfafb] block">
                {clinicROI}x ROI
              </span>
              <span className="text-[11px] text-[#9cb9bf] block mt-1">
                $750 setup + $299/mo pays for itself on patient #1.
              </span>
            </div>

          </div>

          {/* Turnkey Onboarding Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#112429] via-[#162e35] to-[#112429] border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#ecfafb]">
                Deploy this autonomous triage concierge for {clinicName} in 48 hours
              </h3>
              <p className="text-xs text-[#83a2a9] max-w-xl font-light">
                We handle complete integration with Dentrix, SOE, Google Business, WhatsApp, and web forms. Zero staff training required.
              </p>
            </div>

            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Autonomous%20Dental%20Concierge"
              className="px-6 py-3.5 bg-gradient-to-r from-teal-400 to-cyan-300 hover:brightness-110 text-[#071114] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-xl shadow-teal-500/20"
            >
              <span>Provision Practice Slot</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-teal-500/15 py-8 text-center text-xs text-[#537077] mt-20">
        <p>Vexo TeamX Autonomous Intelligence &bull; Private Healthcare Protocol &bull; &copy; {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
}
