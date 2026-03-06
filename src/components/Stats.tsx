import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Properties Sold", value: 500, suffix: "+" },
  { label: "Years Experience", value: 12, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "Total Sales Volume", value: 2, prefix: "$", suffix: "B+" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gold/20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0"
            >
              <div className="text-5xl md:text-6xl font-serif text-gold mb-4 flex items-baseline">
                {stat.prefix && (
                  <span className="text-3xl mr-1">{stat.prefix}</span>
                )}
                <Counter
                  from={0}
                  to={stat.value}
                  duration={2}
                  inView={isInView}
                />
                {stat.suffix && (
                  <span className="text-3xl ml-1">{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm md:text-base text-charcoal font-medium uppercase tracking-wider mb-4">
                {stat.label}
              </p>
              <div className="w-full max-w-[120px] h-[2px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                  className="h-full bg-gold"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  from,
  to,
  duration,
  inView,
}: {
  from: number;
  to: number;
  duration: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration * 1000) {
        const nextValue = Math.min(
          from + (to - from) * (progress / (duration * 1000)),
          to,
        );
        setCount(Math.floor(nextValue));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);

  return <span>{count}</span>;
}
