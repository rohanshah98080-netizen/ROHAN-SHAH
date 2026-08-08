import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPLORATIONS } from '../data';
import { ExplorationItem } from '../types';
import { Heart, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const Explorations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin central title
      if (pinnedRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          pinSpacing: false
        });
      }

      // Parallax for Column 1 (moves faster upwards)
      if (col1Ref.current && containerRef.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: '10%' },
          {
            y: '-30%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      }

      // Parallax for Column 2 (moves slower / opposite offset)
      if (col2Ref.current && containerRef.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: '30%' },
          {
            y: '-10%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLike = (id: string, initialLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || initialLikes) + 1
    }));
  };

  const col1Items = EXPLORATIONS.filter((item) => item.column === 1);
  const col2Items = EXPLORATIONS.filter((item) => item.column === 2);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[250vh] sm:min-h-[300vh] w-full py-20 overflow-hidden"
    >
      {/* Layer 1: Pinned Center Heading (z-10) */}
      <div
        ref={pinnedRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
      >
        <div className="max-w-xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/5 shadow-2xl">
          <div className="text-xs text-neutral-400 uppercase tracking-[0.3em] font-medium mb-3">
            Explorations
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-4">
            Visual <span className="font-display italic font-normal text-neutral-200">playground</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto mb-6 leading-relaxed">
            Experiments in 3D WebGL, generative motion, and expressive spatial interfaces.
          </p>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181818] border border-[#333] text-xs font-semibold text-white hover:border-neutral-400 hover:bg-[#222] transition-all hover:scale-105"
          >
            Follow on Dribbble <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns Grid (z-20) */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-12 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">
          {/* Column 1 */}
          <div ref={col1Ref} className="space-y-16 md:space-y-32 pt-10">
            {col1Items.map((item) => {
              const currentLikes = likesMap[item.id] || item.likes;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`group relative aspect-square max-w-[320px] mx-auto rounded-3xl bg-[#141414] border border-[#262626] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:border-neutral-500 ${item.rotation}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Top category */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] px-3 py-1 rounded-full bg-black/60 border border-white/10 text-neutral-300 font-mono">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom title & likes */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-display italic text-white">{item.title}</h3>
                    </div>

                    <button
                      onClick={(e) => handleLike(item.id, item.likes, e)}
                      className="flex items-center gap-1 text-xs text-rose-400 bg-black/60 px-2.5 py-1 rounded-full border border-rose-500/20 hover:scale-110 transition-transform"
                    >
                      <Heart size={12} className="fill-rose-400" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="space-y-16 md:space-y-32 pt-24 md:pt-48">
            {col2Items.map((item) => {
              const currentLikes = likesMap[item.id] || item.likes;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`group relative aspect-square max-w-[320px] mx-auto rounded-3xl bg-[#141414] border border-[#262626] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:border-neutral-500 ${item.rotation}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] px-3 py-1 rounded-full bg-black/60 border border-white/10 text-neutral-300 font-mono">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-display italic text-white">{item.title}</h3>
                    </div>

                    <button
                      onClick={(e) => handleLike(item.id, item.likes, e)}
                      className="flex items-center gap-1 text-xs text-rose-400 bg-black/60 px-2.5 py-1 rounded-full border border-rose-500/20 hover:scale-110 transition-transform"
                    >
                      <Heart size={12} className="fill-rose-400" />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox for Exploration Artwork */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 max-w-2xl w-full bg-[#121212] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl p-6"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white"
              >
                <X size={16} />
              </button>

              <div className="aspect-square w-full rounded-2xl overflow-hidden mb-4 border border-[#222]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#89AACC] font-mono uppercase">{activeItem.category}</span>
                  <h3 className="text-2xl font-display italic text-white">{activeItem.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleLike(activeItem.id, activeItem.likes, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold"
                  >
                    <Heart size={14} className="fill-rose-400" />
                    <span>{likesMap[activeItem.id] || activeItem.likes} Likes</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
