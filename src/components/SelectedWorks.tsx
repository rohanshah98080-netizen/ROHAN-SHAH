import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface SelectedWorksProps {
  onViewAll?: () => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onViewAll }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="relative z-10 bg-[#0a0a0a]/90 py-12 md:py-20 border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#262626]" />
              <span className="text-xs text-neutral-400 uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Featured <span className="font-display italic font-normal text-neutral-200">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-neutral-400 mt-3 max-w-md">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* View all work button (desktop) */}
          <button
            onClick={() => {
              if (onViewAll) onViewAll();
              else setSelectedProject(PROJECTS[0]);
            }}
            className="group relative hidden md:inline-flex items-center justify-center text-xs font-medium text-white px-6 py-3 rounded-full border border-[#262626] bg-[#121212] transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1.5px] pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              View all work <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: '-50px' }}
              onClick={() => setSelectedProject(project)}
              className={`${project.span} ${project.aspect} relative bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden group cursor-pointer shadow-lg`}
            >
              {/* Background image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Halftone overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-25 pointer-events-none mix-blend-multiply" />

              {/* Permanent bottom gradient card title bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-end transition-opacity duration-300 group-hover:opacity-0">
                <div>
                  <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-widest block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display italic text-white">
                    {project.title}
                  </h3>
                </div>
                <span className="text-xs text-neutral-400 font-mono">{project.year}</span>
              </div>

              {/* Hover Backdrop Overlay */}
              <div className="absolute inset-0 bg-[#0a0a0a]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md flex flex-col justify-between p-6 sm:p-8">
                {/* Top Meta */}
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#89AACC] uppercase tracking-[0.2em] font-mono">
                    {project.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">{project.year}</span>
                </div>

                {/* Center Hover Label Pill */}
                <div className="my-auto flex justify-center">
                  <div className="group/pill relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                    <span className="absolute inset-0 rounded-full p-[1.5px] accent-gradient opacity-80" />
                    <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5">
                      View — <span className="font-display italic text-sm sm:text-base font-normal">{project.title}</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Brief Description */}
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <button
            onClick={() => setSelectedProject(PROJECTS[0])}
            className="w-full py-3.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-semibold text-white"
          >
            Explore All Projects →
          </button>
        </div>
      </div>

      {/* Project Detail Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
