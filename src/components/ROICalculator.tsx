import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MessageCircle } from "lucide-react";

export default function ROICalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1000000);
  const [monthlyRent, setMonthlyRent] = useState(8000);
  const [annualExpenses, setAnnualExpenses] = useState(15000);
  const [appreciation, setAppreciation] = useState(5);
  const [holdingPeriod, setHoldingPeriod] = useState(10);

  const [annualIncome, setAnnualIncome] = useState(0);
  const [netReturn, setNetReturn] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [finalValue, setFinalValue] = useState(0);
  const [chartData, setChartData] = useState<{ year: string; value: number }[]>(
    [],
  );

  useEffect(() => {
    const yearlyRent = monthlyRent * 12;
    const netIncome = yearlyRent - annualExpenses;
    const roi = (netIncome / purchasePrice) * 100;

    const futureValue =
      purchasePrice * Math.pow(1 + appreciation / 100, holdingPeriod);
    const totalRentCollected = netIncome * holdingPeriod;
    const profit = futureValue - purchasePrice + totalRentCollected;

    setAnnualIncome(netIncome);
    setNetReturn(roi);
    setFinalValue(futureValue);
    setTotalProfit(profit);

    // Generate chart data
    const data = [];
    for (let i = 1; i <= holdingPeriod; i++) {
      data.push({
        year: `Year ${i}`,
        value: Math.round(purchasePrice * Math.pow(1 + appreciation / 100, i)),
      });
    }
    setChartData(data);
  }, [purchasePrice, monthlyRent, annualExpenses, appreciation, holdingPeriod]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-4"
          >
            Investment Property ROI Calculator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary mb-6"
          >
            See your potential returns before you buy
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-offwhite p-8 md:p-10 rounded-3xl border border-gray-100 space-y-8 shadow-sm"
          >
            {/* Purchase Price */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-charcoal uppercase tracking-wider">
                  Purchase Price
                </label>
                <span className="text-gold font-medium text-lg">
                  ${purchasePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="50000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Monthly Rent */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-charcoal uppercase tracking-wider">
                  Expected Monthly Rent
                </label>
                <span className="text-gold font-medium text-lg">
                  ${monthlyRent.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Annual Expenses */}
            <div>
              <label className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-2 block">
                Annual Expenses / HOA
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
              </div>
            </div>

            {/* Appreciation */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-charcoal uppercase tracking-wider">
                  Expected Annual Appreciation
                </label>
                <span className="text-gold font-medium text-lg">
                  {appreciation}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={appreciation}
                onChange={(e) => setAppreciation(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            {/* Holding Period */}
            <div>
              <label className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-4 block">
                Holding Period
              </label>
              <div className="flex gap-4">
                {[5, 10, 20].map((term) => (
                  <button
                    key={term}
                    onClick={() => setHoldingPeriod(term)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors border ${
                      holdingPeriod === term
                        ? "bg-charcoal text-white border-charcoal"
                        : "bg-white text-charcoal border-gray-200 hover:border-gold"
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-offwhite p-6 rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Net Annual Income
                </p>
                <p className="text-3xl font-serif text-charcoal">
                  ${Math.round(annualIncome).toLocaleString()}
                </p>
              </div>
              <div className="bg-offwhite p-6 rounded-2xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Cash-on-Cash Return
                </p>
                <p className="text-3xl font-serif text-charcoal">
                  {netReturn.toFixed(2)}%
                </p>
              </div>
              <div className="bg-gold/10 p-6 rounded-2xl border border-gold/20 col-span-2 text-center">
                <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-2">
                  Total Profit After {holdingPeriod} Years
                </p>
                <p className="text-5xl font-serif text-gold">
                  ${Math.round(totalProfit).toLocaleString()}
                </p>
                <p className="text-sm text-charcoal/60 mt-2">
                  Property Value: ${Math.round(finalValue).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value) =>
                      `$${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString()}`,
                      "Property Value",
                    ]}
                    cursor={{ fill: "#f8f6f1" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="value" fill="#B8960C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-whatsapp text-white py-4 rounded-xl font-medium text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 mt-auto btn-shimmer"
            >
              <MessageCircle size={20} />
              Discuss Investment Opportunities
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
