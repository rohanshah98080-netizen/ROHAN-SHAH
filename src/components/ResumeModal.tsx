import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Briefcase, GraduationCap, Award, Code, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-[#121212] border border-[#262626] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 my-8 max-h-[85vh] overflow-y-auto custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#333] flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Resume Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#262626]">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-[0.3em] block mb-1">
                  Curriculum Vitae
                </span>
                <h2 className="text-4xl md:text-5xl font-display italic text-white">Rohan Shah</h2>
                <p className="text-sm text-neutral-400 mt-1">
                  Creative Technologist & Fullstack Design Engineer • Kathmandu, Nepal
                </p>
              </div>

              <a
                href="#download-resume"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Resume download initiated! (PDF format)');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all hover:scale-105 shadow-md shadow-white/10 w-fit"
              >
                <Download size={15} />
                Download PDF
              </a>
            </div>

            {/* Resume Body */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column - Meta & Skills */}
              <div className="space-y-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3">
                    Contact & Links
                  </h3>
                  <div className="space-y-2 text-sm text-neutral-300">
                    <p className="flex items-center justify-between">
                      <span className="text-neutral-500">Email</span>
                      <a href="mailto:hello@rohanshah.com" className="hover:text-sky-300 underline">hello@rohanshah.com</a>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-neutral-500">Location</span>
                      <span>Kathmandu, NP</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-neutral-500">GitHub</span>
                      <a href="https://github.com/rohanshah" target="_blank" rel="noreferrer" className="hover:text-sky-300 flex items-center gap-1">
                        github <ExternalLink size={12} />
                      </a>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-neutral-500">Instagram</span>
                      <a href="https://www.instagram.com/rohanshah00007?igsh=MW9oOWFqZnVuMGwzbA==" target="_blank" rel="noreferrer" className="hover:text-sky-300 flex items-center gap-1">
                        @rohanshah00007 <ExternalLink size={12} />
                      </a>
                    </p>
                  </div>
                </div>

                {/* Core Expertise */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3 flex items-center gap-2">
                    <Code size={14} className="text-[#89AACC]" /> Core Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React / Next.js',
                      'TypeScript',
                      'Tailwind CSS',
                      'GSAP / Motion',
                      'Three.js / WebGL',
                      'HLS / Audio Pipeline',
                      'Design Systems',
                      'Node.js / Express'
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recognitions */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-3 flex items-center gap-2">
                    <Award size={14} className="text-[#89AACC]" /> Awards & Honors
                  </h3>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#89AACC] shrink-0 mt-0.5" />
                      <span><strong>Awwwards Site of the Day</strong> — Automotive Motion (2026)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#89AACC] shrink-0 mt-0.5" />
                      <span><strong>FWA Of the Month</strong> — Monolith Spatial Canvas (2025)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#89AACC] shrink-0 mt-0.5" />
                      <span><strong>Developer Fellow</strong> — Global Creative Tech Summit</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Experience & Education */}
              <div className="md:col-span-2 space-y-8">
                {/* Work Experience */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-6 flex items-center gap-2">
                    <Briefcase size={14} className="text-[#89AACC]" /> Experience
                  </h3>

                  <div className="space-y-6 relative border-l border-[#262626] pl-6 ml-2">
                    {/* Item 1 */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#89AACC]" />
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-semibold text-white">Founder & Principal Technologist</h4>
                        <span className="text-xs text-neutral-500 font-mono">2023 — Present</span>
                      </div>
                      <p className="text-xs text-[#89AACC] mb-2">Aetheria Interactive Studio, Kathmandu</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Architecting high-performance digital identities, WebGL installations, and custom web applications for luxury automotive, architecture, and technology brands across Asia and Europe.
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-600" />
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-semibold text-white">Senior Frontend & Motion Developer</h4>
                        <span className="text-xs text-neutral-500 font-mono">2020 — 2023</span>
                      </div>
                      <p className="text-xs text-[#89AACC] mb-2">Vogue Design Lab, Remote</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Led micro-interaction design system development and complex GSAP animation pipelines for high-traffic editorial publications and visual portfolios.
                      </p>
                    </div>

                    {/* Item 3 */}
                    <div className="relative">
                      <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-600" />
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-semibold text-white">Creative Coding Scholar & Developer</h4>
                        <span className="text-xs text-neutral-500 font-mono">2018 — 2020</span>
                      </div>
                      <p className="text-xs text-[#89AACC] mb-2">Spatial Research Lab</p>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Researched real-time canvas canvas optimization, audio-reactive shaders, and responsive typographic scaling math.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4 flex items-center gap-2">
                    <GraduationCap size={14} className="text-[#89AACC]" /> Education
                  </h3>
                  <div className="bg-[#181818] p-4 rounded-2xl border border-[#282828] flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-white">B.Sc. Computer Science & Design Engineering</h4>
                      <p className="text-xs text-neutral-400">Tribhuvan University, Nepal</p>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">First Class Honors</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
