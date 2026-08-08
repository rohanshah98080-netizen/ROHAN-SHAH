import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Counter loop 0 -> 100 over ~2700ms
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2700; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing curve for smooth progression
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Word cycler every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-[#f5f5f5] flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Top Left Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex items-center gap-3"
      >
        <span className="w-2 h-2 rounded-full bg-[#89AACC] animate-pulse" />
        <span className="text-xs text-neutral-400 uppercase tracking-[0.3em] font-medium">
          Portfolio '26
        </span>
      </motion.div>

      {/* Center Word Cycler */}
      <div className="my-auto flex justify-center items-center h-32 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-neutral-200 tracking-wide text-center"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Counter & Details */}
      <div className="flex justify-between items-end pb-4">
        <div className="text-xs text-neutral-500 uppercase tracking-widest hidden sm:block">
          Kathmandu, Nepal <br />
          <span className="text-neutral-400 font-mono">27.7172° N, 85.3240° E</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display text-neutral-100 tabular-nums leading-none ml-auto"
        >
          {String(count).padStart(3, '0')}
        </motion.div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a1a1a]">
        <div
          className="h-full accent-gradient origin-left transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 12px rgba(137, 170, 204, 0.45)'
          }}
        />
      </div>
    </motion.div>
  );
};
