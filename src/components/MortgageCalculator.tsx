import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(1500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const principal = homePrice - homePrice * (downPaymentPct / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      setTotalInterest(0);
      setTotalCost(principal);
      return;
    }

    const payment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
    setTotalInterest(payment * numberOfPayments - principal);
    setTotalCost(payment * numberOfPayments);
  }, [homePrice, downPaymentPct, loanTerm, interestRate]);

  const principalAmount = homePrice - homePrice * (downPaymentPct / 100);

  const chartData = [
    { name: "Principal", value: principalAmount },
    { name: "Interest", value: totalInterest },
  ];
  const COLORS = ["#1a1a1a", "#B8960C"];

  return (
    <section id="calculator" className="py-24 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Mortgage Calculator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 mb-6"
          >
            Estimate your monthly payments instantly
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 space-y-8"
          >
            {/* Home Price */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Home Price
                </label>
                <span className="text-gold font-medium text-lg">
                  ${homePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Down Payment
                </label>
                <span className="text-gold font-medium text-lg">
                  {downPaymentPct}% ($
                  {(homePrice * (downPaymentPct / 100)).toLocaleString()})
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4 block">
                Loan Term
              </label>
              <div className="flex gap-4">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors border ${
                      loanTerm === term
                        ? "bg-gold text-white border-gold"
                        : "bg-transparent text-white/70 border-white/20 hover:border-gold/50"
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  Interest Rate
                </label>
                <span className="text-gold font-medium text-lg">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-2xl shadow-gold/10 mb-10 relative">
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={100}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) =>
                        `$${Math.round(value).toLocaleString()}`
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="relative z-10 text-center mt-2">
                <p className="text-charcoal/50 text-xs font-bold uppercase tracking-widest mb-1">
                  Monthly Payment
                </p>
                <p className="text-4xl font-serif text-charcoal">
                  ${Math.round(monthlyPayment).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="w-full max-w-md space-y-4 mb-10">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-charcoal border border-white/20"></span>
                  Principal
                </span>
                <span className="font-medium">
                  ${Math.round(principalAmount).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white/70 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold"></span>
                  Total Interest
                </span>
                <span className="font-medium">
                  ${Math.round(totalInterest).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-white font-bold">Total Cost of Loan</span>
                <span className="font-bold text-gold">
                  ${Math.round(totalCost).toLocaleString()}
                </span>
              </div>
            </div>

            <button className="w-full max-w-md bg-gold text-white py-4 rounded-xl font-medium text-lg hover:bg-light-gold transition-colors shadow-lg shadow-gold/20 btn-shimmer">
              Talk to a Mortgage Expert
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
