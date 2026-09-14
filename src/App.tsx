import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Clock, Zap, DollarSign, Calculator, Send, CheckCircle2, 
  AlertTriangle, ArrowRight, ShieldCheck, Sparkles, MessageSquare, 
  Building2, TrendingUp, RefreshCw, UserCheck, Calendar
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  badge?: string;
}

export default function App() {
  // Query param parsing for personalized branding
  const [agencyName, setAgencyName] = useState('Your Agency');
  const [marketLocation, setMarketLocation] = useState('Prime Real Estate');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || params.get('agency') || params.get('company');
    const loc = params.get('location') || params.get('market');
    if (brand) setAgencyName(brand);
    if (loc) setMarketLocation(loc);
  }, []);

  // Simulator State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hello! I'm the Autonomous Concierge for ${agencyName}. I see you're looking at our off-market inventory. Which property or price bracket can I pull details for?`,
      time: 'Just now',
      badge: 'Speed: <4s'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [timerActive, setTimerActive] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'IDLE' | 'PARSING' | 'QUALIFYING' | 'LOCKED'>('IDLE');
  const [qualificationData, setQualificationData] = useState({
    budget: '$1.5M - $3.0M',
    financing: 'Pre-Approved / Cash',
    timeline: 'Immediate (<30 Days)',
    status: 'High Intent Lead'
  });

  // ROI Calculator State
  const [monthlyLeads, setMonthlyLeads] = useState(60);
  const [avgCommission, setAvgCommission] = useState(35000);
  const [currentLossRate, setCurrentLossRate] = useState(35); // 35% leak off-hours

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Stopwatch effect
  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setResponseTime((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleSendMessage = (customText?: string) => {
    const text = customText || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputValue('');

    // Trigger AI response simulation with stopwatch
    setResponseTime(0);
    setTimerActive(true);
    setLeadStatus('PARSING');
    setIsTyping(true);

    setTimeout(() => {
      setLeadStatus('QUALIFYING');
    }, 800);

    setTimeout(() => {
      setTimerActive(false);
      setIsTyping(false);
      setLeadStatus('LOCKED');

      let reply = `Thank you! I have cross-matched 2 active listings matching that spec. Both sellers are accepting private walkthroughs this Thursday or Saturday. Are you purchasing with pre-approved financing or liquid cash?`;
      if (text.toLowerCase().includes('cash') || text.toLowerCase().includes('approved') || text.toLowerCase().includes('ready')) {
        reply = `Excellent. I've provisionally reserved a VIP private walkthrough slot for Saturday at 11:30 AM with the listing director. I just dispatched the NDA and access sheet to your details.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          badge: `Locked in 1.4s (MIT Benchmark: <60s)`
        }
      ]);
    }, 1400);
  };

  // Financial calculations
  const lostLeadsPerMonth = Math.round((monthlyLeads * currentLossRate) / 100);
  const recoveredDealsPerYear = Math.max(1, Math.round(lostLeadsPerMonth * 0.15 * 12));
  const recoveredAnnualRevenue = recoveredDealsPerYear * avgCommission;
  const conciergeCostAnnual = 750 + (299 * 12); // $4,338
  const netROI = Math.round(((recoveredAnnualRevenue - conciergeCostAnnual) / conciergeCostAnnual) * 100);

  return (
    <div className="min-h-screen bg-[#0A0D12] text-slate-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Banner */}
      <header className="border-b border-slate-800 bg-[#0E131B]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-amber-500/20">
              <Bot size={22} className="text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-lg">{agencyName}</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                  Custom AI Sandbox
                </span>
              </div>
              <p className="text-xs text-slate-400">Autonomous Speed-to-Lead & Qualification Engine • Target: &lt;60s Response</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-300">Off-Hours AI Concierge Active</span>
            </div>
            <div className="text-xs text-slate-400">
              Server Latency: <span className="text-emerald-400 font-mono">180ms</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid: Interactive Experience */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Value Proposition Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            <AlertTriangle size={14} />
            78% of luxury real estate buyers tour with the first broker who responds
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Test Your 60-Second Lead Qualifier in Real-Time
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            In prime markets, high-net-worth inquiries submitted between 6 PM and 8 AM get lost to competitors by morning. 
            See how your autonomous concierge qualifies financing, filters tire-kickers, and schedules walkthroughs instantly.
          </p>
        </div>

        {/* Dual Column: Bot Live Simulator vs Real-Time Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Live Phone Simulator (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111622] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-amber-500/30 flex items-center justify-center">
                      <Bot size={20} className="text-amber-400" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#111622] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Autonomous Real Estate Concierge</h3>
                    <p className="text-xs text-slate-400">Directly integrated with {agencyName} Calendar & Listings</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-xs font-mono bg-slate-900 border border-slate-700 px-2 py-1 rounded text-amber-300">
                    Response Clock: {responseTime.toFixed(1)}s
                  </span>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="py-4 space-y-4 max-h-[380px] overflow-y-auto pr-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      m.sender === 'user' 
                        ? 'bg-amber-500 text-black font-medium rounded-tr-none' 
                        : 'bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-tl-none shadow-md'
                    }`}>
                      <p>{m.text}</p>
                      <div className="flex items-center justify-between gap-4 mt-1">
                        <span className={`text-[10px] ${m.sender === 'user' ? 'text-black/70' : 'text-slate-400'}`}>
                          {m.time}
                        </span>
                        {m.badge && (
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                            {m.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-400 animate-spin" />
                      Concierge is cross-matching listings & qualifying...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Quick Prompt Presets & Input Bar */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs text-slate-400 font-medium">Click a luxury scenario to trigger the 60s bot:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSendMessage("Looking for a 4-bedroom penthouse under $4M. Ready with pre-approval, want a private viewing this Saturday.")}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors text-left"
                >
                  🏢 "Penthouse under $4M, viewing Saturday"
                </button>
                <button
                  onClick={() => handleSendMessage("Hi, inquiring about the waterfront estate on your listing sheet. Cash buyer, need contract details.")}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors text-left"
                >
                  💰 "Cash buyer waterfront inquiry"
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a buyer inquiry (e.g. 'Can I see the Mayfair flat today?')..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Send size={16} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Real-Time Telemetry & Lead Qualification Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Inspection Terminal */}
            <div className="bg-[#111622] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Zap size={16} className="text-amber-400" />
                  <span>Broker CRM Live Telemetry</span>
                </div>
                <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded border ${
                  leadStatus === 'LOCKED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  leadStatus === 'QUALIFYING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  Status: {leadStatus}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Response Speed:</span>
                  <span className="font-mono text-emerald-400 font-bold">1.4 Seconds (MIT standard: &lt;60s)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Estimated Budget Qualified:</span>
                  <span className="font-medium text-white">{qualificationData.budget}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Financing Verification:</span>
                  <span className="font-medium text-amber-400 flex items-center gap-1">
                    <ShieldCheck size={14} /> {qualificationData.financing}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Calendar Sync:</span>
                  <span className="text-white flex items-center gap-1">
                    <Calendar size={13} className="text-emerald-400" /> Saturday Walkthrough Provisioned
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Action Required by Agent:</span>
                  <span className="text-emerald-400 font-medium">None (Walkthrough auto-booked)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  Zero manual triage needed. The concierge answers at 2 AM or Sunday lunch, collects proof of liquidity, and delivers a pre-sold buyer to your calendar.
                </p>
              </div>
            </div>

            {/* Benchmarks Badge */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">The 5-Minute Lead Rule (Harvard / MIT)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contacting a buyer within 5 minutes vs 30 minutes gives a <strong className="text-white">21x qualification probability</strong>. After 1 hour, conversion drops by over 80%.
              </p>
            </div>

          </div>
        </div>

        {/* SECTION 2: Hard Dollar Financial Loss Calculator */}
        <div className="bg-[#111622] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Calculator size={16} />
                Financial Leakage Audit for {agencyName}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                How Much Commission Are You Leaving on the Table Each Year?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Adjust the sliders below to match your agency's actual numbers.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-right">
              <span className="text-xs text-amber-400 block font-medium">Net Estimated Annual Recovery</span>
              <span className="text-2xl font-black text-amber-300">${recoveredAnnualRevenue.toLocaleString()}</span>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Slider 1: Monthly Inbound Leads */}
            <div className="space-y-3 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Monthly Inbound Inquiries</span>
                <span className="text-white font-bold font-mono text-sm">{monthlyLeads} leads/mo</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="250" 
                step="5"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Total website, portal, and email inquiries received.</p>
            </div>

            {/* Slider 2: Average Commission Per Closed Deal */}
            <div className="space-y-3 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Average Commission / Deal</span>
                <span className="text-amber-400 font-bold font-mono text-sm">${avgCommission.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="150000" 
                step="2500"
                value={avgCommission}
                onChange={(e) => setAvgCommission(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Gross commission on typical listing or sales closing.</p>
            </div>

            {/* Slider 3: Off-Hours / Weekend Leak Rate */}
            <div className="space-y-3 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Off-Hours Leakage Rate</span>
                <span className="text-red-400 font-bold font-mono text-sm">{currentLossRate}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="5"
                value={currentLossRate}
                onChange={(e) => setCurrentLossRate(Number(e.target.value))}
                className="w-full accent-red-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Leads that inquire after 6 PM or weekends and go cold.</p>
            </div>
          </div>

          {/* Hard Numbers Comparison Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <span className="text-xs text-red-400 block font-medium">Monthly Leaked Leads</span>
              <span className="text-2xl font-bold text-white mt-1 block font-mono">{lostLeadsPerMonth} leads</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Inquiries that went to competitors</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block font-medium">Annual Deals Recovered</span>
              <span className="text-2xl font-bold text-emerald-400 mt-1 block font-mono">+{recoveredDealsPerYear} closed deals</span>
              <span className="text-[11px] text-slate-400 mt-1 block">At conservative 15% close rate</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block font-medium">Autonomous Concierge Cost</span>
              <span className="text-2xl font-bold text-slate-300 mt-1 block font-mono">$750 <span className="text-xs font-normal text-slate-400">setup + $299/mo</span></span>
              <span className="text-[11px] text-slate-400 mt-1 block">Turnkey install in under 48 hours</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <span className="text-xs text-amber-400 block font-medium">Net Agency ROI Multiple</span>
              <span className="text-2xl font-black text-amber-300 mt-1 block font-mono">{Math.round(recoveredAnnualRevenue / conciergeCostAnnual)}x</span>
              <span className="text-[11px] text-slate-400 mt-1 block">Returns on annual investment</span>
            </div>
          </div>

          {/* Implementation Call to Action */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">Want this exact engine live on {agencyName} within 48 hours?</h3>
              <p className="text-xs text-slate-400">
                We handle the complete custom integration with your MLS, CRM, and WhatsApp/Email channels. Zero technical lift for your team.
              </p>
            </div>
            <a
              href="mailto:vexo.teamx@gmail.com?subject=Deploy%20Speed-to-Lead%20Concierge%20for%20our%20Agency"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
            >
              <span>Lock Deployment Slot</span>
              <ArrowRight size={16} />
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>Engineered by Vexo TeamX • Speed-to-Lead Autonomous Protocol • &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
