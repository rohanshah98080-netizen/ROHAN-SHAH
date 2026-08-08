import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

interface HeroProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
}

const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar'];
const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const Hero: React.FC<HeroProps> = ({ onSeeWorks, onReachOut }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Initialize HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-6 pt-24 pb-16 z-10"
    >
      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center my-auto">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-neutral-400 uppercase tracking-[0.3em] mb-8 font-medium">
          COLLECTION '26
        </div>

        {/* Name */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-white mb-6 select-none">
          Rohan Shah
        </h1>

        {/* Role Line */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-neutral-300 font-light mb-6 flex items-center justify-center gap-2">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-white text-xl sm:text-2xl md:text-3xl animate-role-fade-in inline-block min-w-[100px] text-left text-[#89AACC]"
          >
            {ROLES[roleIndex]}
          </span>
          <span>lives in Nepal.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-neutral-400 max-w-md mb-10 leading-relaxed font-normal">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row items-center gap-4">
          {/* See Works (Solid button) */}
          <button
            onClick={onSeeWorks}
            className="group relative rounded-full text-sm px-7 py-3.5 font-medium transition-all duration-300 hover:scale-105 bg-white text-black hover:bg-[#0a0a0a] hover:text-white p-[2px]"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1.5px]" />
            <span className="relative z-10 flex items-center gap-2">
              See Works
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </button>

          {/* Reach out... (Outlined button) */}
          <button
            onClick={onReachOut}
            className="group relative rounded-full text-sm px-7 py-3.5 font-medium text-white border-2 border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-transparent"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1.5px]" />
            <span className="relative z-10">Reach out...</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 mt-auto pt-8 flex flex-col items-center gap-3">
        <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-medium">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-[#262626] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
