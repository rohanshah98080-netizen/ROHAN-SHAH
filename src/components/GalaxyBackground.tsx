import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nebula1Ref = useRef<HTMLDivElement | null>(null);
  const nebula2Ref = useRef<HTMLDivElement | null>(null);
  const nebula3Ref = useRef<HTMLDivElement | null>(null);
  const shootingStarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 120 : 300;

    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      isHero: boolean;
      color: string;
    }

    const stars: Star[] = [];
    const colors = ['#ffffff', '#e0f2fe', '#dbeafe', '#89AACC', '#93c5fd'];

    for (let i = 0; i < starCount; i++) {
      const isHero = Math.random() < 0.05;
      const baseAlpha = Math.random() * 0.7 + 0.3;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isHero ? Math.random() * 2 + 2 : Math.random() * 1.5 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        isHero,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Handle mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.01;
      // Lerp mouse position
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render stars
      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 1 || star.alpha < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
        }

        // Apply parallax offset
        const parallaxX = star.x + mouseX * (star.size * 0.3);
        const parallaxY = (star.y + mouseY * (star.size * 0.3) - scrollY * 0.05) % height;
        const finalY = parallaxY < 0 ? height + parallaxY : parallaxY;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;

        if (star.isHero) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#89AACC';
        }

        ctx.beginPath();
        ctx.arc(parallaxX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP animations for Nebula Blobs
    if (!prefersReducedMotion) {
      if (nebula1Ref.current) {
        gsap.to(nebula1Ref.current, {
          x: '+=120',
          y: '+=80',
          duration: 35,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      if (nebula2Ref.current) {
        gsap.to(nebula2Ref.current, {
          x: '-=100',
          y: '+=110',
          duration: 45,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      if (nebula3Ref.current) {
        gsap.to(nebula3Ref.current, {
          x: '+=80',
          y: '-=90',
          duration: 40,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Shooting stars loop
      let shootingStarTimeout: NodeJS.Timeout;
      const triggerShootingStar = () => {
        if (!shootingStarRef.current) return;
        const el = shootingStarRef.current;

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.5);

        gsap.set(el, {
          x: startX,
          y: startY,
          rotation: -35,
          opacity: 0,
          scaleX: 0
        });

        const tl = gsap.timeline({
          onComplete: () => {
            const nextDelay = Math.random() * 7000 + 8000; // 8s to 15s
            shootingStarTimeout = setTimeout(triggerShootingStar, nextDelay);
          }
        });

        tl.to(el, {
          opacity: 1,
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
          .to(el, {
            x: '+=300',
            y: '+=200',
            opacity: 0,
            scaleX: 1.5,
            duration: 0.8,
            ease: 'power1.in'
          });
      };

      shootingStarTimeout = setTimeout(triggerShootingStar, 5000);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        clearTimeout(shootingStarTimeout);
      };
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Layer 1: Deep space gradient */}
      <div
        className="absolute inset-0 animate-drift"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0d0a1a 0%, #050505 60%, #020202 100%)'
        }}
      />

      {/* Layer 2: Nebula glow blobs */}
      <div
        ref={nebula1Ref}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #89AACC 0%, #4E85BF 50%, transparent 80%)'
        }}
      />
      <div
        ref={nebula2Ref}
        className="absolute top-1/3 -right-32 w-[700px] h-[700px] rounded-full blur-[140px] opacity-15"
        style={{
          background: 'radial-gradient(circle, #5b21b6 0%, #3b0764 50%, transparent 80%)'
        }}
      />
      <div
        ref={nebula3Ref}
        className="absolute -bottom-32 left-1/4 w-[650px] h-[650px] rounded-full blur-[130px] opacity-10"
        style={{
          background: 'radial-gradient(circle, #0284c7 0%, #0f172a 60%, transparent 80%)'
        }}
      />

      {/* Layer 3: Star Field Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Layer 5: Shooting Star */}
      <div
        ref={shootingStarRef}
        className="absolute w-40 h-[2px] opacity-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(137,170,204,1) 100%)',
          boxShadow: '0 0 10px #89AACC'
        }}
      />
    </div>
  );
};
