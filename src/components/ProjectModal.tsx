import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, User, Layers, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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
          className="relative w-full max-w-4xl bg-[#121212] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black transition-colors"
          >
            <X size={18} />
          </button>

          {/* Hero Banner Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs text-[#89AACC] uppercase tracking-[0.2em] font-mono">
                {project.category}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-white mt-1">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 md:p-10 overflow-y-auto space-y-8 custom-scrollbar">
            {/* Meta bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#262626] text-xs">
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <User size={12} /> Client
                </span>
                <span className="text-neutral-200 font-medium">{project.client || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Layers size={12} /> Role
                </span>
                <span className="text-neutral-200 font-medium">{project.role || 'Design Engineer'}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Year
                </span>
                <span className="text-neutral-200 font-mono">{project.year}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase tracking-wider block mb-1">Status</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Shipped
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                Overview & Architecture
              </h3>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            {project.tech && project.tech.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                  Technologies & Frameworks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-[#1e1e1e] border border-[#333] text-neutral-200 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-[#262626]">
              <span className="text-xs text-neutral-500">
                Designed & Built by Rohan Shah
              </span>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all hover:scale-105 shadow-lg shadow-white/10"
                >
                  Visit Project <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
