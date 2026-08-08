import { useState, useEffect } from 'react';
import { GalaxyBackground } from './components/GalaxyBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { Journal } from './components/Journal';
import { Explorations } from './components/Explorations';
import { Stats } from './components/Stats';
import { ContactFooter } from './components/ContactFooter';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'journal', 'explorations', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#0a0a0a] text-[#f5f5f5] min-h-screen font-body selection:bg-[#4E85BF] selection:text-white">
      {/* 1. Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Global Galaxy Background */}
      <GalaxyBackground />

      {/* 3. Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenResume={() => setIsResumeOpen(true)}
        onSayHi={() => scrollToSection('contact')}
      />

      {/* Page Content Sections Layered Above Galaxy Background */}
      <main className="relative z-10">
        {/* Section 2: Hero */}
        <Hero
          onSeeWorks={() => scrollToSection('works')}
          onReachOut={() => scrollToSection('contact')}
        />

        {/* Section 3: Selected Works */}
        <SelectedWorks onViewAll={() => scrollToSection('works')} />

        {/* Section 4: Journal */}
        <Journal />

        {/* Section 5: Explorations (Parallax Gallery) */}
        <Explorations />

        {/* Section 6: Stats */}
        <Stats />

        {/* Section 7: Contact / Footer */}
        <ContactFooter />
      </main>

      {/* Interactive Resume Drawer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
