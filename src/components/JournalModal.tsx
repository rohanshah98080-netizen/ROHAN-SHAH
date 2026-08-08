import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Bookmark } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ entry, onClose }) => {
  if (!entry) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#121212] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[85vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black transition-colors"
          >
            <X size={18} />
          </button>

          {/* Banner Image */}
          <div className="relative w-full h-56 sm:h-72 overflow-hidden shrink-0">
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs text-[#89AACC] uppercase tracking-[0.2em] font-mono block mb-1">
                {entry.category}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-white leading-tight">
                {entry.title}
              </h2>
            </div>
          </div>

          {/* Body Article Content */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-6 custom-scrollbar text-neutral-300">
            {/* Metadata bar */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pb-4 border-b border-[#262626] font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> {entry.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> {entry.readTime}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[#89AACC]">
                <Bookmark size={13} /> Rohan Shah
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-base sm:text-lg text-white font-medium italic border-l-2 border-[#89AACC] pl-4 py-1 leading-relaxed">
              "{entry.excerpt}"
            </p>

            {/* Full Content */}
            <div className="text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line text-neutral-300 font-normal">
              {entry.content}
            </div>

            {/* Article Footer */}
            <div className="pt-6 border-t border-[#262626] flex items-center justify-between text-xs text-neutral-500">
              <span>Published in Rohan Shah's Personal Journal</span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-[#1e1e1e] border border-[#333] text-neutral-200 hover:text-white hover:bg-[#282828] transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
