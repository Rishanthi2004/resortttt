import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
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

  // Active section tracking for navbar highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col selection:bg-amber-900/20 dark:selection:bg-amber-900/40 selection:text-amber-900 dark:selection:text-amber-100 transition-colors duration-500">
      {/* Top Bar Navigation (Strictly Home, About Us, Services, Gallery, Contact) */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections strictly organized into Home, About Us, Services, Gallery, Contact */}
      <main className="flex-1">
        {/* 1. HOME: Luminous, Bright Aerial Drone Hero */}
        <ScrollSection id="home" isInitialVisible>
          <Hero
            onExploreVillas={() => handleNavigateSection('services')}
            onOpenBooking={() => handleOpenBooking()}
            onNavigateAbout={() => handleNavigateSection('about')}
          />
        </ScrollSection>

        {/* 2. ABOUT US: Architectural story, nature pathway photography, and manifesto */}
        <ScrollSection id="about">
          <AboutUs />
        </ScrollSection>

        {/* 3. SERVICES: Accommodations, Gastronomy, Thermal Onsen, & Mountain Expeditions (Side-by-side 2 cards on mobile) */}
        <ScrollSection id="services">
          <Services
            onOpenBooking={() => handleOpenBooking()}
          />
        </ScrollSection>

        {/* 4. GALLERY: Moving Photographic Gallery with continuous moving reel */}
        <ScrollSection id="gallery">
          <MovingGallery />
        </ScrollSection>

        {/* 5. CONTACT: Direct VIP Concierge, phone, email & simple inquiry form */}
        <ScrollSection id="contact">
          <Contact />
        </ScrollSection>
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Reservation Engine Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedVillaId={preselectedVillaId}
      />
    </div>
  );
}
