import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../data';

export const Stats: React.FC = () => {
  return (
    <section className="relative z-10 bg-[#0a0a0a]/90 py-16 md:py-24 border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
              className="p-8 sm:p-10 rounded-3xl bg-[#141414]/50 border border-[#262626] hover:border-neutral-700 transition-all duration-300 relative overflow-hidden group shadow-lg"
            >
              {/* Subtle accent glow behind number */}
              <div className="absolute top-0 right-0 w-32 h-32 accent-gradient rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />

              {/* Stat Big Number */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-display italic text-white leading-none mb-3 tracking-tight">
                {stat.value}
                <span className="accent-gradient-text">{stat.suffix}</span>
              </div>

              {/* Label */}
              <h3 className="text-base sm:text-lg font-semibold text-neutral-200 mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
