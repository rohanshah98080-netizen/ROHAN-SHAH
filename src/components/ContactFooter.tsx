import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ArrowUpRight, Copy, Check, Send } from 'lucide-react';

const HLS_STREAM_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const ContactFooter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  // HLS Video Init (flipped vertically)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  // GSAP Infinite Marquee
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@rohanshah.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
      setSenderEmail('');
    }, 4000);
  };

  return (
    <footer id="contact" className="relative bg-[#0a0a0a] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-[#1a1a1a] z-10">
      {/* Background Video (Flipped vertically scale-y-[-1]) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-40"
        />
        {/* Heavier overlay letting galaxy glow blend in */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* GSAP Marquee Banner */}
        <div className="overflow-hidden whitespace-nowrap mb-16 py-4 border-y border-[#222]">
          <div ref={marqueeRef} className="inline-block font-display italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-300 tracking-wider">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mr-8">
                BUILDING THE FUTURE <span className="accent-gradient-text">•</span>{' '}
              </span>
            ))}
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs text-neutral-400 uppercase tracking-[0.3em] font-mono">
                Initiate Dialogue
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
              Let's craft something <br />
              <span className="font-display italic text-neutral-200">extraordinary</span> together.
            </h2>

            <p className="text-sm md:text-base text-neutral-400 max-w-md mb-8 leading-relaxed">
              Available for select freelance commissions, creative direction, spatial web applications, and technical advisory worldwide.
            </p>

            {/* Email Action Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello@rohanshah.com"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm sm:text-base font-semibold hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 shadow-xl"
              >
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1.5px]" />
                <span className="relative z-10 flex items-center gap-2">
                  hello@rohanshah.com <ArrowUpRight size={18} />
                </span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="p-4 rounded-full bg-[#181818] border border-[#333] text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
                title="Copy email address"
              >
                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Quick Message Box */}
          <div className="p-8 rounded-3xl bg-[#141414]/70 border border-[#262626] backdrop-blur-md shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-1">Send a direct note</h3>
            <p className="text-xs text-neutral-400 mb-6">Reaches Rohan Shah's inbox instantly.</p>

            {messageSent ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                <Check size={20} className="text-emerald-400 shrink-0" />
                <span>Thank you! Your note has been delivered to Rohan Shah.</span>
              </div>
            ) : (
              <form onSubmit={handleQuickSend} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#89AACC] transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your project or query..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#2a2a2a] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#89AACC] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-[#1f1f1f] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 bg-[#141414] px-3.5 py-1.5 rounded-full border border-[#282828]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300 font-medium">Available for projects</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center flex-wrap justify-center gap-6 font-mono text-neutral-400">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/rohanshah00007?igsh=MW9oOWFqZnVuMGwzbA=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors text-sky-300"
            >
              Instagram
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Dribbble
            </a>
            <a href="https://github.com/rohanshah" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <div className="text-neutral-500 font-mono">
            © {new Date().getFullYear()} Rohan Shah. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
