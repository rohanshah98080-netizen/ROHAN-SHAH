import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JOURNAL_ENTRIES } from '../data';
import { JournalEntry } from '../types';
import { JournalModal } from './JournalModal';
import { ArrowUpRight } from 'lucide-react';

export const Journal: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  return (
    <section id="journal" className="relative z-10 bg-[#0a0a0a]/90 py-16 md:py-24 border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#262626]" />
              <span className="text-xs text-neutral-400 uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Recent <span className="font-display italic font-normal text-neutral-200">thoughts</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-400 mt-3 max-w-md">
              Writing on digital craftsmanship, web performance, micro-interactions, and visual direction.
            </p>
          </div>

          <button
            onClick={() => setSelectedEntry(JOURNAL_ENTRIES[0])}
            className="group relative hidden md:inline-flex items-center justify-center text-xs font-medium text-white px-6 py-3 rounded-full border border-[#262626] bg-[#121212] transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1.5px] pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              View all entries <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </button>
        </motion.div>

        {/* Horizontal Pills List */}
        <div className="space-y-4">
          {JOURNAL_ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => setSelectedEntry(entry)}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 md:p-6 rounded-[32px] sm:rounded-full bg-[#141414]/30 hover:bg-[#141414] border border-[#262626] transition-all duration-300 cursor-pointer hover:border-neutral-700 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0 w-full sm:w-auto">
                {/* Thumbnail image inside rounded pill */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-[#2d2d2d]">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Entry Title & Category */}
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-[#89AACC] font-mono uppercase tracking-wider block mb-0.5">
                    {entry.category}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-white truncate group-hover:text-neutral-100 transition-colors">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Date, Read Time & Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#222]">
                <div className="text-right sm:text-right font-mono text-xs text-neutral-500">
                  <div className="text-neutral-400 font-medium">{entry.date}</div>
                  <div className="text-[11px]">{entry.readTime}</div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-[#282828] group-hover:border-neutral-500 transition-all shrink-0">
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Journal Modal */}
      <JournalModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </section>
  );
};
