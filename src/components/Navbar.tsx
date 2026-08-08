import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onSayHi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onSayHi
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[#141414]/90 px-2 py-2 transition-all duration-300 ${
          isScrolled ? 'shadow-xl shadow-black/40 border-white/20 bg-[#0f0f0f]/95' : 'shadow-md shadow-black/10'
        }`}
      >
        {/* 1. Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 focus:outline-none"
          title="Rohan Shah Portfolio"
        >
          {/* Accent gradient border that reverses on hover */}
          <span className="absolute inset-0 rounded-full accent-gradient group-hover:bg-[linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)] transition-all duration-300" />
          <span className="relative w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center font-display italic text-[13px] text-white tracking-tight">
            RS
          </span>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="w-px h-5 bg-[#262626] mx-1 hidden sm:block" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => onNavigate('hero')}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
              activeSection === 'hero'
                ? 'text-white bg-[#262626]'
                : 'text-neutral-400 hover:text-white hover:bg-[#262626]/50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('works')}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
              activeSection === 'works'
                ? 'text-white bg-[#262626]'
                : 'text-neutral-400 hover:text-white hover:bg-[#262626]/50'
            }`}
          >
            Work
          </button>

          <button
            onClick={onOpenResume}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium text-neutral-400 hover:text-white hover:bg-[#262626]/50"
          >
            Resume
          </button>
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-[#262626] mx-1" />

        {/* 5. Say hi button */}
        <button
          onClick={onSayHi}
          className="group relative inline-flex items-center justify-center text-xs sm:text-sm rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 font-medium text-white transition-all duration-300 focus:outline-none"
        >
          {/* Animated gradient ring on hover */}
          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px] accent-gradient pointer-events-none" />
          <span className="relative z-10 flex items-center gap-1">
            Say hi <span className="text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
          </span>
        </button>
      </div>
    </nav>
  );
};
