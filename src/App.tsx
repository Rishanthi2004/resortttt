import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Facilities } from './components/Facilities';
import { MovingGallery } from './components/MovingGallery';
import { Contact } from './components/Contact';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { ScrollSection } from './components/ScrollSection';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aura_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedVillaId, setPreselectedVillaId] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('aura_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getSectionElement = (sectionId: string): HTMLElement | null =>
    document.querySelector<HTMLElement>(`[data-scroll-section="${sectionId}"]`) ??
    document.getElementById(sectionId);

  // Active section tracking for navbar highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'facilities', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const sectionId of sections) {
        const el = getSectionElement(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY - 140;
          const height = rect.height;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (scrollY < 400) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (villaId?: string) => {
    setPreselectedVillaId(villaId);
    setBookingModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    getSectionElement(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col selection:bg-amber-900/20 dark:selection:bg-amber-900/40 selection:text-amber-900 dark:selection:text-amber-100 transition-colors duration-500">
      {/* Top Bar Navigation (Strictly Home, About Us, Facilities, Gallery, Contact) */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections strictly organized into Home, About Us, Facilities, Gallery, Contact */}
      <main className="flex-1">
        {/* 1. HOME: Luminous, Bright Aerial Drone Hero */}
        <ScrollSection id="home" isInitialVisible variant="hero">
          <Hero
            onExploreVillas={() => handleNavigateSection('facilities')}
            onOpenBooking={() => handleOpenBooking()}
            onNavigateAbout={() => handleNavigateSection('about')}
          />
        </ScrollSection>

        {/* 2. ABOUT US: Architectural story, nature pathway photography, and manifesto */}
        <ScrollSection id="about" variant="editorial">
          <AboutUs />
        </ScrollSection>

        {/* 3. FACILITIES: Accommodations, Gastronomy, Thermal Onsen, & Mountain Expeditions (Side-by-side 2 cards on mobile) */}
        <ScrollSection id="facilities" variant="cascade">
          <Facilities
            onOpenBooking={() => handleOpenBooking()}
          />
        </ScrollSection>

        {/* 4. GALLERY: Moving Photographic Gallery with continuous moving reel */}
        <ScrollSection id="gallery" variant="curtain">
          <MovingGallery />
        </ScrollSection>

        {/* 5. CONTACT: Direct VIP Concierge, phone, email & simple inquiry form */}
        <ScrollSection id="contact" variant="concierge">
          <Contact />
        </ScrollSection>
      </main>

      {/* Footer */}
      <ScrollSection id="footer" variant="footer">
        <Footer onNavigateSection={handleNavigateSection} />
      </ScrollSection>

      {/* Reservation Engine Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedVillaId={preselectedVillaId}
      />
    </div>
  );
}
